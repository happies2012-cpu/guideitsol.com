'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Zap, Database } from 'lucide-react';

export const WorkspaceSlide = () => {
  const elements = [
    { icon: Code, label: 'Code', x: -120, y: -80, color: 'from-green-400' },
    { icon: Layout, label: 'Design', x: 120, y: -80, color: 'from-blue-400' },
    { icon: Zap, label: 'Performance', x: -120, y: 80, color: 'from-yellow-400' },
    { icon: Database, label: 'Data', x: 120, y: 80, color: 'from-purple-400' },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950">
      {/* Isometric grid background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(120deg, rgba(59, 130, 246, 0.1) 0%, transparent 30%), linear-gradient(240deg, rgba(59, 130, 246, 0.1) 0%, transparent 30%)',
        backgroundSize: '100px 100px',
      }} />

      {/* Central workspace */}
      <motion.div
        className="relative w-80 h-80 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 backdrop-blur-md p-8"
        animate={{
          boxShadow: [
            '0 0 60px rgba(59, 130, 246, 0.3)',
            '0 0 100px rgba(59, 130, 246, 0.5)',
            '0 0 60px rgba(59, 130, 246, 0.3)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
          style={{ marginLeft: '-8px', marginTop: '-8px' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Rotating content */}
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-2">AI Workspace</h3>
            <p className="text-sm text-gray-300">Unified Development Platform</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating elements */}
      {elements.map((element, idx) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={idx}
            className={`absolute w-20 h-20 rounded-2xl bg-gradient-to-br ${element.color} to-transparent border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg`}
            style={{
              x: element.x,
              y: element.y,
            }}
            animate={{
              y: [element.y, element.y - 20, element.y],
              rotateZ: [0, 5, 0],
            }}
            transition={{
              duration: 3 + idx,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.3,
            }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
        );
      })}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        {elements.map((el, idx) => (
          <motion.line
            key={`line-${idx}`}
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${el.x}px)`}
            y2={`calc(50% + ${el.y}px)`}
            stroke="url(#workspaceGradient)"
            strokeWidth="1"
            opacity="0.3"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
          />
        ))}
        <defs>
          <linearGradient id="workspaceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-2">Generative AI Workspace</h3>
          <p className="text-gray-300">Full-stack development at speed</p>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSlide;
