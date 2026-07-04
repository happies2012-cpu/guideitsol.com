'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NeuralNetworkSlide } from './slides/NeuralNetworkSlide';
import { GlobalNetworkSlide } from './slides/GlobalNetworkSlide';
import { WorkspaceSlide } from './slides/WorkspaceSlide';
import { CloudInfraSlide } from './slides/CloudInfraSlide';
import { AnalyticsSlide } from './slides/AnalyticsSlide';
import { AutomationSlide } from './slides/AutomationSlide';
import { EcosystemSlide } from './slides/EcosystemSlide';
import { FutureCitySlide } from './slides/FutureCitySlide';

const SLIDES = [
  { Component: NeuralNetworkSlide, title: 'AI Neural Network' },
  { Component: GlobalNetworkSlide, title: 'Global Network' },
  { Component: WorkspaceSlide, title: 'AI Workspace' },
  { Component: CloudInfraSlide, title: 'Cloud Infrastructure' },
  { Component: AnalyticsSlide, title: 'Analytics' },
  { Component: AutomationSlide, title: 'Enterprise Automation' },
  { Component: EcosystemSlide, title: 'Tech Ecosystem' },
  { Component: FutureCitySlide, title: 'Future City' },
];

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per slide

export const BackgroundSliderCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setIsAutoPlay(false);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const CurrentSlideComponent = SLIDES[currentSlide].Component;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* Slides */}
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Controls - Previous */}
      <motion.button
        onClick={handlePrev}
        className="absolute left-8 top-1/2 z-20 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </motion.button>

      {/* Controls - Next */}
      <motion.button
        onClick={handleNext}
        className="absolute right-8 top-1/2 z-20 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </motion.button>

      {/* Indicators - Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`transition-all duration-300 rounded-full backdrop-blur-sm ${
              idx === currentSlide
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 text-white/60 text-sm font-medium backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
        {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>

      {/* Auto-play toggle */}
      <motion.button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        className="absolute top-8 left-8 z-20 text-white/60 hover:text-white text-sm font-medium backdrop-blur-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
      >
        {isAutoPlay ? '⏸ Pause' : '▶ Play'}
      </motion.button>

      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
        initial={{ width: '0%' }}
        animate={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </section>
  );
};

export default BackgroundSliderCarousel;
