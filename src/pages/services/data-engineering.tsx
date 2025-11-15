"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, Easing } from "framer-motion";
import { Database, Cloud, BarChart3, TrendingUp, CheckCircle, Users, Award, Calendar, ArrowRight, Lightbulb, Shield, Target, Code2, TestTube2, UploadCloud, Server, GitBranch, HardDrive, Cpu, Network } from "lucide-react";
import LightboxForm from "@/components/ui/LightboxForm";

const DataEngineering = () => {
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

  const portfolioProjects = [
    {
      title: "Real-time Data Pipeline for E-commerce",
      description: "Designed and implemented a scalable data pipeline for real-time analytics, improving inventory management and personalized recommendations.",
      result: "20% Sales Increase",
      tech: ["Kafka", "Spark", "AWS Redshift"]
    },
    {
      title: "Big Data Lake for Healthcare Provider",
      description: "Built a secure data lake solution for storing and processing vast amounts of patient data, enabling advanced research and insights.",
      result: "Enhanced Research Capabilities",
      tech: ["Hadoop", "Azure Data Lake", "Databricks"]
    },
    {
      title: "Automated ETL for Financial Services",
      description: "Developed automated ETL processes for financial data, reducing manual effort by 60% and ensuring data accuracy for reporting.",
      result: "60% Efficiency Gain",
      tech: ["Python", "Airflow", "Snowflake"]
    }
  ];

  const faqs = [
    {
      question: "What is Data Engineering?",
      answer: "Data Engineering involves designing, building, and maintaining the infrastructure and systems that collect, store, process, and analyze large volumes of data. It's about making data accessible and usable for data scientists and analysts."
    },
    {
      question: "What technologies do you use for Data Engineering?",
      answer: "We work with a wide range of technologies including cloud platforms (AWS, Azure, GCP), big data frameworks (Hadoop, Spark, Kafka), data warehouses (Snowflake, Redshift, BigQuery), and ETL tools (Airflow, Talend, custom Python scripts)."
    },
    {
      question: "How do you ensure data quality and reliability?",
      answer: "We implement robust data validation, monitoring, and testing procedures throughout the data pipeline. This includes schema enforcement, data profiling, anomaly detection, and automated alerts to ensure high data quality and reliability."
    }
  ];

  const testimonials = [
    {
      quote: "Guidesoft's data engineering team built us a robust and efficient data pipeline. Their expertise transformed our ability to derive insights from our vast datasets.",
      author: "Dr. Alan Turing",
      role: "Chief Data Officer, Global Analytics"
    },
    {
      quote: "The data lake solution provided by Guidesoft was exactly what we needed. It's scalable, secure, and has significantly improved our data processing capabilities.",
      author: "Grace Hopper",
      role: "Head of IT, Health Innovations"
    }
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
            <Database className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Building Robust Data Foundations</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            Data Engineering
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-8">
            Design, build, and manage scalable data pipelines and infrastructure to unlock the full potential of your data assets.
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
            <Button variant="outline" size="lg" className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
              View Our Solutions
            </Button>
          </div>
        </div>
      </motion.section>

      {/* 2. Overview Section */}
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
                  <Badge className="bg-primary/10 border-primary/30 w-fit">What is Data Engineering?</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    The Backbone of Data Science
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    Data engineering is the practice of designing and building systems for collecting, storing, and analyzing data at scale. It's crucial for transforming raw data into actionable insights, supporting everything from business intelligence to machine learning.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Scalable data pipelines</li>
                    <li className="flex items-center gap-2"><Cloud className="h-4 w-4 text-primary" /> Cloud-native data solutions</li>
                    <li className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" /> Data quality and governance</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8">
                <CardHeader>
                  <Badge className="bg-primary/10 border-primary/30 w-fit">Why It Matters</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    Fueling Data-Driven Decisions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    Effective data engineering ensures that clean, reliable, and timely data is available for analysis, enabling businesses to make informed decisions, optimize operations, and gain a competitive edge through advanced analytics and AI.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Target className="h-4 w-4 text-primary" /> 90% of businesses plan to increase data investment</div>
                      <div className="flex items-center gap-2 text-foreground"><TrendingUp className="h-4 w-4 text-primary" /> Improves decision-making accuracy by 5x</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Users className="h-4 w-4 text-primary" /> Enhances operational efficiency</div>
                      <div className="flex items-center gap-2 text-foreground"><Shield className="h-4 w-4 text-primary" /> Ensures data security and compliance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. Features Section */}
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
              Our Data Engineering Expertise
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Comprehensive services to build and optimize your data infrastructure
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: HardDrive, title: "Data Pipeline Development", desc: "Building robust and automated ETL/ELT pipelines for efficient data ingestion, transformation, and loading." },
              { icon: Database, title: "Data Warehousing & Data Lakes", desc: "Designing and implementing scalable data warehouses and data lakes on cloud platforms for centralized data storage." },
              { icon: Cloud, title: "Cloud Data Solutions", desc: "Leveraging AWS, Azure, and GCP services for fully managed, scalable, and cost-effective data solutions." },
              { icon: Cpu, title: "Big Data Processing", desc: "Expertise in processing large datasets using technologies like Apache Spark, Hadoop, and Kafka for real-time analytics." },
              { icon: Network, title: "Data Governance & Security", desc: "Implementing strategies for data quality, security, compliance, and access control to ensure data integrity." },
              { icon: BarChart3, title: "Data Migration & Integration", desc: "Seamless migration of existing data to new platforms and integration with various data sources and APIs." }
            ].map((feature, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" transition={{ delay: index * 0.1 }}>
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all h-full group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary">{feature.title}</h3>
                    <p className="text-foreground/90">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Our Process Section */}
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
              Our Data Engineering Process
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              A structured approach to building efficient and reliable data solutions
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-12">
            {[
              { icon: Lightbulb, title: "Discovery & Strategy", desc: "Understanding your data needs, existing infrastructure, and business goals to define a comprehensive data strategy.", step: 1 },
              { icon: Code2, title: "Design & Architecture", desc: "Designing scalable data architectures, including data models, pipelines, and storage solutions.", step: 2 },
              { icon: TestTube2, title: "Development & Implementation", desc: "Building and implementing data pipelines, ETL processes, and data warehouses using best practices.", step: 3 },
              { icon: UploadCloud, title: "Testing & Validation", desc: "Rigorous testing for data quality, performance, and reliability to ensure accuracy and consistency.", step: 4 },
              { icon: TrendingUp, title: "Deployment & Optimization", desc: "Deploying data solutions to production, continuous monitoring, and ongoing optimization for peak performance.", step: 5 }
            ].map((step, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" className="flex items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end rounded-full flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-foreground/90">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. Portfolio Section */}
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
              Our Data Engineering Portfolio
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Showcasing successful data solutions that drive business intelligence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover">
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all h-full group">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary">{project.title}</h3>
                      <p className="text-foreground/90">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-primary/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                        <Badge className="bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end">
                          {project.result}
                        </Badge>
                        <Button variant="ghost" size="sm" className="group-hover:text-primary">
                          View Case Study <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. Blogs Section */}
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
              Data Engineering Insights
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Stay informed with our latest articles on data trends and best practices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Building Scalable Data Pipelines with Apache Kafka", excerpt: "Learn how Kafka enables real-time data streaming and processing for modern data architectures.", date: "June 1, 2024" },
              { title: "The Rise of Data Lakes: Storing and Analyzing Big Data", excerpt: "Explore the benefits of data lakes for flexible storage and advanced analytics of diverse data types.", date: "May 28, 2024" },
              { title: "Data Governance Best Practices for Enterprise Data", excerpt: "Essential strategies to ensure data quality, security, and compliance across your organization.", date: "May 25, 2024" }
            ].map((blog, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover">
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all h-full group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground/80">{blog.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-foreground/90 line-clamp-3">{blog.excerpt}</p>
                    <Button variant="ghost" size="sm" className="mt-4 group-hover:text-primary p-0 h-auto">
                      Read More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/blog">
              <Button size="lg" className="bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90">
                Explore All Blogs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 7. Details Block */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* FAQs */}
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                Frequently Asked Questions
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-primary/20">
                    <AccordionTrigger className="text-left hover:no-underline h-auto p-4 text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0 text-foreground/90">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Stats */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                Our Data Engineering Success Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Database, number: "120+", label: "Data Pipelines" },
                  { icon: Users, number: "70+", label: "Satisfied Clients" },
                  { icon: Award, number: "99%", label: "Data Accuracy" }
                ].map((stat, index) => (
                  <motion.div key={index} variants={cardVariants} className="text-center p-6 bg-background/40 rounded-lg border border-primary/20">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                    <p className="text-foreground/90">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                What Our Clients Say
              </h3>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div key={index} variants={cardVariants} className="p-6 bg-background/40 rounded-lg border border-primary/20 italic">
                    <p className="text-foreground/90 mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Unlock Your Data's Potential?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Let's build a robust data foundation that fuels your business intelligence and AI initiatives.</p>
          <Button 
            size="lg" 
            className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
            onClick={() => setIsLightboxOpen(true)}
          >
            Start Your Data Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.section>
      
      {/* Lightbox Form */}
      <LightboxForm 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="Data Engineering Inquiry"
        serviceType="Data Engineering"
      />
    </div>
  );
};

export default DataEngineering;