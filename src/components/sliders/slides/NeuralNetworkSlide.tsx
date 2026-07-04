'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const NeuralNetworkSlide = () => {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.cos((i / 12) * Math.PI * 2) * 120,
    y: Math.sin((i / 12) * Math.PI * 2) * 120,
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950">
      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.3))' }}>
        <defs>
          <linearGradient id="nodeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        
        {/* Animated connections */}
        {nodes.map((node, idx) => {
          const nextNode = nodes[(idx + 1) % nodes.length];
          return (
            <motion.line
              key={`line-${idx}`}
              x1={`calc(50% + ${node.x}px)`}
              y1={`calc(50% + ${node.y}px)`}
              x2={`calc(50% + ${nextNode.x}px)`}
              y2={`calc(50% + ${nextNode.y}px)`}
              stroke="url(#nodeGradient1)"
              strokeWidth="2"
              opacity="0.3"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: idx * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Nodes with pulsing effect */}
      {nodes.map((node, idx) => (
        <motion.div
          key={`node-${idx}`}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg"
          style={{
            left: '50%',
            top: '50%',
            x: node.x,
            y: node.y,
            marginLeft: '-6px',
            marginTop: '-6px',
          }}
          animate={{
            scale: [1, 1.5, 1],
            boxShadow: [
              '0 0 10px rgba(168, 85, 247, 0.5)',
              '0 0 30px rgba(168, 85, 247, 0.8)',
              '0 0 10px rgba(168, 85, 247, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: idx * 0.15,
          }}
        />
      ))}

      {/* Center glow */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-2">AI Neural Network</h3>
          <p className="text-gray-300">Interconnected Intelligence</p>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetworkSlide;
