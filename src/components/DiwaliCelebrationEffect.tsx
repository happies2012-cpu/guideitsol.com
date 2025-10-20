import React, { useEffect, useRef } from 'react';

const DiwaliCelebrationEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      opacity: number;
      decay: number;
      shape: 'circle' | 'square' | 'star' | 'diamond';
      isRocket: boolean;
      isExplosion: boolean;
      trail: {x: number, y: number, opacity: number}[];
      glow: boolean;

      constructor(isRocket: boolean = false, isExplosion: boolean = false, x?: number, y?: number) {
        this.isRocket = isRocket;
        this.isExplosion = isExplosion;
        this.glow = !isRocket && !isExplosion && Math.random() > 0.7; // 30% of particles have glow effect
        
        if (isRocket) {
          // Rocket starts from bottom of screen
          this.x = Math.random() * canvas.width;
          this.y = canvas.height + 10;
          this.vx = (Math.random() - 0.5) * 3;
          this.vy = -Math.random() * 12 - 8; // Move upward faster
          this.radius = Math.random() * 3 + 3;
          this.color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Random bright color
          this.opacity = 1;
          this.decay = 0.005;
          this.trail = [];
          this.shape = 'circle';
        } else if (isExplosion && x !== undefined && y !== undefined) {
          // Explosion particles
          this.x = x;
          this.y = y;
          this.vx = (Math.random() - 0.5) * 15;
          this.vy = (Math.random() - 0.5) * 15;
          this.radius = Math.random() * 4 + 2;
          this.color = `hsl(${Math.random() * 360}, 100%, ${Math.random() * 40 + 60}%)`;
          this.opacity = 1;
          this.decay = Math.random() * 0.03 + 0.01;
          this.trail = [];
          this.shape = ['circle', 'star', 'diamond'][Math.floor(Math.random() * 3)] as 'circle' | 'star' | 'diamond';
        } else {
          // Regular particle
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 6;
          this.vy = (Math.random() - 0.5) * 6;
          this.radius = Math.random() * 4 + 1;
          this.color = `hsl(${Math.random() * 360}, 100%, ${Math.random() * 40 + 60}%)`;
          this.opacity = Math.random() * 0.7 + 0.3;
          this.decay = Math.random() * 0.02 + 0.005;
          this.trail = [];
          this.shape = ['circle', 'square', 'star', 'diamond'][Math.floor(Math.random() * 4)] as 'circle' | 'square' | 'star' | 'diamond';
        }
      }

      update() {
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Add current position to trail for rockets
        if (this.isRocket) {
          this.trail.push({x: this.x, y: this.y, opacity: this.opacity});
          if (this.trail.length > 15) {
            this.trail.shift();
          }
        }
        
        // Apply gravity to rockets after they start slowing down
        if (this.isRocket && this.vy > -2) {
          this.vy += 0.2; // Gravity effect
        }
        
        // Apply light air resistance to explosion particles
        if (this.isExplosion) {
          this.vx *= 0.98;
          this.vy *= 0.98;
        }
        
        // Decay opacity
        this.opacity -= this.decay;

        // Reset particle if it goes off screen or becomes transparent
        if (
          this.opacity <= 0 ||
          this.x < -100 ||
          this.x > canvas.width + 100 ||
          this.y < -100 ||
          this.y > canvas.height + 100
        ) {
          if (this.isRocket) {
            // Reset rocket to bottom
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
            this.vy = -Math.random() * 12 - 8;
            this.vx = (Math.random() - 0.5) * 3;
            this.opacity = 1;
            this.trail = [];
            this.color = `hsl(${Math.random() * 360}, 100%, 60%)`; // New random color
          } else if (this.isExplosion) {
            // Explosion particles are removed
            return false;
          } else {
            // Reset regular particle
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.opacity = 1;
            this.color = `hsl(${Math.random() * 360}, 100%, ${Math.random() * 40 + 60}%)`; // New random color
          }
        }
        return true;
      }

      draw() {
        if (!ctx) return;

        ctx.save();
        
        // Draw rocket trail with glow
        if (this.isRocket && this.trail.length > 1) {
          for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i];
            const trailOpacity = point.opacity * (i / this.trail.length) * 0.7;
            
            ctx.globalAlpha = trailOpacity;
            
            // Glow effect for trail
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            
            ctx.beginPath();
            ctx.arc(point.x, point.y, this.radius * (i / this.trail.length), 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
          }
        }

        ctx.globalAlpha = this.opacity;
        
        // Glow effect for particles
        if (this.glow) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = this.color;
        }

        // Draw particle based on shape
        switch (this.shape) {
          case 'circle':
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'square':
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            break;

          case 'star':
            ctx.fillStyle = this.color;
            drawStar(ctx, this.x, this.y, 5, this.radius, this.radius / 2);
            break;
            
          case 'diamond':
            ctx.fillStyle = this.color;
            drawDiamond(ctx, this.x, this.y, this.radius);
            break;
        }

        ctx.restore();
      }
    }

    // Function to draw a star
    function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);

      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }

      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    }
    
    // Function to draw a diamond
    function drawDiamond(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
      ctx.beginPath();
      ctx.moveTo(cx, cy - radius); // Top
      ctx.lineTo(cx + radius, cy); // Right
      ctx.lineTo(cx, cy + radius); // Bottom
      ctx.lineTo(cx - radius, cy); // Left
      ctx.closePath();
      ctx.fill();
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 300; // Increased particle count
    const rocketCount = 20; // More rockets

    // Create regular particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(false));
    }
    
    // Create rockets
    for (let i = 0; i < rocketCount; i++) {
      particles.push(new Particle(true));
    }

    // Create explosion function
    const createExplosion = (x: number, y: number, color: string) => {
      const explosionParticles = 80; // More particles per explosion
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < explosionParticles; i++) {
        const particle = new Particle(false, true, x, y);
        particle.color = color;
        newParticles.push(particle);
      }
      
      return newParticles;
    };

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;

      // Clear canvas with a semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Slightly more opaque for better contrast
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        const isAlive = particle.update();
        
        if (!isAlive) {
          particles.splice(i, 1);
        } else {
          particle.draw();
        }
        
        // Create explosion when rocket reaches peak
        if (particle.isRocket && particle.vy > -1 && Math.random() > 0.95) {
          const explosionParticles = createExplosion(particle.x, particle.y, particle.color);
          particles.push(...explosionParticles);
          
          // Reset rocket
          particle.x = Math.random() * canvas.width;
          particle.y = canvas.height + 10;
          particle.vy = -Math.random() * 12 - 8;
          particle.vx = (Math.random() - 0.5) * 3;
          particle.opacity = 1;
          particle.trail = [];
          particle.color = `hsl(${Math.random() * 360}, 100%, 60%)`; // New random color
        }
      }

      // Add occasional bursts of particles (sparkles)
      if (Math.random() < 0.15) { // Increased frequency
        for (let i = 0; i < 15; i++) { // More particles per burst
          particles.push(new Particle());
        }
      }

      // Add rocket bursts
      if (Math.random() < 0.03) {
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle(true));
        }
      }

      // Remove excess particles to maintain performance
      if (particles.length > particleCount + rocketCount + 200) {
        particles.splice(0, 10);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default DiwaliCelebrationEffect;