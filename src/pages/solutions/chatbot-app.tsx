"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Bot, Zap, Users, Shield, Brain, TrendingUp, Headphones, Settings, BarChart, ShoppingBag, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const ChatbotApp = () => {
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
        title="AI Chatbot Solutions"
        subtitle="Transform customer interactions with intelligent chatbots that provide instant, personalized support across all channels. Our AI-powered solutions reduce costs while enhancing user experience."
        ctaText="Build Your Chatbot"
        pageType="chatbot-app"
      />
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <MessageCircle className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">24/7 Support</CardTitle>
          <CardContent className="mt-2">
            Provide round-the-clock assistance to your customers with our chatbots.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <Bot className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">Personalized Experience</CardTitle>
          <CardContent className="mt-2">
            Tailor interactions to each user's preferences and behavior.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <Zap className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">Fast Responses</CardTitle>
          <CardContent className="mt-2">
            Instantly respond to customer inquiries with speed and accuracy.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <Users className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">Scalable Solutions</CardTitle>
          <CardContent className="mt-2">
          Handle a growing number of interactions without compromising performance.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <Shield className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">Security First</CardTitle>
          <CardContent className="mt-2">
            Protect user data with robust security measures.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <Brain className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">Advanced AI</CardTitle>
          <CardContent className="mt-2">
            Leverage cutting-edge AI for smarter, more effective interactions.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <TrendingUp className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">Analytics & Insights</CardTitle>
          <CardContent className="mt-2">
            Gain valuable insights into customer behavior and preferences.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <Headphones className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">Multichannel Support</CardTitle>
          <CardContent className="mt-2">
            Engage customers across various platforms including web, mobile, and messaging apps.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <Settings className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">Customizable</CardTitle>
          <CardContent className="mt-2">
            Tailor chatbot functionality to fit your specific business needs.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <BarChart className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">Performance Metrics</CardTitle>
          <CardContent className="mt-2">
            Monitor and improve chatbot performance with detailed metrics.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <ShoppingBag className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">E-commerce Integration</CardTitle>
          <CardContent className="mt-2">
            Seamlessly integrate chatbots with your e-commerce platform for a seamless shopping experience.
          </CardContent>
        </motion.div>
        <motion.div variants={cardVariants} whileHover="hover" className="bg-card rounded-lg shadow-md p-4">
          <Target className="h-10 w-10 text-primary" />
          <CardTitle className="mt-2">Targeted Marketing</CardTitle>
          <CardContent className="mt-2">
            Use chatbots to deliver personalized marketing messages and offers.
          </CardContent>
        </motion.div>
      </div>
      {/* CTA Section */}
      <div className="flex justify-center items-center p-4">
        <Button onClick={() => setIsLightboxOpen(true)} className="bg-primary text-white">
          Build Your Chatbot
        </Button>
      </div>
      
      {/* Lightbox Form */}
      <LightboxForm
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="AI Chatbot Solutions Inquiry"
        serviceType="AI Chatbot Solutions"
      />
    </motion.div>
  );
};

export default ChatbotApp;
