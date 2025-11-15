"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Code, Shield, Zap, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const BookingApp = () => {
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
      title: "Real-Time Booking Engine",
      description: "Instant availability checks, dynamic pricing, and seamless reservation processing for hotels, flights, or events.",
    },
    {
      icon: Calendar,
      title: "Calendar Integration",
      description: "Sync with Google Calendar, iCal, and enterprise calendars for conflict-free scheduling.",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "PCI-compliant payment processing with multiple gateways and fraud detection.",
    },
    {
      icon: Zap,
      title: "Mobile-First Design",
      description: "Responsive interfaces optimized for quick bookings on smartphones and tablets.",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Profile creation, loyalty programs, and personalized recommendations to boost repeat bookings.",
    },
    {
      icon: Target,
      title: "Custom Booking Solutions",
      description: "Tailored for hospitality, travel, events, healthcare appointments, and service industries.",
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
        title="Booking App Solution"
        subtitle="Guidesoft develops intuitive booking applications that simplify reservations and enhance customer satisfaction across industries like travel, hospitality, and services."
        ctaText="Get a Quote"
        pageType="booking-app"
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
              Why Choose Guidesoft for Booking Apps?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our booking solutions are built with scalability and user experience in mind, integrating advanced features like AI recommendations and multi-language support.
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
            Streamline Bookings with Custom Apps
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let Guidesoft build your booking application to increase conversions and customer loyalty. Contact us today.
          </p>
          <Button 
            size="lg" 
            className="px-8 text-lg"
            onClick={() => setIsLightboxOpen(true)}
          >
            Start Your Project
          </Button>
        </div>
      </section>
      
      {/* Lightbox Form */}
      <LightboxForm
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Booking App Solution Inquiry"
        serviceType="Booking App Solution"
      />
    </motion.div>
  );
};

export default BookingApp;