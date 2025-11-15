"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, Easing } from "framer-motion";
import { Users, TrendingUp, CheckCircle, Award, Calendar, ArrowRight, Lightbulb, Shield, Target, Briefcase, Clock, Zap, Heart, Globe, GraduationCap } from "lucide-react";
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const AboutCompany = () => {
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

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly explore new technologies and methodologies to deliver cutting-edge solutions."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain the highest ethical standards in all our business dealings and client relationships."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of teamwork and building strong partnerships with our clients."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for perfection in everything we do, from code quality to customer service."
    }
  ];

  const teamStats = [
    { number: "15+", label: "Years Experience" },
    { number: "200+", label: "Ready Workflow with AI" },
    { number: "50+", label: "Team Members" },
    { number: "25+", label: "Countries Served" }
  ];

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

      {/* Hero Section with unique background */}
      <PageHero
        title="About Guidesoft"
        subtitle="We are a leading technology solutions provider dedicated to helping businesses thrive in the digital age through innovative software development and strategic consulting."
        ctaText="Get in Touch"
        pageType="about-company"
      />

      {/* 2. Company Story Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 bg-muted/30 relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8">
                <CardHeader>
                  <Badge className="bg-primary/10 border-primary/30 w-fit">Our Journey</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    From Startup to Industry Leader
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    Founded in 2008, Guidesoft began as a small team of passionate developers with a vision to transform how businesses leverage technology. Over the years, we've grown into a trusted partner for enterprises worldwide.
                  </p>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    Our commitment to excellence, innovation, and customer satisfaction has earned us recognition as a leader in custom software development and digital transformation services.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> ISO 9001:2015 Certified</li>
                    <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> CMMI Level 3 Assessed</li>
                    <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> 98% Client Retention Rate</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <div className="grid grid-cols-2 gap-6">
                {teamStats.map((stat, index) => (
                  <Card key={index} className="bg-background/40 backdrop-blur-xl border-primary/20 text-center p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <p className="text-foreground/90">{stat.label}</p>
                  </Card>
                ))}
              </div>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8 mt-6">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">Global Presence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90">
                    With offices in San Francisco, London, and Bangalore, we serve clients across 25+ countries, bringing local expertise with global standards.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. Core Values Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" transition={{ delay: index * 0.1 }}>
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all h-full group text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary">{value.title}</h3>
                    <p className="text-foreground/90">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Leadership Team Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 bg-muted/30 relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
              Leadership Team
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Meet the visionaries driving our success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "CEO & Founder", bio: "20+ years in software development and business leadership." },
              { name: "Sarah Williams", role: "CTO", bio: "Expert in emerging technologies and digital transformation." },
              { name: "Michael Chen", role: "COO", bio: "Operations specialist with a focus on client success." }
            ].map((leader, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover">
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{leader.name}</h3>
                    <p className="text-primary mb-2">{leader.role}</p>
                    <p className="text-foreground/90 text-sm">{leader.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. Mission & Vision Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed">
                    To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in an ever-evolving digital landscape.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed">
                    To be the global leader in digital transformation, recognized for our expertise, integrity, and the exceptional value we deliver to our clients and their customers.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Let's discuss how we can help transform your business with technology.</p>
          <Button 
            size="lg" 
            className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
            onClick={() => setIsLightboxOpen(true)}
          >
            Schedule a Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.section>
      
      {/* Lightbox Form */}
      <LightboxForm
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Schedule a Consultation"
        serviceType="Company Inquiry"
      />
    </div>
  );
};

export default AboutCompany;