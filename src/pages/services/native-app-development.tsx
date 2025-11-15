"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Smartphone, Download, Shield, Zap, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const NativeAppDevelopment = () => {
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
      title: "Platform-Specific Optimization",
      description: "Leveraging native languages (Swift/Objective-C for iOS, Java/Kotlin for Android) for maximum performance.",
    },
    {
      icon: Smartphone,
      title: "Access to Native APIs",
      description: "Full utilization of device hardware, sensors, and platform-specific features like camera, GPS, and biometrics.",
    },
    {
      icon: Download,
      title: "App Store Deployment",
      description: "Expert guidance through Apple App Store and Google Play Store submission processes.",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Native security models and encryption to protect user data and app integrity.",
    },
    {
      icon: Zap,
      title: "Superior User Experience",
      description: "Smooth animations, gestures, and interactions that feel truly native to each platform.",
    },
    {
      icon: Target,
      title: "Custom Native Solutions",
      description: "Tailored apps for high-performance needs in gaming, AR/VR, enterprise mobility, and more.",
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
        title="Native App Development"
        subtitle="Guidesoft excels in native mobile app development, crafting high-performance applications optimized for iOS and Android platforms. Experience the power of platform-specific technologies for unparalleled speed and functionality."
        ctaText="Get a Quote"
        pageType="native-app"
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
              Why Choose Guidesoft for Native Development?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our native development approach ensures apps run at peak efficiency, providing the best possible user experience while accessing all platform capabilities.
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
            Build Native Apps That Perform
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let Guidesoft develop your native mobile application with precision and expertise. Contact us to discuss your native app requirements.
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
        title="Native App Development Inquiry"
        serviceType="Native App Development"
      />
    </motion.div>
  );
};

export default NativeAppDevelopment;