"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Code, CreditCard, Shield, Zap, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const FoodDeliveryApp = () => {
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
      title: "Real-Time Order Tracking",
      description: "GPS-based tracking for customers to monitor delivery status from restaurant to doorstep.",
    },
    {
      icon: Truck,
      title: "Delivery Management",
      description: "Route optimization, driver assignment, and delivery scheduling for efficient operations.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment Processing",
      description: "Multiple payment options including cash on delivery, cards, and digital wallets.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Photo verification, ratings, and feedback systems to maintain food quality standards.",
    },
    {
      icon: Zap,
      title: "Push Notifications",
      description: "Instant alerts for order status, promotions, and delivery updates to keep users engaged.",
    },
    {
      icon: Target,
      title: "Custom Food Delivery Solutions",
      description: "Tailored for restaurants, chains, and delivery services with unique branding and features.",
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
        title="Food Delivery App Solution"
        subtitle="Guidesoft builds comprehensive food delivery applications that connect restaurants with customers, featuring seamless ordering, real-time tracking, and efficient delivery management."
        ctaText="Get a Quote"
        pageType="food-delivery-app"
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
              Why Choose Guidesoft for Food Delivery Apps?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our food delivery solutions are designed for scalability, with features like multi-restaurant support, advanced analytics, and integration with popular payment gateways.
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
            Deliver Delicious Experiences
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Build your food delivery platform with Guidesoft's expertise. From concept to launch, we handle it all.
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
        title="Food Delivery App Solution Inquiry"
        serviceType="Food Delivery App Solution"
      />
    </motion.div>
  );
};

export default FoodDeliveryApp;