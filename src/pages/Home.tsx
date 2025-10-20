"use client";

import { motion, Easing } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, TrendingUp, Users, DollarSign, Brain, Code, Smartphone, Globe, Lightbulb } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import TypewriterEffect from "@/components/TypewriterEffect";
import PageHero from "@/components/ui/PageHero";
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
import { getHeroImage } from "@/lib/image-utils";
import Hero from "@/components/Hero";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };

  // Features section for the home page
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Solutions",
      description: "Leverage cutting-edge artificial intelligence to automate processes and gain actionable insights from your data."
    },
    {
      icon: Code,
      title: "Custom Development",
      description: "Bespoke software solutions tailored to your unique business requirements and growth objectives."
    },
    {
      icon: Smartphone,
      title: "Mobile Excellence",
      description: "Engaging mobile applications that deliver exceptional user experiences across all platforms."
    },
    {
      icon: Globe,
      title: "Digital Transformation",
      description: "Comprehensive strategies to modernize your business operations and stay ahead of the competition."
    },
    {
      icon: Lightbulb,
      title: "Innovation Consulting",
      description: "Strategic guidance to identify opportunities and implement transformative technology solutions."
    },
    {
      icon: TrendingUp,
      title: "Growth Optimization",
      description: "Data-driven approaches to accelerate business growth and maximize ROI."
    }
  ];

  return (
    <div>
      {/* Original Hero Section */}
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