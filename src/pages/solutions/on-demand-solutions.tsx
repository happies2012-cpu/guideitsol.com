"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, Easing } from "framer-motion";
import { Truck, Zap, Users, Award, Calendar, ArrowRight, Lightbulb, Shield, TrendingUp, Target, Layout, Code, TestTube2, UploadCloud, Smartphone, Globe, CheckCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import LightboxForm from "@/components/ui/LightboxForm";

const OnDemandSolutions = () => {
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
      title: "Ride-Sharing Platform for Urban Mobility",
      description: "Developed a comprehensive ride-sharing solution with real-time tracking, dynamic pricing, and multi-language support, serving 500K+ users.",
      result: "500K+ Users",
      tech: ["React Native", "Node.js", "MongoDB", "Google Maps API"]
    },
    {
      title: "Food Delivery App for Restaurant Chain",
      description: "Created a white-label food delivery platform with restaurant management dashboard, real-time order tracking, and integrated payments.",
      result: "40% Higher Orders",
      tech: ["Flutter", "Firebase", "Stripe API", "Redis"]
    },
    {
      title: "Home Services Booking Platform",
      description: "Built a multi-service booking platform for home maintenance, cleaning, and repair services with service provider management.",
      result: "35% Service Growth",
      tech: ["Vue.js", "Express", "PostgreSQL", "Twilio"]
    }
  ];

  const faqs = [
    {
      question: "What types of on-demand solutions do you develop?",
      answer: "We develop a wide range of on-demand solutions including ride-sharing, food delivery, home services, healthcare, e-commerce, and specialized industry applications. Our platforms include mobile apps, web dashboards, and backend systems."
    },
    {
      question: "How long does it take to develop an on-demand solution?",
      answer: "Timeline varies by complexity: MVP takes 3-4 months, feature-rich platforms 6-8 months, enterprise solutions 8-12 months. We provide detailed timelines during the discovery phase."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes! We offer comprehensive post-launch support including updates, bug fixes, performance optimization, and 24/7 technical support to keep your platform running smoothly."
    }
  ];

  const testimonials = [
    {
      quote: "Guidesoft transformed our business idea into a successful on-demand platform. Their technical expertise and understanding of market needs resulted in a product our customers love.",
      author: "Michael Rodriguez",
      role: "Founder, UrbanRide"
    },
    {
      quote: "The food delivery platform they developed for our restaurant chain increased our online orders by 60%. Their attention to detail and user experience is exceptional.",
      author: "Sarah Johnson",
      role: "Operations Director, GourmetExpress"
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

      {/* Hero Section with unique background */}
      <PageHero
        title="On-Demand Solutions"
        subtitle="Create powerful, scalable on-demand platforms that connect service providers with customers in real-time. From concept to launch, we build solutions that drive growth and engagement."
        ctaText="Get Started"
        pageType="on-demand-solutions"
      />

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
                  <Badge className="bg-primary/10 border-primary/30 w-fit">What are On-Demand Solutions?</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    Connecting Services with Instant Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    On-demand solutions are digital platforms that instantly connect service providers with customers who need those services. These platforms leverage real-time data, location services, and mobile technology to deliver immediate value and convenience.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Real-time service matching</li>
                    <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Secure payment processing</li>
                    <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Scalable infrastructure</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8">
                <CardHeader>
                  <Badge className="bg-primary/10 border-primary/30 w-fit">Why It Matters</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    The On-Demand Economy Revolution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    The on-demand economy is transforming how we access services, creating new business opportunities and consumer expectations. Companies with on-demand platforms are growing 12x faster than traditional businesses and capturing significant market share.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Target className="h-4 w-4 text-primary" /> On-demand market valued at $168B</div>
                      <div className="flex items-center gap-2 text-foreground"><TrendingUp className="h-4 w-4 text-primary" /> Growing at 18% CAGR</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Zap className="h-4 w-4 text-primary" /> 75% prefer on-demand services</div>
                      <div className="flex items-center gap-2 text-foreground"><Users className="h-4 w-4 text-primary" /> 60% use multiple platforms</div>
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
              On-Demand Platform Features
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Smartphone, title: "Mobile Applications", desc: "Native iOS and Android apps with intuitive interfaces for customers and service providers." },
              { icon: Globe, title: "Web Dashboards", desc: "Admin panels and provider dashboards for real-time management and analytics." },
              { icon: Layout, title: "User Management", desc: "Secure authentication, profile management, and role-based access control." },
              { icon: Truck, title: "Real-Time Tracking", desc: "Live location tracking, ETA calculations, and route optimization." },
              { icon: Zap, title: "Payment Integration", desc: "Secure payment processing with multiple gateway options and wallet features." },
              { icon: Shield, title: "Security & Compliance", desc: "Enterprise-grade security, data encryption, and regulatory compliance." }
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
              Our On-Demand Development Process
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              A structured approach ensuring quality, efficiency, and client satisfaction at every step
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-12">
            {[
              { icon: Lightbulb, title: "Market Research & Discovery", desc: "We analyze market trends, competitor platforms, and user needs to define your unique value proposition.", step: 1 },
              { icon: Layout, title: "Platform Architecture", desc: "Design scalable system architecture with microservices, real-time communication, and cloud infrastructure.", step: 2 },
              { icon: Code, title: "Development", desc: "Agile development with clean code practices, version control, and regular progress updates to ensure alignment.", step: 3 },
              { icon: TestTube2, title: "Testing & QA", desc: "Comprehensive testing including functionality, performance, security, and user acceptance testing.", step: 4 },
              { icon: UploadCloud, title: "Deployment & Launch", desc: "Smooth deployment to app stores with optimization for discoverability and user onboarding support.", step: 5 },
              { icon: TrendingUp, title: "Post-Launch Support", desc: "Ongoing maintenance, updates, performance monitoring, and feature enhancements based on user feedback.", step: 6 }
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
              Our On-Demand Solutions Portfolio
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Real results from real projects – see how we've helped businesses thrive with on-demand platforms
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
              On-Demand Solutions Insights
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Stay ahead with our latest articles and trends in on-demand technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Top 10 On-Demand Trends for 2024", excerpt: "Explore emerging technologies like AI integration, IoT, and hyperlocal services shaping the future.", date: "March 15, 2024" },
              { title: "Building Scalable On-Demand Platforms", excerpt: "A comprehensive guide to architecting systems that can handle millions of concurrent users.", date: "March 12, 2024" },
              { title: "Monetization Strategies for On-Demand Apps", excerpt: "We break down the most effective revenue models for different types of on-demand services.", date: "March 10, 2024" }
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
                Our On-Demand Solutions Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Truck, number: "100+", label: "Platforms Developed" },
                  { icon: Users, number: "50+", label: "Satisfied Clients" },
                  { icon: Award, number: "95%", label: "Client Retention" }
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Launch Your On-Demand Platform?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Let's create a powerful on-demand solution that connects service providers with customers in real-time.</p>
          <Button 
            size="lg" 
            className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
            onClick={() => setIsLightboxOpen(true)}
          >
            Start Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.section>
      
      {/* Lightbox Form */}
      <LightboxForm
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="On-Demand Solutions Inquiry"
        serviceType="On-Demand Solutions"
      />
    </div>
  );
};

export default OnDemandSolutions;