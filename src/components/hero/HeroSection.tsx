'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientBackground } from './GradientBackground';
import { ParticleBackground } from './ParticleBackground';
import { ArrowRight, Play } from 'lucide-react';

export const HeroSection = () => {
  const [isHoveredCTA, setIsHoveredCTA] = useState(false);
  const [isHoveredDemo, setIsHoveredDemo] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Background elements */}
      <GradientBackground />
      <ParticleBackground />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-block"
        >
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ✨ Powered by Advanced AI
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Enterprise AI Platform
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Reimagined
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Build enterprise-grade AI applications with secure, scalable infrastructure. Empower your organization to innovate at the speed of thought while maintaining complete security.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          {/* Primary CTA */}
          <motion.button
            onHoverStart={() => setIsHoveredCTA(true)}
            onHoverEnd={() => setIsHoveredCTA(false)}
            className="px-8 py-3 sm:px-10 sm:py-4 rounded-full bg-white text-slate-950 font-semibold inline-flex items-center gap-2 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <motion.div
              animate={{ x: isHoveredCTA ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onHoverStart={() => setIsHoveredDemo(true)}
            onHoverEnd={() => setIsHoveredDemo(false)}
            className="px-8 py-3 sm:px-10 sm:py-4 rounded-full border border-gray-500/30 text-white font-semibold inline-flex items-center gap-2 backdrop-blur-sm hover:border-gray-400/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ scale: isHoveredDemo ? 1.1 : 1 }}>
              <Play size={20} fill="currentColor" />
            </motion.div>
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-12 border-t border-gray-700/30"
        >
          {[
            { label: 'Companies', value: '10K+' },
            { label: 'AI Models', value: '100+' },
            { label: 'Daily Requests', value: '1B+' },
            { label: 'Uptime SLA', value: '99.99%' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating cards decoration */}
      <motion.div
        className="absolute top-1/3 right-8 w-64 h-40 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-md p-6 hidden lg:flex flex-col justify-between"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div>
          <div className="w-2 h-2 rounded-full bg-purple-400 mb-2" />
          <p className="text-sm text-gray-300">API Response Time</p>
        </div>
        <p className="text-2xl font-bold text-white">45ms</p>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-8 w-64 h-40 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-md p-6 hidden lg:flex flex-col justify-between"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div>
          <div className="w-2 h-2 rounded-full bg-blue-400 mb-2" />
          <p className="text-sm text-gray-300">Data Processing</p>
        </div>
        <p className="text-2xl font-bold text-white">10PB/day</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
