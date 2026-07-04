'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Workflow, Cog, Zap } from 'lucide-react';

export const AutomationSlide = () => {
  const steps = [
    { icon: Cog, label: 'Configure' },
    { icon: Workflow, label: 'Automate' },
    { icon: Zap, label: 'Execute' },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-950 via-slate-950 to-slate-950">
      {/* Animated background circles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-orange-500/20"
          style={{
            width: 200 + i * 150,
            height: 200 + i * 150,
            left: '50%',
            top: '50%',
            marginLeft: -(100 + i * 75),
            marginTop: -(100 + i * 75),
          }}
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 20 + i * 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Process flow */}
      <div className="relative z-10 flex gap-8 items-center">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={idx}>
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400/20 to-red-400/20 border-2 border-orange-400 flex items-center justify-center flex-shrink-0"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(234, 88, 12, 0.3)',
                    '0 0 40px rgba(234, 88, 12, 0.6)',
                    '0 0 20px rgba(234, 88, 12, 0.3)',
                  ],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.5,
                }}
              >
                <Icon className="w-10 h-10 text-orange-400" />
              </motion.div>

              {idx < steps.length - 1 && (
                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-orange-400/0 via-orange-400/50 to-orange-400/0"
                  animate={{
                    x: [-20, 20, -20],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.5,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Gears in background */}
      <motion.div
        className="absolute top-1/4 left-12 w-20 h-20 rounded-full border-2 border-orange-500/30 flex items-center justify-center"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Cog className="w-10 h-10 text-orange-500/50" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-12 w-24 h-24 rounded-full border-2 border-orange-500/20 flex items-center justify-center"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <Cog className="w-12 h-12 text-orange-500/30" />
      </motion.div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-2">Enterprise Automation</h3>
          <p className="text-gray-300">Streamlined workflows</p>
        </div>
      </div>
    </div>
  );
};

export default AutomationSlide;
