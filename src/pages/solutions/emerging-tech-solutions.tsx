import React from 'react';
import { motion, Easing } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Brain, Zap, Shield, Users, Target, Rocket, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHeroImage } from "@/lib/image-utils";
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { appModels } from '@/data/app-models';
import AppModelCard from '@/components/solutions/AppModelCard';

const EmergingTechSolutions = () => {
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
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Implement AI solutions including machine learning, natural language processing, and computer vision to automate processes and gain insights.",
    },
    {
      icon: Cpu,
      title: "Internet of Things (IoT)",
      description: "Connect devices and systems to collect real-time data, enable automation, and create intelligent environments.",
    },
    {
      icon: Zap,
      title: "Blockchain Technology",
      description: "Develop secure, transparent systems for digital transactions, supply chain management, and decentralized applications.",
    },
    {
      icon: Rocket,
      title: "Augmented Reality (AR)",
      description: "Create immersive experiences that enhance user interaction with digital overlays in real-world environments.",
    },
    {
      icon: Globe,
      title: "Edge Computing",
      description: "Process data closer to its source for reduced latency, improved performance, and enhanced user experiences.",
    },
    {
      icon: Target,
      title: "Quantum Computing",
      description: "Explore next-generation computing capabilities for solving complex problems in cryptography, optimization, and simulation.",
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
                Emerging Technology Solutions
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Stay ahead of the competition with our cutting-edge emerging technology solutions. Transform your business with the latest innovations.
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
                src={getHeroImage('emerging-tech-solutions')}
                alt="Emerging Technology Solutions"
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
              Cutting-Edge Technology Implementation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our emerging technology solutions help you leverage the latest innovations to drive business transformation and competitive advantage.
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

      {/* NEW: Featured App Models Section */}
      <section className="py-20 relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Featured Solution Templates</Badge>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Emerging Tech Models
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Explore our specialized app models for E-Learning, HRMS, and more.
              </p>
            </div>
            <Link to="/solutions">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 group">
                Browse Marketplace
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appModels
              .filter(model => ["elearning-solution", "hrms-app-solution", "chatbot-app"].includes(model.category))
              .slice(0, 3)
              .map((model, idx) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AppModelCard model={model} />
                </motion.div>
              ))}
          </div>

          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/solutions/elearning-solution">
                <Button variant="secondary" size="sm">E-Learning Marketplace</Button>
              </Link>
              <Link to="/solutions/chatbot-app">
                <Button variant="secondary" size="sm">Chatbot Solutions</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Embrace the Future of Technology
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let Guidesoft help you implement emerging technologies that will shape the future of your industry.
          </p>
          <Button size="lg" className="px-8 text-lg">
            Start Your Project
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default EmergingTechSolutions;