"use client";

import { motion, Easing } from "framer-motion";
import Hero from "@/components/Hero";
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

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };



  return (
    <div>
      <Hero />
      
      {/* Existing Components */}
      <StatsAndCEOSection />
      <LearningPathsSection />
      <ReviewsSection />
      <Services />
      <StatsSection />
      <CEOSection />
      <TestimonialsSection />
      <PricingSection />
      <WhyChooseUsSection />
      <InvestorSection />
      <CallToActionSection />
    </div>
  );
};

export default Home;