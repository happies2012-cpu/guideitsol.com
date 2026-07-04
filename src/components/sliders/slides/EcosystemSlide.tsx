'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Link2, GitBranch } from 'lucide-react';

export const EcosystemSlide = () => {
  const technologies = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'GraphQL',
  ];

  const angle = (360 / technologies.length);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950">
      {/* Tech stack visualization */}
      <div className="relative w-96 h-96">
        {/* Center tech node */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-400/30 to-purple-400/30 border border-indigo-400/60 flex items-center justify-center flex-col gap-2"
          style={{ marginLeft: '-48px', marginTop: '-48px' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Package className="w-8 h-8 text-indigo-400" />
          <span className="text-xs text-indigo-300 font-semibold">Ecosystem</span>
        </motion.div>

        {/* Tech nodes in circle */}
        {technologies.map((tech, idx) => {
          const rad = (angle * idx) * (Math.PI / 180);
          const x = Math.cos(rad) * 150;
          const y = Math.sin(rad) * 150;

          return (
            <motion.div
              key={idx}
              className="absolute w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/40 flex items-center justify-center text-xs font-semibold text-indigo-300"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                marginLeft: '-32px',
                marginTop: '-32px',
              }}
              animate={{
                y: [0, -10, 0],
                boxShadow: [
                  '0 0 10px rgba(99, 102, 241, 0.3)',
                  '0 0 20px rgba(99, 102, 241, 0.5)',
                  '0 0 10px rgba(99, 102, 241, 0.3)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: idx * 0.1,
              }}
            >
              {tech}
            </motion.div>
          );
        })}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full">
          {technologies.map((_, idx) => {
            const rad = (angle * idx) * (Math.PI / 180);
            const x = Math.cos(rad) * 150;
            const y = Math.sin(rad) * 150;
            return (
              <motion.line
                key={`line-${idx}`}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${x}px)`}
                y2={`calc(50% + ${y}px)`}
                stroke="url(#ecoGradient)"
                strokeWidth="1"
                opacity="0.3"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.1,
                }}
              />
            );
          })}
          <defs>
            <linearGradient id="ecoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating connection icons */}
      <motion.div
        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Link2 className="w-6 h-6 text-indigo-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <GitBranch className="w-6 h-6 text-purple-400" />
      </motion.div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-2">Software Engineering Ecosystem</h3>
          <p className="text-gray-300">Cutting-edge technology stack</p>
        </div>
      </div>
    </div>
  );
};

export default EcosystemSlide;
