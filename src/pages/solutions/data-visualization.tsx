"use client";

import React, { useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, LineChart, Database, Code, Shield, Zap, Users, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/ui/PageHero';
import LightboxForm from '@/components/ui/LightboxForm';

const DataVisualization = () => {
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
      icon: BarChart,
      title: "Interactive Dashboards",
      description: "Create dynamic, interactive dashboards that allow users to explore data through filters, drill-downs, and real-time updates.",
    },
    {
      icon: PieChart,
      title: "Advanced Charting",
      description: "Implement sophisticated visualizations including heatmaps, tree maps, network diagrams, and custom chart types for complex data.",
    },
    {
      icon: LineChart,
      title: "Real-time Analytics",
      description: "Build live data visualization systems that update in real-time, enabling immediate insights and rapid decision-making.",
    },
    {
      icon: Database,
      title: "Big Data Integration",
      description: "Connect to diverse data sources including data lakes, warehouses, APIs, and streaming platforms for comprehensive analytics.",
    },
    {
      icon: Code,
      title: "Custom Visualization",
      description: "Develop bespoke visualization solutions tailored to your specific industry requirements and data characteristics.",
    },
    {
      icon: Shield,
      title: "Secure Data Handling",
      description: "Implement robust security measures including encryption, access controls, and compliance with data protection regulations.",
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
        title="Data Visualization Solutions"
        subtitle="Transform complex data into intuitive, actionable insights with our advanced data visualization services. Make informed decisions faster with compelling visual representations."
        ctaText="Get a Quote"
        pageType="data-visualization"
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
              Powerful Data Visualization Capabilities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our data visualization solutions help you uncover hidden patterns, trends, and correlations in your data through compelling visual representations.
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
            Transform Your Data Into Actionable Insights
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let Guidesoft help you create powerful data visualizations that drive business decisions and uncover valuable insights.
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
        title="Data Visualization Solutions Inquiry"
        serviceType="Data Visualization Solutions"
      />
    </motion.div>
  );
};

export default DataVisualization;