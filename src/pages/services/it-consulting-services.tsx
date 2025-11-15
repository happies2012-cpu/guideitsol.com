"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, Easing } from "framer-motion";
import { Users, Lightbulb, Target, TrendingUp, Calendar, ArrowRight, Shield, Zap, CheckCircle, Code, Cpu, Network } from "lucide-react";
import LightboxForm from "@/components/ui/LightboxForm";

const ITConsultingServices = () => {
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
      title: "Enterprise Digital Transformation for Manufacturing Firm",
      description: "Led a comprehensive IT transformation initiative, modernizing legacy systems and implementing cloud solutions, resulting in 40% operational efficiency improvement.",
      result: "40% Efficiency Boost",
      tech: ["Cloud Migration", "DevOps", "ERP Integration"]
    },
    {
      title: "Cybersecurity Strategy for Financial Institution",
      description: "Developed and implemented a robust cybersecurity framework that reduced security incidents by 85% and ensured regulatory compliance.",
      result: "85% Security Incident Reduction",
      tech: ["Cybersecurity", "Compliance", "Risk Management"]
    },
    {
      title: "IT Infrastructure Optimization for Retail Chain",
      description: "Optimized network infrastructure and implemented edge computing solutions, reducing latency by 60% and improving customer experience.",
      result: "60% Latency Reduction",
      tech: ["Network Optimization", "Edge Computing", "Infrastructure"]
    }
  ];

  const faqs = [
    {
      question: "What types of businesses benefit most from IT consulting services?",
      answer: "Businesses of all sizes and industries can benefit from IT consulting. Startups need guidance on technology stack selection, mid-sized companies require scaling strategies, and enterprises need digital transformation expertise. Any organization looking to optimize operations, reduce costs, or leverage new technologies can benefit from our services."
    },
    {
      question: "How long does an IT consulting engagement typically last?",
      answer: "Project duration varies based on scope and complexity. Strategic assessments typically take 4-8 weeks, implementation projects range from 3-12 months, and ongoing advisory services can be short-term or long-term partnerships. We tailor our engagement model to your specific needs and timeline."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer comprehensive post-project support including maintenance, monitoring, training, and optimization services. Our goal is to ensure long-term success and continued value from the solutions we implement. We also provide retainer-based services for ongoing strategic IT guidance."
    }
  ];

  const testimonials = [
    {
      quote: "Guidesoft's IT consulting transformed our technology infrastructure and positioned us for future growth. Their strategic approach and technical expertise were instrumental in our digital transformation journey.",
      author: "Robert Chen",
      role: "CTO, Global Manufacturing Inc."
    },
    {
      quote: "The cybersecurity framework implemented by Guidesoft not only protected our sensitive data but also gave our stakeholders confidence in our technology operations. Highly recommended for any business serious about IT security.",
      author: "Jennifer Martinez",
      role: "CIO, Financial Services Group"
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
            <Lightbulb className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">IT Consulting Services</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            IT Consulting Services
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-8">
            Strategic technology advisory and implementation services to optimize your IT infrastructure, drive innovation, and achieve business objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity shadow-lg"
              onClick={() => setIsLightboxOpen(true)}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
              View Case Studies
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
                  <Badge className="bg-primary/10 border-primary/30 w-fit">What is IT Consulting?</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    Strategic Technology Partnership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    IT consulting involves providing expert advice and solutions to help organizations leverage technology for business growth, efficiency, and competitive advantage. Our consultants combine technical expertise with business acumen to deliver tailored strategies.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Technology strategy and roadmap development</li>
                    <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Infrastructure optimization and modernization</li>
                    <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Digital transformation initiatives</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8">
                <CardHeader>
                  <Badge className="bg-primary/10 border-primary/30 w-fit">Why It Matters</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    Navigating Technology Complexity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    In today's rapidly evolving technology landscape, businesses need expert guidance to make informed decisions, avoid costly mistakes, and capitalize on opportunities. IT consulting helps bridge the gap between business objectives and technology capabilities.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Target className="h-4 w-4 text-primary" /> 70% of digital transformations fail without expert guidance</div>
                      <div className="flex items-center gap-2 text-foreground"><TrendingUp className="h-4 w-4 text-primary" /> Proper IT strategy can reduce costs by up to 30%</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Zap className="h-4 w-4 text-primary" /> Technology decisions impact 80% of business operations</div>
                      <div className="flex items-center gap-2 text-foreground"><Shield className="h-4 w-4 text-primary" /> Cybersecurity breaches cost an average of $4.45M per incident</div>
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
              Our IT Consulting Services
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Comprehensive technology advisory services tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Code, title: "Technology Strategy", desc: "Develop comprehensive technology roadmaps aligned with business objectives and market trends." },
              { icon: Network, title: "Infrastructure Assessment", desc: "Evaluate and optimize your IT infrastructure for performance, security, and scalability." },
              { icon: Shield, title: "Cybersecurity Consulting", desc: "Implement robust security frameworks to protect your digital assets and ensure compliance." },
              { icon: Cpu, title: "Cloud Migration", desc: "Strategic planning and execution of cloud adoption to reduce costs and improve agility." },
              { icon: Zap, title: "Digital Transformation", desc: "End-to-end guidance for modernizing processes, systems, and culture for the digital age." },
              { icon: Users, title: "IT Governance", desc: "Establish frameworks for effective IT decision-making, risk management, and value optimization." }
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
              Our Consulting Approach
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              A proven methodology ensuring value-driven outcomes at every stage
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-12">
            {[
              { icon: Lightbulb, title: "Assessment & Discovery", desc: "Comprehensive evaluation of your current IT landscape, business objectives, and technology gaps to identify opportunities.", step: 1 },
              { icon: Target, title: "Strategy Development", desc: "Creation of a tailored technology roadmap with prioritized initiatives, timelines, and ROI projections aligned to business goals.", step: 2 },
              { icon: Code, title: "Implementation Planning", desc: "Detailed project plans, resource allocation, risk mitigation strategies, and success metrics for seamless execution.", step: 3 },
              { icon: Zap, title: "Execution & Delivery", desc: "Hands-on implementation with our experts or guidance to your team, ensuring quality, timeline adherence, and value realization.", step: 4 },
              { icon: TrendingUp, title: "Optimization & Support", desc: "Ongoing monitoring, performance optimization, training, and strategic guidance to maximize long-term benefits.", step: 5 }
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
              IT Consulting Success Stories
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Real results from real projects – see how we've helped businesses thrive through technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover">
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all h-full group">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary">{project.title}</h3>
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
              IT Consulting Insights
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Stay ahead with our latest articles and trends in technology consulting
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Digital Transformation: A CEO's Guide to Success", excerpt: "Essential strategies for leaders navigating enterprise digital transformation initiatives.", date: "April 15, 2024" },
              { title: "Cloud Migration Best Practices for 2024", excerpt: "Key considerations and step-by-step approach for successful cloud adoption.", date: "April 12, 2024" },
              { title: "Cybersecurity Framework for Modern Enterprises", excerpt: "Building a comprehensive security strategy to protect against evolving threats.", date: "April 10, 2024" }
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
                Our IT Consulting Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Code, number: "200+", label: "Ready Workflow with AI" },
                  { icon: Users, number: "150+", label: "Satisfied Clients" },
                  { icon: Shield, number: "98%", label: "Client Retention" }
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Technology Strategy?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Let's create a technology roadmap that drives business growth and innovation.</p>
          <Button 
            size="lg" 
            className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
            onClick={() => setIsLightboxOpen(true)}
          >
            Start Your Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.section>
      
      {/* Lightbox Form */}
      <LightboxForm 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="IT Consulting Services Inquiry"
        serviceType="IT Consulting Services"
      />
    </div>
  );
};

export default ITConsultingServices;