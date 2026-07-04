'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Box, Network } from 'lucide-react';

export const CloudInfraSlide = () => {
  const containers = [
    { icon: Cloud, label: 'Cloud', x: -100, y: -80 },
    { icon: Box, label: 'Container', x: 100, y: -80 },
    { icon: Network, label: 'Network', x: 0, y: 100 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-950 via-slate-950 to-slate-950">
      {/* Data stream background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0"
            style={{
              top: `${20 + i * 15}%`,
              width: '100%',
            }}
            animate={{
              x: [-1000, 1000],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main infrastructure diagram */}
      <div className="relative z-10">
        {/* Top containers */}
        {containers.slice(0, 2).map((container, idx) => {
          const Icon = container.icon;
          return (
            <motion.div
              key={idx}
              className="absolute w-24 h-24 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-400/20 border border-cyan-400/50 flex items-center justify-center"
              style={{
                left: `calc(50% + ${container.x}px)`,
                top: `calc(50% + ${container.y}px)`,
                marginLeft: '-48px',
                marginTop: '-48px',
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                  '0 0 40px rgba(34, 211, 238, 0.6)',
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.5,
              }}
            >
              <Icon className="w-12 h-12 text-cyan-400" />
            </motion.div>
          );
        })}

        {/* Bottom container */}
        <motion.div
          className="absolute w-24 h-24 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 border border-blue-400/50 flex items-center justify-center"
          style={{
            left: 'calc(50% - 48px)',
            top: 'calc(50% + 76px)',
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.3)',
              '0 0 40px rgba(59, 130, 246, 0.6)',
              '0 0 20px rgba(59, 130, 246, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
          }}
        >
          <Network className="w-12 h-12 text-blue-400" />
        </motion.div>

        {/* Connection lines */}
        <svg className="absolute w-96 h-96" style={{ left: 'calc(50% - 192px)', top: 'calc(50% - 192px)' }}>
          {containers.map((_, idx) => (
            <motion.line
              key={`line-${idx}`}
              x1="192"
              y1="192"
              x2={`${192 + containers[idx].x}`}
              y2={`${192 + containers[idx].y}`}
              stroke="url(#infraGradient)"
              strokeWidth="2"
              opacity="0.5"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
            />
          ))}
          <defs>
            <linearGradient id="infraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-2">Cloud Infrastructure</h3>
          <p className="text-gray-300">Containerized & Scalable</p>
        </div>
      </div>
    </div>
  );
};

export default CloudInfraSlide;
