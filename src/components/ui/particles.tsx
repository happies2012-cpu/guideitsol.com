import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

export const Particles: React.FC<ParticlesProps> = ({
  className = '',
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = '#ffffff',
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(0);

  useEffect(() => {
    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);
    
    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  useEffect(() => {
    if (refresh) {
      initCanvas();
    }
  }, [refresh]);

  const initCanvas = () => {
    if (canvasRef.current && canvasContainerRef.current) {
      const canvas = canvasRef.current;
      const container = canvasContainerRef.current;
      
      // Set canvas dimensions
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Get context
      context.current = canvas.getContext('2d');
      
      // Create particles
      particles.current = [];
      for (let i = 0; i < quantity; i++) {
        particles.current.push(createParticle());
      }
    }
  };

  const createParticle = (): Particle => {
    if (!canvasRef.current) {
      return {
        x: 0,
        y: 0,
        size: 0,
        speedX: 0,
        speedY: 0,
        color: '',
        opacity: 0,
      };
    }
    
    const canvas = canvasRef.current;
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * size,
      speedX: (Math.random() - 0.5) * vx,
      speedY: (Math.random() - 0.5) * vy,
      color,
      opacity: Math.random() * 0.5 + 0.1,
    };
  };

  const drawParticles = () => {
    if (!context.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = context.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles
    particles.current.forEach((particle, i) => {
      // Update particle position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Boundary check - wrap around
      if (particle.x > canvas.width) particle.x = 0;
      else if (particle.x < 0) particle.x = canvas.width;
      
      if (particle.y > canvas.height) particle.y = 0;
      else if (particle.y < 0) particle.y = canvas.height;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
    });
    
    // Reset global alpha
    ctx.globalAlpha = 1;
  };

  const animate = () => {
    drawParticles();
    animationFrameId.current = requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={canvasContainerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Particles;