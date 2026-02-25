"use client";

import React from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Code, Shield, Zap, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const B2BFlightBookingPortal = () => {
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
      title: "Corporate Rate Management",
      description: "Negotiated airline contracts, corporate discounts, and volume-based pricing for cost-effective business travel.",
    },
    {
      icon: Plane,
      title: "Advanced Booking Workflows",
      description: "Approval processes, travel policies enforcement, and automated expense reporting for streamlined operations.",
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description: "GDPR compliance, secure data handling, and audit trails to meet corporate governance requirements.",
    },
    {
      icon: Zap,
      title: "Real-Time Reporting",
      description: "Comprehensive analytics, spending reports, and traveler insights for data-driven travel management decisions.",
    },
    {
      icon: Users,
      title: "Multi-User Platform",
      description: "Role-based access, team management, and self-service booking capabilities for employees and administrators.",
    },
    {
      icon: Target,
      title: "Custom B2B Solutions",
      description: "Tailored for travel agencies, corporations, and business travel management companies with specialized features.",
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
                B2B Flight Booking Portal
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Guidesoft creates specialized B2B flight booking portals that optimize corporate travel, enforce policies, and provide comprehensive reporting for business travelers.
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
                src="https://images.unsplash.com/photo-1544015759-137fdf556bc1?auto=format&fit=crop&q=80"
                alt="B2B Flight Booking Portal"
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
              Why Choose Guidesoft for B2B Flight Booking Portals?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our B2B platforms integrate with corporate systems, provide advanced policy management, and ensure cost-effective business travel solutions.
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
            Streamline Corporate Travel
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Build your B2B flight booking platform with Guidesoft's expertise in business travel solutions. Let's optimize your travel program.
          </p>
          <Button size="lg" className="px-8 text-lg">
            Start Your Project
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default B2BFlightBookingPortal;
