"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, Code, Download, Shield, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const iOSAppDevelopment = () => {
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
      title: "Native iOS Development",
      description: "Proficiency in Swift and Objective-C for optimal performance on Apple devices.",
    },
    {
      icon: Apple,
      title: "Human Interface Guidelines",
      description: "Adhering to Apple's HIG for seamless, intuitive user experiences.",
    },
    {
      icon: Download,
      title: "App Store Optimization",
      description: "ASO techniques to enhance discoverability and rankings in the App Store.",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Implementing Apple's privacy features and secure coding practices.",
    },
    {
      icon: Zap,
      title: "Apple Ecosystem Integration",
      description: "Integration with iCloud, Apple Pay, ARKit, and other Apple frameworks.",
    },
    {
      icon: Target,
      title: "Custom iOS Solutions",
      description: "Bespoke apps for enterprise, consumer, health, and entertainment sectors.",
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
        title="iOS App Development"
        subtitle="Guidesoft specializes in creating premium iOS applications using Swift and Apple's latest technologies. We deliver elegant, high-performance apps that delight users on iPhone, iPad, and beyond."
        ctaText="Get a Quote"
        pageType="ios-app"
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
              Why Choose Guidesoft for iOS Development?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our iOS experts stay ahead of Apple's evolving ecosystem, ensuring your app is future-proof, secure, and optimized for the latest iOS versions and devices.
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
            Ready to Launch Your iOS App?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Collaborate with Guidesoft to bring your vision to life on the Apple platform. Contact us for a free consultation.
          </p>
          <Button 
            size="lg" 
            className="px-8 text-lg"
            onClick={() => setIsLightboxOpen(true)}
          >
            Start Your Project
          </Button>
        </div>
      </section>
      
      {/* Lightbox Form */}
      <LightboxForm
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="iOS App Development Inquiry"
        serviceType="iOS App Development"
      />
    </motion.div>
  );
};

export default iOSAppDevelopment;