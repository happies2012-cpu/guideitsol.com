"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Heart, Activity, Target, User, Calendar, BarChart, MessageCircle, Settings, Zap, MapPin, Camera, Apple, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const FitnessApp = () => {
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
      icon: Dumbbell,
      title: "Workout Plans",
      description: "Customizable training programs with video demonstrations and progress tracking for all fitness levels.",
    },
    {
      icon: Heart,
      title: "Health Monitoring",
      description: "Track heart rate, calories burned, and other vital health metrics with integrated wearable device support.",
    },
    {
      icon: Activity,
      title: "Activity Tracking",
      description: "Comprehensive activity monitoring including steps, distance, and active minutes with detailed analytics.",
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Personalized fitness goals with milestone tracking and achievement rewards to maintain motivation.",
    },
    {
      icon: User,
      title: "Personal Training",
      description: "Connect with certified trainers for virtual sessions and personalized coaching through the app.",
    },
    {
      icon: Calendar,
      title: "Schedule Management",
      description: "Plan workouts, set reminders, and sync with calendar apps for consistent fitness routines.",
    },
    {
      icon: BarChart,
      title: "Progress Analytics",
      description: "Detailed performance reports and trend analysis to visualize fitness improvements over time.",
    },
    {
      icon: MessageCircle,
      title: "Community Support",
      description: "Social features to connect with friends, join challenges, and share achievements for accountability.",
    }
  ];

  const fitnessFeatures = [
    {
      title: "Nutrition Tracking",
      description: "Log meals, track macros, and receive personalized nutrition recommendations based on goals.",
      icon: Apple
    },
    {
      title: "Video Workouts",
      description: "Access to thousands of on-demand workout videos led by professional trainers for all fitness levels.",
      icon: Play
    },
    {
      title: "GPS Tracking",
      description: "Accurate distance and route tracking for running, cycling, and outdoor activities with mapping integration.",
      icon: MapPin
    },
    {
      title: "Photo Progress",
      description: "Visual progress tracking with photo comparison tools to see physical transformation over time.",
      icon: Camera
    }
  ];

  const benefits = [
    "Increase user retention by 45%",
    "Boost workout completion rates by 30%",
    "Enhance user engagement with social features",
    "Generate revenue through premium subscriptions",
    "Scale to millions of active users",
    "Reduce churn with personalized experiences"
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
        title="Fitness App Solutions"
        subtitle="Create engaging fitness applications that motivate users to achieve their health and wellness goals. Our solutions combine cutting-edge technology with proven fitness methodologies."
        ctaText="Build Your Fitness App"
        pageType="fitness-app"
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
              Comprehensive Fitness Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything needed to create engaging and effective digital fitness experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Fitness Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enhanced Fitness Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced features designed to maximize user engagement and fitness results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fitnessFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
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

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Business Advantages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Measurable improvements in user engagement and business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg"
              >
                <BarChart className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create the Next Fitness Sensation?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Build a fitness app that motivates users and drives measurable health improvements.
          </p>
          <Button 
            size="lg" 
            className="px-8 text-lg bg-white text-primary hover:bg-gray-100"
            onClick={() => setIsLightboxOpen(true)}
          >
            Start Your Fitness Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      {/* Lightbox Form */}
      <LightboxForm
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Fitness App Solutions Inquiry"
        serviceType="Fitness App Solutions"
      />
    </motion.div>
  );
};

export default FitnessApp;