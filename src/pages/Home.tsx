"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import AIEmployeesSection from "@/components/AIEmployeesSection";
import Services from "@/components/Services";
import StatsSection from "@/components/StatsSection";
import CEOSection from "@/components/CEOSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CallToActionSection from "@/components/CallToActionSection";
import StatsAndCEOSection from "@/components/StatsAndCEOSection";
import ScrollingCardsCarousel from "@/components/ScrollingCardsCarousel";
import PricingSection from "@/components/PricingSection";
import InvestorSection from "@/components/InvestorSection";
import LearningPathsSection from "@/components/LearningPathsSection";
import ReviewsSection from "@/components/ReviewsSection";
import { useAnimations } from "@/hooks/useAnimations";
import PageTransition from "@/components/ui/page-transition";

const Home = () => {
  const { staggerContainer, staggerItem } = useAnimations();

  return (
    <PageTransition animationType="slide">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItem}>
          <Hero />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <AIEmployeesSection />
        </motion.div>
        
        {/* Existing Components with animations */}
        <motion.div variants={staggerItem}>
          <StatsAndCEOSection />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <LearningPathsSection />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <ReviewsSection />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <Services />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <StatsSection />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <CEOSection />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <TestimonialsSection />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <PricingSection />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <WhyChooseUsSection />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <InvestorSection />
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <CallToActionSection />
        </motion.div>
      </motion.div>
    </PageTransition>
  );
};

export default Home;