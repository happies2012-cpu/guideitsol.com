"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Smartphone, Download, Shield, Zap, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const ProgressiveWebApps = () => {
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
      title: "Offline Functionality",
      description: "Service Workers enable caching and offline access, ensuring your PWA works without internet connectivity.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Adaptive layouts that provide native-like experiences across desktops, tablets, and mobile devices.",
    },
    {
      icon: Download,
      title: "App-Like Installation",
      description: "Users can 'install' PWAs to home screens without app stores, improving engagement and retention.",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "HTTPS enforcement and secure contexts protect user data and prevent tampering.",
    },
    {
      icon: Zap,
      title: "Push Notifications",
      description: "Engage users with web push notifications, similar to native apps, to drive re-engagement.",
    },
    {
      icon: Target,
      title: "Cross-Platform Reach",
      description: "Single codebase for iOS, Android, and web browsers, reducing development and maintenance costs.",
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
        title="Progressive Web Apps Development"
        subtitle="Guidesoft builds Progressive Web Apps (PWAs) that deliver fast, reliable, and engaging experiences across all devices. Combine the best of web and mobile with our PWA expertise to reach wider audiences without app store dependencies."
        ctaText="Get a Quote"
        pageType="progressive-web-apps"
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
              Why Choose Guidesoft for PWA Development?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              PWAs offer the accessibility of the web with the engagement of native apps. Our developers optimize for performance, SEO, and user retention using modern web technologies like React, Vue, or Angular.
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
            Transform Your Web Presence with PWAs
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Elevate your digital strategy with Progressive Web Apps from Guidesoft. Reach users on any device with app-like functionality. Let's get started.
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
        title="Progressive Web Apps Development Inquiry"
        serviceType="Progressive Web Apps Development"
      />
    </motion.div>
  );
};

export default ProgressiveWebApps;