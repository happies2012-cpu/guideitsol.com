import React, { useEffect, useRef } from "react";
import logo from "@/assets/guidesoft-logo.png";

const DiwaliGreeting: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let chars: Array<Array<[number, number]>> = [];
    let particles: number;
    let w: number, h: number;
    let current: number | undefined;
    const duration = 5000;
    const str = ["WishyouHappy", "Diwali", "GUIDESOFT", "PRAVEEN"];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = window.innerWidth < 400 ? 55 : 99;
    };

    const makeChar = (c: string) => {
      const tmp = document.createElement("canvas");
      const size = (tmp.width = tmp.height = w < 800 ? 400 : 500);
      const tmpCtx = tmp.getContext("2d")!;
      tmpCtx.font = `bold ${size}px Arial`;
      tmpCtx.fillStyle = "white";
      tmpCtx.textBaseline = "middle";
      tmpCtx.textAlign = "center";
      tmpCtx.fillText(c, size / 2, size / 2);
      const char2 = tmpCtx.getImageData(0, 0, size, size);
      const char2particles: Array<[number, number]> = [];
      for (let i = 0; char2particles.length < particles; i++) {
        const x = size * Math.random();
        const y = size * Math.random();
        const offset = Math.floor(y) * size * 4 + Math.floor(x) * 4;
        if (char2.data[offset]) char2particles.push([x - size / 2, y - size / 2]);
      }
      return char2particles;
    };

    const makeChars = (t: number) => {
      const actual = Math.floor(t / duration) % str.length;
      if (current === actual) return;
      current = actual;
      chars = [...str[actual]].map(makeChar);
    };

    const circle = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const rocket = (x: number, y: number, id: number, t: number) => {
      ctx.fillStyle = "white";
      let r = 2 - 2 * t + Math.pow(t, 15 * t) * 16;
      y = h - y * t;
      circle(x, y, r);
    };

    const explosion = (pts: Array<[number, number]>, x: number, y: number, id: number, t: number) => {
      const dy = t * t * t * 20;
      let r = Math.sin(id) * 1 + 3;
      r = t < 0.5 ? (t + 0.5) * t * r : r - t * r;
      ctx.fillStyle = `hsl(${id * 55}, 55%, 55%)`;
      pts.forEach((xy, i) => {
        if (i % 20 === 0)
          ctx.fillStyle = `hsl(${id * 55}, 55%, ${55 + t * Math.sin(t * 55 + i) * 45}%)`;
        circle(t * xy[0] + x, h - y + t * xy[1] + dy, r);
      });
    };

    const firework = (t: number, i: number, pts: Array<[number, number]>) => {
      t -= i * 200;
      const id = i + chars.length * Math.floor(t - (t % duration));
      t = (t % duration) / duration;
      let dx = (i + 1) * w / (1 + chars.length);
      dx += Math.min(0.33, t) * 100 * Math.sin(id);
      let dy = h * 0.5;
      dy += Math.sin(id * 4547.411) * h * 0.1;
      if (t < 0.33) {
        rocket(dx, dy, id, t * 3);
      } else {
        explosion(pts, dx, dy, id, Math.min(1, Math.max(0, t - 0.33) * 2));
      }
    };

    let rafId = 0;
    const render = (t: number) => {
      makeChars(t);
      rafId = requestAnimationFrame(render);
      ctx.fillStyle = "#00000010"; // gentle trail
      ctx.fillRect(0, 0, w, h);
      chars.forEach((pts, i) => firework(t, i, pts));
    };

    // page should not scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    resize();
    requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url(/diwali-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0,0,0,0.85)",
        backgroundBlendMode: "multiply",
        backgroundAttachment: "fixed",
        overflow: "hidden",
        zIndex: 200,
      }}
    >
      {/* Canvas effect */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 150 }} />

      {/* Site logo */}
      <img
        src={logo}
        alt="Guidesoft logo"
        style={{ position: "absolute", top: 16, left: 16, width: 120, height: "auto", zIndex: 250 }}
      />

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
          Happy Diwali from Guidesoft
        </h1>
        <p className="mt-2 text-base md:text-lg text-white/80">
          Wishing you prosperity, innovation, and bright new beginnings.
        </p>
      </div>

      {/* Services & AI capabilities panel */}
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1000px, 92vw)",
          background: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 16,
          backdropFilter: "blur(6px)",
          color: "white",
          padding: "16px 20px",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-bold">Our Services</h2>
            <ul className="mt-2 text-sm md:text-base list-disc list-inside text-white/85">
              <li>Web, Mobile, and Cross‑Platform Development</li>
              <li>UI/UX Design and Ecommerce Solutions</li>
              <li>Cloud, DevOps, and Data Engineering</li>
              <li>Travel and On‑Demand Solutions</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Capabilities</h2>
            <ul className="mt-2 text-sm md:text-base list-disc list-inside text-white/85">
              <li>AI Chatbots and Virtual Assistants</li>
              <li>Analytics, Forecasting, and Automation</li>
              <li>Vision and NLP Integrations</li>
              <li>Personalized Learning & Recommendations</li>
            </ul>
          </div>
        </div>
        <div className="mt-3 text-center text-white/75 text-sm">
          Explore more on our Services and AI Learning pages.
        </div>
      </div>
    </div>
  );
};

export default DiwaliGreeting;