'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

export const AnalyticsSlide = () => {
  const bars = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    height: Math.random() * 70 + 20,
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-950">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(16,185,129,.1)_25%,rgba(16,185,129,.1)_26%,transparent_27%,transparent_74%,rgba(16,185,129,.1)_75%,rgba(16,185,129,.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
      </div>

      {/* Animated charts container */}
      <div className="relative z-10 flex gap-12 items-end justify-center h-64">
        {/* Bar chart */}
        <div className="flex gap-2 items-end">
          {bars.map((bar) => (
            <motion.div
              key={bar.id}
              className="w-6 rounded-t-lg bg-gradient-to-t from-emerald-400 to-emerald-300"
              style={{ height: '40px' }}
              animate={{
                height: [`${bar.height}px`, `${bar.height + 30}px`, `${bar.height}px`],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: bar.id * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Line chart */}
        <motion.svg width="120" height="100" viewBox="0 0 120 100" className="absolute right-32">
          <motion.polyline
            points="0,80 20,60 40,50 60,70 80,30 100,50 120,40"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            animate={{
              strokeDasharray: [0, 240],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ strokeDasharray: 240 }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Floating icons */}
      <motion.div
        className="absolute top-12 left-12 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-green-400/20 border border-emerald-400/50 flex items-center justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <BarChart3 className="w-8 h-8 text-emerald-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-12 right-12 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-400/20 border border-cyan-400/50 flex items-center justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        <PieChart className="w-8 h-8 text-cyan-400" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-400/20 border border-green-400/50 flex items-center justify-center"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <TrendingUp className="w-8 h-8 text-green-400" />
      </motion.div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-2">Real-time Analytics</h3>
          <p className="text-gray-300">Insights at your fingertips</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSlide;
