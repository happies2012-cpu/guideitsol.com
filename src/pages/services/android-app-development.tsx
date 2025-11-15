"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Code, Download, Shield, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const AndroidAppDevelopment = () => {
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
      title: "Native Android Development",
      description: "Expertise in Java and Kotlin for high-performance native Android applications.",
    },
    {
      icon: Smartphone,
      title: "Material Design UI/UX",
      description: "Beautiful, intuitive interfaces following Google's Material Design guidelines.",
    },
    {
      icon: Download,
      title: "Google Play Store Optimization",
      description: "ASO strategies to maximize app visibility and downloads on the Play Store.",
    },
    {
      icon: Shield,
      title: "Security & Performance",
      description: "Robust security features and optimization for smooth performance across devices.",
    },
    {
      icon: Zap,
      title: "Integration & APIs",
      description: "Seamless integration with device features, third-party APIs, and cloud services.",
    },
    {
      icon: Target,
      title: "Custom Solutions",
      description: "Tailored Android apps for e-commerce, healthcare, finance, and more industries.",
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
        title="Android App Development"
        subtitle="Guidesoft delivers cutting-edge Android applications using native technologies like Kotlin and Java. We create scalable, secure, and user-centric mobile solutions that drive business growth."
        ctaText="Get a Quote"
        pageType="android-app"
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
              Why Choose Guidesoft for Android Development?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of certified Android developers leverages the latest SDKs and tools to build robust applications that perform exceptionally on all Android devices.
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
            Ready to Build Your Android App?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Partner with Guidesoft to transform your ideas into powerful Android applications. Let's discuss your project today.
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
        title="Android App Development Inquiry"
        serviceType="Android App Development"
      />
    </motion.div>
  );
};

export default AndroidAppDevelopment;