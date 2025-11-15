"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2, Code, Shield, Zap, Users, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const SocialMediaApp = () => {
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
      title: "Real-Time Feed Algorithm",
      description: "Personalized content feeds using AI to prioritize relevant posts and stories.",
    },
    {
      icon: Share2,
      title: "Multi-Media Sharing",
      description: "Support for photos, videos, live streams, stories, and interactive content formats.",
    },
    {
      icon: Shield,
      title: "Privacy & Moderation",
      description: "Advanced privacy controls, content moderation, and community guidelines enforcement.",
    },
    {
      icon: Zap,
      title: "Engagement Features",
      description: "Likes, comments, shares, direct messaging, and group chats to foster interaction.",
    },
    {
      icon: Users,
      title: "User Networking",
      description: "Friend/follow systems, groups, events, and discovery features for community building.",
    },
    {
      icon: Target,
      title: "Custom Social Platforms",
      description: "Tailored for niche communities, brands, enterprises, and specialized social networks.",
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
        title="Social Media App Solution"
        subtitle="Guidesoft creates engaging social media platforms that connect people, foster communities, and drive user-generated content with advanced features and scalable architecture."
        ctaText="Get a Quote"
        pageType="social-media-app"
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
              Why Choose Guidesoft for Social Media Apps?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our social platforms are built for virality, with robust backend systems, real-time notifications, and analytics to maximize user engagement and platform growth.
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
            Connect Communities Worldwide
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Build your social media platform with Guidesoft's expertise. Let's create the next social phenomenon.
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
        title="Social Media App Solution Inquiry"
        serviceType="Social Media App Solution"
      />
    </motion.div>
  );
};

export default SocialMediaApp;