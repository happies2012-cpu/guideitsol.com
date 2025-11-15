"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Smartphone, Download, Shield, Zap, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const FlutterAppDevelopment = () => {
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

  const features = [
    {
      icon: Code,
      title: "Single Codebase for Multi-Platform",
      description: "Write once, deploy everywhere – iOS, Android, web, and desktop from a single Dart codebase.",
    },
    {
      icon: Smartphone,
      title: "Hot Reload & Fast Development",
      description: "Rapid iteration with Flutter's hot reload feature for instant UI feedback during development.",
    },
    {
      icon: Download,
      title: "Native Performance",
      description: "Compiled to native ARM code for high performance comparable to native apps.",
    },
    {
      icon: Shield,
      title: "Rich Widget Library",
      description: "Extensive set of customizable Material Design and Cupertino widgets for beautiful UIs.",
    },
    {
      icon: Zap,
      title: "Third-Party Integration",
      description: "Easy integration with Firebase, APIs, and device features like camera, location, and notifications.",
    },
    {
      icon: Target,
      title: "Custom Flutter Solutions",
      description: "Tailored apps for startups, enterprises, and industries requiring cross-platform consistency.",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="min-h-screen bg-background"
    >
      {/* Hero Section with unique background */}
      <PageHero
        title="Flutter App Development"
        subtitle="Guidesoft harnesses the power of Flutter to build beautiful, fast, and natively compiled applications for mobile, web, and desktop from a single codebase. Accelerate your time-to-market with our Flutter expertise."
        ctaText="Get a Quote"
        pageType="flutter-app"
      />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Guidesoft for Flutter Development?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flutter's widget-based architecture and Google's backing make it ideal for cost-effective, high-quality cross-platform apps. Our developers create pixel-perfect UIs with consistent performance across platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-primary/20">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Develop Cross-Platform with Flutter
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Partner with Guidesoft to leverage Flutter's efficiency for your multi-platform app needs. Let's build something amazing together.
          </p>
          <Button 
            size="lg" 
            className="px-8 text-lg bg-white text-primary hover:bg-gray-100"
            onClick={() => setIsLightboxOpen(true)}
          >
            Start Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      {/* Lightbox Form */}
      <LightboxForm
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Flutter App Development Inquiry"
        serviceType="Flutter App Development"
      />
    </motion.div>
  );
};

export default FlutterAppDevelopment;