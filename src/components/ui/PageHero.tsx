"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, Easing } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, Shield, Code, CheckCircle, Brain, TrendingUp, Target, Lightbulb } from "lucide-react";
import { getHeroImage } from "@/lib/image-utils";
import LightboxForm from "./LightboxForm";

interface Card {
  title: string;
  description: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaText?: string;
  cards?: Card[];
  relatedTitle?: string;
  relatedItems?: { title: string; href: string }[];
  backgroundImage?: string; // New prop for background image
  pageType?: string; // New prop for page type to determine background image
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  ctaHref = "/contact",
  ctaText = "Get Started →",
  cards = [],
  relatedTitle = "Related Solutions",
  relatedItems = [],
  backgroundImage, // Destructure the new prop
  pageType = "default", // Default page type
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Features for the enhanced section
  const features = [
    {
      icon: Code,
      title: "Expert Solutions",
      description: "Industry-leading expertise and cutting-edge technology solutions tailored to your specific needs."
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personalized support from our team of experts throughout your project lifecycle."
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Rapid implementation and deployment to get you results quickly and efficiently."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and reliability to protect your business and data."
    }
  ];

  // Stats for the enhanced section
  const stats = [
    { value: "500+", label: "Ready Workflow with AI" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "15+", label: "Years Experience" }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as Easing } },
    hover: { y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
  };

  // Function to get a relevant background image based on the page title or type
  const getBackgroundImage = () => {
    if (backgroundImage) return backgroundImage;
    
    // Use the pageType to get the appropriate hero image
    const image = getHeroImage(pageType);
    return image;
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    // If it's a contact link, open the lightbox instead
    if (ctaHref === "/contact" || ctaHref?.startsWith("mailto:")) {
      e.preventDefault();
      setIsLightboxOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow container mx-auto px-4 py-20">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            variants={containerVariants}
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p 
              className="text-xl text-gray-200 max-w-3xl mx-auto mb-10"
              variants={containerVariants}
            >
              {subtitle}
            </motion.p>
          )}
          
          <motion.div variants={containerVariants}>
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-lg"
              onClick={handleCtaClick}
            >
              {ctaHref?.startsWith("mailto:") ? (
                <a href={ctaHref}>{ctaText}</a>
              ) : (
                <Link to={ctaHref}>{ctaText}</Link>
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-200">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="bg-blue-500 bg-opacity-20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Icon className="text-blue-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Cards Section */}
        {cards && cards.length > 0 && (
          <motion.div 
            className="mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl overflow-hidden border border-white border-opacity-20"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className="bg-transparent border-0 text-white">
                    <CardHeader>
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-200 mb-4">{card.description}</p>
                      {card.href && (
                        <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                          <Link to={card.href}>Learn More</Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Items Section */}
        {relatedItems && relatedItems.length > 0 && (
          <motion.div 
            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h2 className="text-2xl font-bold text-white mb-6">{relatedTitle}</h2>
            <div className="flex flex-wrap gap-3">
              {relatedItems.map((item, index) => (
                <Button 
                  key={index} 
                  asChild 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Link to={item.href}>{item.title}</Link>
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Lightbox Form */}
      <LightboxForm 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={title}
        serviceType={pageType}
      />
    </div>
  );
};

export default PageHero;