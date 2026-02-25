"use client";

import React from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Code, Shield, Zap, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const B2CTravelPortal = () => {
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
      title: "Personalized Travel Experience",
      description: "AI-driven recommendations, wishlists, and personalized itineraries based on user preferences and behavior.",
    },
    {
      icon: Globe,
      title: "User-Friendly Interface",
      description: "Intuitive design with easy search, comparison tools, and one-click booking for seamless user experience.",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Multiple payment options, secure gateways, and travel insurance integration for consumer confidence.",
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "Live pricing, availability updates, and instant notifications for flight delays and changes.",
    },
    {
      icon: Users,
      title: "Community Features",
      description: "User reviews, ratings, travel blogs, and social sharing to build trust and engagement.",
    },
    {
      icon: Target,
      title: "Custom B2C Solutions",
      description: "Tailored for online travel agencies, meta-search engines, and direct-to-consumer travel platforms.",
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
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={containerVariants} className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                B2C Travel Portal
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Guidesoft creates engaging B2C travel portals that provide personalized travel planning, seamless booking, and exceptional user experiences for individual travelers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8 bg-gradient-to-r from-primary to-secondary">
                  Get a Quote
                </Button>
                <Button size="lg" variant="outline">
                  View Portfolio
                </Button>
              </div>
            </motion.div>
            <motion.div variants={containerVariants} className="relative">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80"
                alt="B2C Travel Portal"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

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
              Why Choose Guidesoft for B2C Travel Portals?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our B2C platforms focus on user experience, personalization, and conversion optimization to drive bookings and customer loyalty.
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
            Plan Your Perfect Trip
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Build your B2C travel platform with Guidesoft's expertise in consumer travel solutions. Let's create unforgettable travel experiences.
          </p>
          <Button size="lg" className="px-8 text-lg">
            Start Your Project
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default B2CTravelPortal;
