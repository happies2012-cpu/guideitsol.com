"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, Easing } from "framer-motion";
import { Smartphone, Tablet, Laptop, Code, CheckCircle, Users, Award, Calendar, ArrowRight, Lightbulb, Shield, TrendingUp, Target, Layout, Code2, TestTube2, UploadCloud, Globe, Rocket } from "lucide-react";
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const CrossPlatformDevelopment = () => {
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
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gradient-primary-start/5 via-gradient-primary-end/5 to-cyan-500/5 pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 18c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z' stroke='hsl(var(--gradient-primary-start)/0.1)' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* 1. Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/10 via-gradient-primary-end/10 to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Reach Every User, Everywhere</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            Cross Platform Development
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-8">
            Build efficient, high-performing applications that run seamlessly across multiple operating systems from a single codebase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity shadow-lg"
              onClick={() => setIsLightboxOpen(true)}
            >
              Get a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm"
              onClick={() => setIsLightboxOpen(true)}
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </motion.section>

      {/* 2. Overview Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Code className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Single Codebase</h3>
                <p className="text-gray-600">Develop once, deploy everywhere. Share code across platforms to save time and resources.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Smartphone className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Mobile Applications</h3>
                <p className="text-gray-600">Create native mobile apps for iOS and Android with a single codebase.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Tablet className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Tablet Applications</h3>
                <p className="text-gray-600">Build responsive tablet apps that provide a seamless user experience.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Laptop className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Desktop Applications</h3>
                <p className="text-gray-600">Develop cross-platform desktop apps for Windows, macOS, and Linux.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. Benefits Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <CheckCircle className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Quality Assurance</h3>
                <p className="text-gray-600">Ensure your app is reliable and bug-free with comprehensive testing.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Users className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">User Experience</h3>
                <p className="text-gray-600">Design intuitive and engaging user interfaces for all platforms.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Award className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Performance Optimization</h3>
                <p className="text-gray-600">Optimize your app for speed and efficiency across all devices.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Calendar className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Timely Delivery</h3>
                <p className="text-gray-600">Meet your project deadlines with efficient development processes.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 4. Why Choose Us Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Lightbulb className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Innovative Solutions</h3>
                <p className="text-gray-600">Leverage cutting-edge technologies to build innovative applications.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Shield className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Security</h3>
                <p className="text-gray-600">Protect your app and user data with robust security measures.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Scalability</h3>
                <p className="text-gray-600">Build scalable applications that can grow with your business.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Target className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Targeted Marketing</h3>
                <p className="text-gray-600">Reach your target audience with tailored marketing strategies.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 5. Case Studies Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Layout className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Case Study 1</h3>
                <p className="text-gray-600">Learn how we helped a startup build a cross-platform app that reached millions of users.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Code2 className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Case Study 2</h3>
                <p className="text-gray-600">Discover how we optimized an existing app for cross-platform compatibility.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <TestTube2 className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Case Study 3</h3>
                <p className="text-gray-600">Explore how we integrated advanced features into a cross-platform app.</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <UploadCloud className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Case Study 4</h3>
                <p className="text-gray-600">See how we streamlined the deployment process for a cross-platform app.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 6. Testimonials Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Globe className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Testimonial 1</h3>
                <p className="text-gray-600">"Their cross-platform development expertise helped us launch a successful app."</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4">
              <Rocket className="w-10 h-10 text-gradient-primary" />
              <div>
                <h3 className="text-xl font-semibold">Testimonial 2</h3>
                <p className="text-gray-600">"Their team delivered a high-quality app that exceeded our expectations."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 7. FAQ Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container py-12">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is cross-platform development?</AccordionTrigger>
            <AccordionContent>
              Cross-platform development is the process of creating applications that can run on multiple operating systems, such as iOS, Android, and desktop platforms, using a single codebase.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What are the benefits of cross-platform development?</AccordionTrigger>
            <AccordionContent>
              The benefits include cost savings, faster time-to-market, and the ability to reach a wider audience across multiple platforms.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Which technologies do you use for cross-platform development?</AccordionTrigger>
            <AccordionContent>
              We use a variety of technologies, including React Native, Flutter, and Electron, depending on the project requirements.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can you provide custom solutions for cross-platform development?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer tailored solutions to meet your specific needs and requirements for cross-platform development.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* 8. Contact Us Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container py-12">
        <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
        <p className="text-gray-600 mb-8">Ready to build your cross-platform application? Contact us today to discuss your project.</p>
        <Button onClick={() => setIsLightboxOpen(true)}>Get a Consultation</Button>
      </motion.div>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 bg-primary text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/20 via-gradient-primary-end/20 to-cyan-500/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Expand Your Reach?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Develop a single app that works flawlessly across all major platforms.</p>
          <Button 
            size="lg" 
            className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
            onClick={() => setIsLightboxOpen(true)}
          >
            Start Your Cross Platform Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.section>
      
      {/* Lightbox Form */}
      <LightboxForm
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Cross Platform Development Inquiry"
        serviceType="Cross Platform Development"
      />
    </div>
  );
};

export default CrossPlatformDevelopment;
