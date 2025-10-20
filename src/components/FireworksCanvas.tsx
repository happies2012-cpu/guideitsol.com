import React, { useEffect, useRef, useState } from "react";

// A self-contained fireworks simulation with UI controls and optional audio.
// - Tap/click to set off fireworks at that location
// - Speaker toggles sound
// - Play/Pause controls auto fireworks
// - Settings allow customization of particle count, explosion size, gravity, spawn rate, and volume

interface Settings {
  particleCount: number;
  explosionSize: number; // speed multiplier
  gravity: number;
  spawnRate: number; // explosions per minute when playing
  volume: number; // 0..1
  soundEnabled: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const defaultSettings: Settings = {
  particleCount: 80,
  explosionSize: 3.0,
  gravity: 0.06,
  spawnRate: 30,
  volume: 0.6,
  soundEnabled: false,
};

const randomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;

function useAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => () => {
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state !== "closed") ctx.close();
  }, []);

  const ensureCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current!;
  };

  const boom = (volume: number) => {
    try {
      const ctx = ensureCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(220 + Math.random() * 180, ctx.currentTime);
      g.gain.setValueAtTime(volume, ctx.currentTime);
      // quick envelope
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // no-op if audio fails
    }
  };

  return { boom };
}

const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const playingRef = useRef<boolean>(true);
  const lastSpawnRef = useRef<number>(performance.now());
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(defaultSettings.soundEnabled);
  const { boom } = useAudio();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      // clear with slight alpha for tails
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // update particles
      const p = particlesRef.current;
      for (let i = p.length - 1; i >= 0; i--) {
        const part = p[i];
        part.vy += settings.gravity;
        part.x += part.vx * settings.explosionSize;
        part.y += part.vy * settings.explosionSize;
        part.life += 1;
        // fade color by life
        const alpha = Math.max(0, 1 - part.life / part.maxLife);
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
        ctx.fillStyle = part.color.replace("hsl", "hsla").replace(
          ")",
          `, ${alpha})`
        );
        ctx.fill();

        if (part.life >= part.maxLife) {
          p.splice(i, 1);
        }
      }

      // auto spawn
      if (playingRef.current) {
        const now = performance.now();
        const intervalMs = (60_000 / Math.max(1, settings.spawnRate));
        if (now - lastSpawnRef.current >= intervalMs) {
          lastSpawnRef.current = now;
          spawnExplosion(Math.random() * window.innerWidth, window.innerHeight * 0.4 + Math.random() * window.innerHeight * 0.5);
        }
      }
    };

    rafId = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnExplosion(x, y);
    };
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.gravity, settings.spawnRate, settings.explosionSize]);

  const spawnExplosion = (x: number, y: number) => {
    const count = Math.max(10, Math.min(400, settings.particleCount));
    const arr = particlesRef.current;
    const hue = Math.floor(Math.random() * 360);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.2;
      const speed = 1 + Math.random() * 2.5;
      const px = x;
      const py = y;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      arr.push({
        x: px,
        y: py,
        vx,
        vy,
        life: 0,
        maxLife: 60 + Math.random() * 50,
        color: `hsl(${hue + Math.random() * 30 - 15}, 100%, 60%)`,
        size: 2 + Math.random() * 2,
      });
    }
    if (soundEnabled) boom(settings.volume);
  };

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    playingRef.current = next;
  };

  const toggleSound = async () => {
    if (!soundEnabled) {
      // resume audio context by user gesture
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        await ctx.resume();
        ctx.close();
      } catch {}
    }
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="fixed inset-0 z-10">
      <canvas ref={canvasRef} className="w-full h-full block bg-black" />

      {/* Controls overlay */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={toggleSound}
          className="px-3 py-2 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20"
          aria-label={soundEnabled ? "Mute" : "Unmute"}
          title={soundEnabled ? "Mute" : "Unmute"}
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>
        <button
          onClick={togglePlay}
          className="px-3 py-2 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20"
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          onClick={() => setShowSettings((s) => !s)}
          className="px-3 py-2 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20"
          aria-label="Settings"
          title="Settings"
        >
          {"⚙"}
        </button>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 w-80 p-4 rounded-lg bg-neutral-900/90 text-white border border-white/20 shadow-xl backdrop-blur">
          <h3 className="text-lg font-semibold mb-3">Customize Settings</h3>

          <label className="block mb-2">
            <span className="text-sm">Particle Count: {settings.particleCount}</span>
            <input
              type="range"
              min={20}
              max={400}
              value={settings.particleCount}
              onChange={(e) => setSettings((s) => ({ ...s, particleCount: Number(e.target.value) }))}
              className="w-full"
            />
          </label>

          <label className="block mb-2">
            <span className="text-sm">Explosion Size: {settings.explosionSize.toFixed(2)}</span>
            <input
              type="range"
              min={1}
              max={5}
              step={0.05}
              value={settings.explosionSize}
              onChange={(e) => setSettings((s) => ({ ...s, explosionSize: Number(e.target.value) }))}
              className="w-full"
            />
          </label>

          <label className="block mb-2">
            <span className="text-sm">Gravity: {settings.gravity.toFixed(2)}</span>
            <input
              type="range"
              min={0}
              max={0.3}
              step={0.01}
              value={settings.gravity}
              onChange={(e) => setSettings((s) => ({ ...s, gravity: Number(e.target.value) }))}
              className="w-full"
            />
          </label>

          <label className="block mb-2">
            <span className="text-sm">Spawn Rate (per minute): {settings.spawnRate}</span>
            <input
              type="range"
              min={5}
              max={120}
              value={settings.spawnRate}
              onChange={(e) => setSettings((s) => ({ ...s, spawnRate: Number(e.target.value) }))}
              className="w-full"
            />
          </label>

          <label className="block mb-2">
            <span className="text-sm">Volume: {Math.round(settings.volume * 100)}%</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.volume}
              onChange={(e) => setSettings((s) => ({ ...s, volume: Number(e.target.value) }))}
              className="w-full"
              disabled={!soundEnabled}
            />
          </label>

          <div className="mt-3 text-sm text-white/80">
            Tap anywhere to set off fireworks at that location.
          </div>
        </div>
      )}
    </div>
  );
};

export default FireworksCanvas;