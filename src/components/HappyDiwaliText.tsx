import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HappyDiwaliText: React.FC = () => {
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

    // Create floating lights
    class FloatingLight {
      x: number;
      y: number;
      radius: number;
      color: string;
      opacity: number;
      speed: number;
      angle: number;
      angleSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 60 + 30}, 100%, ${Math.random() * 30 + 70}%)`;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.speed = Math.random() * 0.5 + 0.1;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.05;
      }

      update() {
        this.y -= this.speed;
        this.angle += this.angleSpeed;
        this.x += Math.sin(this.angle) * 0.5;
        
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create floating lights
    const lights: FloatingLight[] = [];
    const lightCount = 50;

    for (let i = 0; i < lightCount; i++) {
      lights.push(new FloatingLight());
    }

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw lights
      lights.forEach(light => {
        light.update();
        light.draw();
      });

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
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Floating lights background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Main Happy Diwali text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
            style={{
              textShadow: '0 0 20px rgba(255, 100, 100, 0.7), 0 0 40px rgba(255, 50, 50, 0.5)',
              fontFamily: "'Dancing Script', cursive"
            }}
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 100, 100, 0.7), 0 0 40px rgba(255, 50, 50, 0.5)',
                '0 0 30px rgba(255, 200, 100, 0.8), 0 0 50px rgba(255, 150, 50, 0.6)',
                '0 0 20px rgba(255, 100, 100, 0.7), 0 0 40px rgba(255, 50, 50, 0.5)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Happy Diwali
          </motion.h1>
          
          <motion.div
            className="mt-4 text-2xl md:text-3xl text-yellow-200 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Festival of Lights
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-yellow-400 opacity-20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-red-500 opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-pink-500 opacity-20 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default HappyDiwaliText;