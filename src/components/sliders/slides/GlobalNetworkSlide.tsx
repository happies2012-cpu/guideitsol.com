'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export const GlobalNetworkSlide = () => {
  const points = [
    { label: 'North America', x: 25, y: 35, size: 'large' },
    { label: 'Europe', x: 55, y: 30, size: 'large' },
    { label: 'Asia Pacific', x: 75, y: 50, size: 'large' },
    { label: 'South America', x: 30, y: 70, size: 'medium' },
    { label: 'Middle East', x: 60, y: 55, size: 'medium' },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(59,130,246,.1)_25%,rgba(59,130,246,.1)_26%,transparent_27%,transparent_74%,rgba(59,130,246,.1)_75%,rgba(59,130,246,.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
      </div>

      {/* Globe background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <Globe size={400} />
      </motion.div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {points.map((point, idx) => {
          const nextPoint = points[(idx + 1) % points.length];
          return (
            <motion.line
              key={`line-${idx}`}
              x1={`${point.x}%`}
              y1={`${point.y}%`}
              x2={`${nextPoint.x}%`}
              y2={`${nextPoint.y}%`}
              stroke="url(#globeGradient)"
              strokeWidth="1"
              opacity="0.2"
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: idx * 0.2 }}
            />
          );
        })}
        <defs>
          <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Network nodes */}
      {points.map((point, idx) => (
        <motion.div
          key={`point-${idx}`}
          className="absolute"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            x: '-50%',
            y: '-50%',
          }}
        >
          <motion.div
            className={`${
              point.size === 'large'
                ? 'w-6 h-6 shadow-lg shadow-blue-500/50'
                : 'w-4 h-4 shadow-md shadow-cyan-500/40'
            } rounded-full bg-gradient-to-r from-blue-400 to-cyan-400`}
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                `0 0 20px rgba(6, 182, 212, 0.5)`,
                `0 0 40px rgba(6, 182, 212, 0.8)`,
                `0 0 20px rgba(6, 182, 212, 0.5)`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: idx * 0.3,
            }}
          />
          <motion.span
            className="absolute top-8 left-0 text-xs text-gray-300 whitespace-nowrap"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {point.label}
          </motion.span>
        </motion.div>
      ))}

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-2">Global Enterprise Network</h3>
          <p className="text-gray-300">Connected across continents</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalNetworkSlide;
