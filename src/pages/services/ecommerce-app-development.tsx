"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Code, CreditCard, Shield, Zap, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const EcommerceAppDevelopment = () => {
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
      title: "Custom E-commerce Platforms",
      description: "Tailored solutions using React Native, Flutter, or native tech for unique business needs.",
    },
    {
      icon: ShoppingCart,
      title: "Advanced Catalog Management",
      description: "Dynamic product catalogs with search, filters, categories, and inventory synchronization.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment Integration",
      description: "Support for Stripe, PayPal, Apple Pay, Google Pay, and multiple gateways with PCI compliance.",
    },
    {
      icon: Shield,
      title: "Fraud Prevention & Security",
      description: "SSL encryption, secure checkout, and anti-fraud tools to protect transactions.",
    },
    {
      icon: Zap,
      title: "Personalization & Recommendations",
      description: "AI-driven product recommendations, user personalization, and abandoned cart recovery.",
    },
    {
      icon: Target,
      title: "Omnichannel Experience",
      description: "Seamless integration with web, social commerce, and physical stores for unified customer journeys.",
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
        title="E-commerce App Development"
        subtitle="Guidesoft creates powerful e-commerce mobile applications that drive sales, enhance customer engagement, and streamline operations for online retailers and brands."
        ctaText="Get a Quote"
        pageType="ecommerce-app"
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
              Why Choose Guidesoft for E-commerce Apps?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our e-commerce apps are designed for conversion with fast loading, intuitive navigation, and robust backend integration to support growing online businesses.
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
            Launch Your E-commerce Mobile App
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Boost your online sales with a custom e-commerce app from Guidesoft. Let's build the perfect shopping experience for your customers.
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
        title="E-commerce App Development Inquiry"
        serviceType="E-commerce App Development"
      />
    </motion.div>
  );
};

export default EcommerceAppDevelopment;