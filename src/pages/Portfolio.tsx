"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp, Users, DollarSign, Sparkles, Zap, Brain, Code, Smartphone, Globe, Database, Cloud } from "lucide-react";
import { motion, Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { getHeroImage } from "@/lib/image-utils";
import PageHero from "@/components/ui/PageHero";
import { useRef } from "react";
import LightboxForm from "@/components/ui/LightboxForm";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const filters = ["All", "Web Development", "Mobile Apps", "AI Solutions", "Cloud Services", "Data Engineering"];
  
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform for Retail Giant",
      category: "Web Development",
      client: "Global Fashion Retailer",
      description: "Built a scalable, responsive e-commerce platform with custom CMS integration, resulting in 40% increase in conversion rates and 60% faster load times.",
      results: {
        increase: "40% Conversion Boost",
        performance: "60% Faster Load Times",
        timeline: "4 months"
      },
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      gradient: "from-blue-500 to-cyan-500",
      icon: Globe
    },
    {
      id: 2,
      title: "AI-Powered Healthcare Dashboard",
      category: "AI Solutions",
      client: "HealthTech Innovator",
      description: "Developed an intelligent analytics dashboard using machine learning algorithms to predict patient outcomes and optimize treatment plans, improving care quality by 35%.",
      results: {
        improvement: "35% Care Quality",
        accuracy: "94% Prediction Accuracy",
        timeline: "6 months"
      },
      tags: ["Python", "TensorFlow", "React", "PostgreSQL"],
      gradient: "from-purple-500 to-pink-500",
      icon: Brain
    },
    {
      id: 3,
      title: "FinTech Mobile Banking App",
      category: "Mobile Apps",
      client: "Digital Banking Startup",
      description: "Created a secure, feature-rich mobile banking application with biometric authentication and real-time transaction alerts, achieving 100K+ downloads in first quarter.",
      results: {
        downloads: "100K+ Downloads",
        security: "Bank-Level Encryption",
        timeline: "5 months"
      },
      tags: ["React Native", "Firebase", "Biometrics", "Plaid API"],
      gradient: "from-emerald-500 to-teal-500",
      icon: Smartphone
    },
    {
      id: 4,
      title: "Cloud Migration for Enterprise SaaS",
      category: "Cloud Services",
      client: "Enterprise Software Provider",
      description: "Successfully migrated legacy infrastructure to AWS cloud environment, reducing operational costs by 45% and improving system reliability to 99.9% uptime.",
      results: {
        savings: "45% Cost Reduction",
        uptime: "99.9% Reliability",
        timeline: "8 months"
      },
      tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
      gradient: "from-orange-500 to-red-500",
      icon: Cloud
    },
    {
      id: 5,
      title: "Big Data Analytics Platform",
      category: "Data Engineering",
      client: "Media & Entertainment Company",
      description: "Implemented a comprehensive data pipeline and analytics platform to process 2TB+ of user data daily, enabling personalized content recommendations and increasing engagement by 50%.",
      results: {
        data: "2TB+ Daily Processing",
        engagement: "50% Higher Engagement",
        timeline: "7 months"
      },
      tags: ["Apache Spark", "Kafka", "Snowflake", "Tableau"],
      gradient: "from-violet-500 to-purple-500",
      icon: Database
    },
    {
      id: 6,
      title: "IoT Fleet Management Solution",
      category: "Web Development",
      client: "Logistics Corporation",
      description: "Developed a real-time fleet tracking and management system using IoT sensors and GPS technology, reducing fuel costs by 20% and improving delivery times by 30%.",
      results: {
        savings: "20% Fuel Cost Reduction",
        improvement: "30% Faster Deliveries",
        timeline: "6 months"
      },
      tags: ["IoT", "GPS", "React", "Node.js", "MongoDB"],
      gradient: "from-cyan-500 to-blue-500",
      icon: Code
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
      
      {/* Hero Section with unique background */}
      <PageHero
        title="Our Portfolio"
        subtitle="Real-world examples of how we've helped businesses transform through innovative technology solutions"
        ctaText="Start Your Project"
        pageType="portfolio"
      />

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-16 relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, value: "500+", label: "Ready Workflow with AI", gradient: "from-blue-500 to-cyan-500" },
              { icon: Users, value: "200+", label: "Happy Clients", gradient: "from-purple-500 to-pink-500" },
              { icon: Zap, value: "98%", label: "Client Satisfaction", gradient: "from-emerald-500 to-teal-500" },
              { icon: DollarSign, value: "$1.5B+", label: "Value Generated", gradient: "from-orange-500 to-red-500" }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={index} variants={cardVariants} whileHover="hover" transition={{ delay: index * 0.1 }} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-2xl blur-xl group-hover:opacity-20 transition-opacity`} />
                  <div className="relative p-8 rounded-2xl bg-background/40 backdrop-blur-xl border border-primary/20 group-hover:border-primary/50 transition-all">
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Portfolio Filter & Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 backdrop-blur-sm transition-all ${
                  activeFilter === filter 
                    ? "bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end shadow-lg shadow-primary/50" 
                    : "border-primary/20 hover:bg-primary/10"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="group relative overflow-hidden backdrop-blur-xl bg-background/40 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--gradient-primary-start)/0.5)] h-full"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-gradient-primary-start/5 via-gradient-primary-end/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <CardContent className="p-6 relative z-10 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <Badge className="bg-primary/10 border-primary/30 backdrop-blur-sm">
                          {project.category}
                        </Badge>
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md" />
                          <ExternalLink className="relative h-4 w-4 text-primary" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-primary font-medium mb-3">{project.client}</p>
                      
                      <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>
                      
                      {/* Results */}
                      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-br from-gradient-primary-start/5 to-gradient-primary-end/5 rounded-xl backdrop-blur-sm border border-primary/10">
                        {Object.entries(project.results).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="font-semibold text-foreground">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs border-primary/30 bg-primary/5 backdrop-blur-sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/20 via-gradient-primary-end/20 to-cyan-500/20" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-background/10 backdrop-blur-xl border border-primary/20 shadow-[0_0_60px_-15px_hsl(var(--gradient-primary-start)/0.5)]">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let's create your own success story with our innovative technology solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity shadow-lg"
                onClick={() => setIsLightboxOpen(true)}
              >
                Start Your Project Today
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm text-white border-white"
              >
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Lightbox Form */}
      <LightboxForm 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Portfolio Inquiry"
        serviceType="portfolio"
      />
    </div>
  );
};

export default Portfolio;