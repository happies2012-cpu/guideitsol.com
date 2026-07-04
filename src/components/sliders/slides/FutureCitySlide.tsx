'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FutureCitySlide = () => {
  const buildings = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    height: Math.random() * 200 + 100,
    x: (i % 4) * 100,
    delay: i * 0.1,
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-t from-blue-950 via-slate-950 to-slate-900">
      {/* Starfield background */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Skyline */}
      <div className="absolute bottom-0 w-full h-1/2 flex items-end justify-center gap-1 px-4">
        {buildings.map((building) => (
          <motion.div
            key={building.id}
            className="flex-1 bg-gradient-to-t from-cyan-400/30 to-blue-500/40 border-t-2 border-cyan-400/50 relative"
            style={{
              height: `${building.height}px`,
            }}
            animate={{
              boxShadow: [
                `0 0 20px rgba(34, 211, 238, ${0.3 + Math.random() * 0.3})`,
                `0 0 40px rgba(34, 211, 238, ${0.5 + Math.random() * 0.3})`,
                `0 0 20px rgba(34, 211, 238, ${0.3 + Math.random() * 0.3})`,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: building.delay,
              ease: 'easeInOut',
            }}
          >
            {/* Windows */}
            {Array.from({ length: Math.ceil(building.height / 30) }).map((_, wIdx) => (
              <motion.div
                key={wIdx}
                className="absolute w-2 h-2 bg-cyan-300/70 rounded-sm left-2 top-2"
                style={{
                  top: `${wIdx * 20}px`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: building.delay + wIdx * 0.2,
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Ground glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/20 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50 + 25}%`,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-2">Future Smart City</h3>
          <p className="text-gray-300">AI-powered tomorrow</p>
        </div>
      </div>
    </div>
  );
};

export default FutureCitySlide;
