"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { Sparkles, Truck, Lightbulb, Code, Globe, MessageSquare, Video, Coffee, Plane, Building, CalendarCheck, CheckCircle, Layers, TrendingUp, Target, Layout, Settings, Users, ArrowRight } from "lucide-react"; // Added Users and ArrowRight
import { mainNavigation, NavItem } from "@/lib/navigation-data";
import PageHero from "@/components/ui/PageHero";
import LightboxForm from "@/components/ui/LightboxForm";

const SolutionsOverview = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as Easing } },
    hover: { y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
  };

  // Helper to get a Lucide icon based on a title keyword
  const getIconForTitle = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("on-demand")) return Truck;
    if (lowerTitle.includes("emerging tech")) return Lightbulb;
    if (lowerTitle.includes("trending technology")) return TrendingUp;
    if (lowerTitle.includes("booking app")) return CalendarCheck;
    if (lowerTitle.includes("chatbot")) return MessageSquare;
    if (lowerTitle.includes("food delivery")) return Coffee;
    if (lowerTitle.includes("video streaming")) return Video;
    if (lowerTitle.includes("elearning")) return Layout;
    if (lowerTitle.includes("hrms")) return Users;
    if (lowerTitle.includes("data engineering")) return Code;
    if (lowerTitle.includes("devops")) return Settings;
    return Globe; // Default icon
  };

  // Extract top-level solution categories
  const solutionsCategory = mainNavigation.find(nav => nav.title === "Solutions");
  const solutionCategoriesToDisplay = solutionsCategory?.children || [];

  const solutionsToDisplay = solutionCategoriesToDisplay.map((category, index) => ({
    icon: getIconForTitle(category.title),
    title: category.title,
    description: `Explore our ${category.title.toLowerCase()} solutions designed to meet modern business demands.`,
    href: category.href || "#",
  }));

  return (
    <div className="relative min-h-screen">
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gradient-primary-start/5 via-gradient-primary-end/5 to-cyan-500/5 pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 18c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z' stroke='hsl(var(--gradient-primary-start)/0.1)' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Hero Section with unique background */}
      <PageHero
        title="Our Solutions"
        subtitle="Empowering businesses with cutting-edge technology and strategic insights to thrive in the digital era."
        ctaText="Get a Free Consultation"
        pageType="solutions"
      />

      {/* Solutions Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionsToDisplay.map((solution, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="group relative overflow-hidden backdrop-blur-xl bg-background/40 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--gradient-primary-start)/0.5)] h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/5 via-gradient-primary-end/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <CardContent className="p-8 relative z-10 h-full flex flex-col">
                    <div className="relative w-16 h-16 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start to-gradient-primary-end rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                      <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-gradient-primary-end/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
                        <solution.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">{solution.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{solution.description}</p>
                    
                    <Link to={solution.href}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary border-primary/20 backdrop-blur-sm transition-all">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/20 via-gradient-primary-end/20 to-cyan-500/20" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-background/10 backdrop-blur-xl border border-primary/20 shadow-[0_0_60px_-15px_hsl(var(--gradient-primary-start)/0.5)]">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
              Ready to Innovate Your Business?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Explore our tailored solutions and transform your challenges into opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity shadow-lg"
                onClick={() => setIsLightboxOpen(true)}
              >
                Get a Free Consultation
              </Button>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm text-white border-white">
                  View Our Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Lightbox Form */}
      <LightboxForm 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Solutions Inquiry"
        serviceType="solutions"
      />
    </div>
  );
};

export default SolutionsOverview;