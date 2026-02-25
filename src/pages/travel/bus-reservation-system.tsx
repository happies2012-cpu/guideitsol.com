"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, Easing } from "framer-motion";
import { Bus, MapPin, Calendar, CheckCircle, Users, Award, ArrowRight, Lightbulb, Shield, TrendingUp, Target, Layout, Code2, TestTube2, UploadCloud, Cloud, Rocket } from "lucide-react";

const BusReservationSystem = () => {
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
      title: "National Bus Network Reservation Platform",
      description: "Developed a comprehensive bus booking system for a major national operator, integrating real-time schedules, seat selection, and mobile ticketing.",
      result: "1.2M+ Tickets Sold",
      tech: ["React", "Node.js", "Bus API"]
    },
    {
      title: "Intercity Bus Aggregator",
      description: "Built an aggregator platform connecting multiple bus operators with advanced search, price comparison, and loyalty rewards.",
      result: "85% Market Share",
      tech: ["Vue.js", "MongoDB", "Redbus API"]
    },
    {
      title: "Corporate Bus Charter System",
      description: "Created a B2B solution for corporate travel, featuring group bookings, expense tracking, and shuttle service management.",
      result: "30% Cost Savings",
      tech: ["Angular", "PostgreSQL", "Enterprise API"]
    }
  ];

  const faqs = [
    {
      question: "What is a Bus Reservation System?",
      answer: "A bus reservation system is a digital platform that allows passengers to search for bus routes, view schedules, select seats, and book tickets online. It integrates with bus operators, payment gateways, and GPS tracking for real-time updates and automated confirmations."
    },
    {
      question: "How does it handle seat inventory and real-time availability?",
      answer: "Our systems sync with bus operator databases to provide live seat maps, pricing, and availability. Advanced algorithms prevent overbooking and support dynamic pricing based on demand, route popularity, and time to departure."
    },
    {
      question: "What integrations are essential for bus booking systems?",
      answer: "Key integrations include bus operator APIs, payment processors (Stripe, PayPal), SMS/email services for notifications, GPS for tracking, and CRM systems for passenger management and loyalty programs."
    }
  ];

  const testimonials = [
    {
      quote: "Guidesoft's bus reservation system has transformed our operations. Online bookings increased by 60% and our passengers love the mobile app experience.",
      author: "Rajesh Kumar",
      role: "CEO, Express Travels"
    },
    {
      quote: "The real-time tracking and automated notifications have significantly improved customer satisfaction and reduced no-show rates.",
      author: "Maria Santos",
      role: "Operations Director, City Bus Lines"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-50/50 via-cyan-50/50 to-blue-50/50 pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(30 30)'%3E%3Ccircle cx='0' cy='0' r='1' fill='hsl(var(--primary)/0.1)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/20 via-cyan-100/20 to-blue-100/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
            <Bus className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Bus Reservation System</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Bus Reservation System
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-8">
            Drive your bus business forward with a robust reservation system that offers seamless booking, real-time tracking, and exceptional passenger experiences across all routes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="px-8 bg-gradient-to-r from-teal-600 to-cyan-600 hover:opacity-90 transition-opacity shadow-lg">
                Book Your Bus System
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
              Explore Routes
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
                  <Badge className="bg-primary/10 border-primary/30 w-fit">What is a Bus Reservation System?</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Efficient Transit Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    A bus reservation system digitizes the entire booking process, from route planning to ticket issuance. It provides passengers with convenient online booking, seat selection, and real-time updates while giving operators tools for fleet management and revenue optimization.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Interactive seat maps and selection</li>
                    <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Secure payment and ticket validation</li>
                    <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Dynamic pricing and promotions</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8">
                <CardHeader>
                  <Badge className="bg-primary/10 border-primary/30 w-fit">Business Benefits</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Optimize Operations & Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    Modern reservation systems reduce operational costs, minimize empty seats, and provide valuable data insights. They enable operators to offer competitive pricing, personalized services, and seamless integration with other transportation modes.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Target className="h-4 w-4 text-primary" /> 40% Reduction in No-Shows</div>
                      <div className="flex items-center gap-2 text-foreground"><TrendingUp className="h-4 w-4 text-primary" /> Increased Load Factors</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Users className="h-4 w-4 text-primary" /> Enhanced Passenger Experience</div>
                      <div className="flex items-center gap-2 text-foreground"><Lightbulb className="h-4 w-4 text-primary" /> Real-Time Fleet Tracking</div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Essential Features for Bus Reservations
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Comprehensive tools for modern bus transportation management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Bus, title: "Route & Schedule Management", desc: "Comprehensive route planning, schedule optimization, and real-time updates for delays, cancellations, and route changes." },
              { icon: MapPin, title: "Seat Selection & Inventory", desc: "Interactive seat maps, category-based pricing (window, aisle, premium), and automated inventory management to prevent overbooking." },
              { icon: Calendar, title: "Booking & Reservation", desc: "Multi-passenger bookings, advance reservations, waitlists, and flexible cancellation policies with automated refunds." },
              { icon: Shield, title: "Payment & Security", desc: "Multiple payment options, PCI-compliant processing, and secure ticket validation via QR codes or mobile wallets." },
              { icon: Cloud, title: "Operator Integration", desc: "API connections with bus operators, aggregators, and transportation networks for unified booking across multiple providers." },
              { icon: TrendingUp, title: "Analytics & Reporting", desc: "Revenue tracking, passenger demographics, route performance, and predictive analytics for demand forecasting." }
            ].map((feature, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" transition={{ delay: index * 0.1 }}>
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all h-full group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Bus Reservation System Development Process
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              A structured approach to building reliable transportation solutions
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-12">
            {[
              { icon: Lightbulb, title: "Route Analysis", desc: "Mapping transportation networks, understanding operator requirements, and defining system scope for optimal coverage.", step: 1 },
              { icon: Layout, title: "Design & User Experience", desc: "Creating intuitive booking interfaces, mobile-first designs, and admin dashboards for fleet and revenue management.", step: 2 },
              { icon: Code2, title: "System Development", desc: "Building scalable backend with real-time APIs, frontend with responsive design, and integration with payment and tracking systems.", step: 3 },
              { icon: TestTube2, title: "Testing & Validation", desc: "Comprehensive testing for booking accuracy, load handling during peak hours, and cross-platform compatibility.", step: 4 },
              { icon: UploadCloud, title: "Deployment & Support", desc: "Cloud deployment, operator training, and ongoing maintenance with performance monitoring and feature updates.", step: 5 }
            ].map((step, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" className="flex items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Successful Bus Reservation Implementations
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Driving efficiency and passenger satisfaction in transportation
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
                        <Badge className="bg-gradient-to-r from-teal-600 to-cyan-600">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Transportation Tech Insights
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Latest trends in bus reservation and public transit technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Contactless Ticketing: The Future of Bus Travel", excerpt: "Implementing mobile wallets, QR codes, and NFC technology for seamless, touch-free boarding experiences.", date: "July 24, 2024" },
              { title: "AI-Powered Route Optimization for Bus Operators", excerpt: "Using machine learning to predict demand, optimize schedules, and reduce operational costs in public transportation.", date: "July 21, 2024" },
              { title: "Integrated Multi-Modal Transportation Systems", excerpt: "Connecting bus reservations with trains, metros, and ride-sharing for comprehensive urban mobility solutions.", date: "July 18, 2024" }
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
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:opacity-90">
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Our Bus Reservation Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Bus, number: "500+", label: "Bus Operators" },
                  { icon: Users, number: "3M+", label: "Passengers Served" },
                  { icon: Award, number: "97%", label: "On-Time Performance" }
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                What Our Transportation Partners Say
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
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 via-cyan-600/20 to-blue-600/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Revolutionize Your Bus Operations?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Implement a state-of-the-art reservation system that maximizes revenue, improves passenger satisfaction, and streamlines your transportation business.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default BusReservationSystem;
