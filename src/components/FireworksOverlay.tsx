import React, { useEffect, useRef } from 'react';

const FireworksOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let rafId: number;
    const particles: any[] = [];
    const rockets: any[] = [];
    const gravity = 0.06;
    const airDrag = 0.995;

    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    const colors = [
      '#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8f00ff'
    ];

    const spawnRocket = () => {
      const x = random(window.innerWidth * 0.2, window.innerWidth * 0.8);
      const y = window.innerHeight + 10; // start slightly below
      const speed = random(6, 9);
      const spread = random(0.02, 0.05);
      rockets.push({
        x, y, vx: random(-0.8, 0.8), vy: -speed, life: random(60, 90), spread,
        trail: [] as { x: number; y: number }[], color: colors[Math.floor(random(0, colors.length))]
      });
    };

    const explodeUmbrella = (rx: any) => {
      const count = 140;
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1); // 0..1
        // Umbrella dome: angles focused downward hemisphere
        const angle = Math.PI + t * Math.PI; // pi..2pi
        const speed = random(2.2, 4.0);
        const vx = Math.cos(angle) * speed + random(-0.2, 0.2);
        const vy = Math.sin(angle) * speed + random(-0.2, 0.2);
        const colorIndex = Math.floor(t * (colors.length - 1));
        const color = colors[colorIndex];
        particles.push({
          x: rx.x, y: rx.y, vx, vy, life: random(60, 120), alpha: 1,
          color, flicker: random(0.85, 1.15), size: random(1.4, 2.4), trail: [] as { x: number; y: number }[]
        });
      }
    };

    const explodeRound = (rx: any) => {
      const count = 160;
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        const angle = t * Math.PI * 2; // full circle
        const speed = random(2.6, 4.6);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({ x: rx.x, y: rx.y, vx, vy, life: random(60, 110), alpha: 1, color, flicker: random(0.85, 1.2), size: random(1.2, 2.0), trail: [] });
      }
    };

    const explodeRainbowVertical = (rx: any) => {
      // Vertical fountain-like burst with rainbow gradient
      const count = 120;
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        const angle = -Math.PI / 2 + random(-0.45, 0.45); // mostly upward
        const speed = random(2.4, 4.2) * (0.6 + 0.4 * t);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const color = colors[Math.floor(t * (colors.length - 1))];
        particles.push({ x: rx.x, y: rx.y, vx, vy, life: random(50, 90), alpha: 1, color, flicker: random(0.9, 1.2), size: random(1.0, 1.8), trail: [] });
      }
    };

    let lastSpawn = 0;
    const spawnInterval = 700; // ms

    const tick = (time: number) => {
      rafId = requestAnimationFrame(tick);
      // trail fade without darkening content beneath the canvas
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // launch rockets
      if (time - lastSpawn > spawnInterval) {
        spawnRocket();
        lastSpawn = time;
      }

      ctx.globalCompositeOperation = 'lighter';

      // update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 12) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;
        r.vy += -gravity * 0.4; // slight upward boost initially
        r.vx *= 0.998;
        r.vy *= 0.998;
        r.life--;

        // draw rocket trail
        for (let t = 0; t < r.trail.length - 1; t++) {
          const p0 = r.trail[t];
          const p1 = r.trail[t + 1];
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = (t / r.trail.length) * 0.8;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // explode at apex or timeout
        if (r.life <= 0 || r.vy > -0.5) {
          const type = Math.floor(Math.random() * 3);
          if (type === 0) explodeUmbrella(r);
          else if (type === 1) explodeRound(r);
          else explodeRainbowVertical(r);
          rockets.splice(i, 1);
        }
      }

      // update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 10) p.trail.shift();

        p.vx *= airDrag;
        p.vy *= airDrag;
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.alpha = Math.max(0, p.life / 120) * p.flicker;

        // draw particle trail
        for (let t = 0; t < p.trail.length - 1; t++) {
          const q0 = p.trail[t];
          const q1 = p.trail[t + 1];
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.globalAlpha = (t / p.trail.length) * 0.7 * p.alpha;
          ctx.beginPath();
          ctx.moveTo(q0.x, q0.y);
          ctx.lineTo(q1.x, q1.y);
          ctx.stroke();
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (p.life <= 0 || p.alpha <= 0.02) {
          particles.splice(i, 1);
        }
      }
    };

    rafId = requestAnimationFrame(tick);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    />
  );
};

export default FireworksOverlay;