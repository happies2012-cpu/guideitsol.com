"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, Easing } from "framer-motion";
import { Car, MapPin, Calendar, CheckCircle, Users, Award, ArrowRight, Lightbulb, Shield, TrendingUp, Target, Layout, Code2, TestTube2, UploadCloud, Cloud, Rocket } from "lucide-react";

const CarRentalBookingEngine = () => {
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
      title: "Global Car Rental Network",
      description: "Developed a comprehensive car rental booking engine connecting users with international providers, featuring real-time availability and dynamic pricing.",
      result: "300K+ Rentals",
      tech: ["React", "Node.js", "Rentalcars API"]
    },
    {
      title: "Airport Car Rental Platform",
      description: "Built a specialized booking engine for airport locations with GPS integration, insurance options, and seamless pickup scheduling.",
      result: "97% On-Time Pickups",
      tech: ["Vue.js", "MongoDB", "Google Maps"]
    },
    {
      title: "Corporate Fleet Management System",
      description: "Created a B2B car rental solution for companies, including expense tracking, driver approvals, and bulk booking capabilities.",
      result: "40% Cost Reduction",
      tech: ["Angular", "PostgreSQL", "Enterprise API"]
    }
  ];

  const faqs = [
    {
      question: "What is a Car Rental Booking Engine?",
      answer: "A car rental booking engine is a digital platform that allows customers to search for vehicles by location, dates, and type, view availability, compare prices, and complete reservations online. It integrates with rental company inventories, GPS services, and payment systems for end-to-end booking management."
    },
    {
      question: "How does it handle real-time availability and pricing?",
      answer: "Our engines use API integrations with rental providers to fetch live inventory and rates. Dynamic pricing considers factors like demand, vehicle type, location, and add-ons (insurance, GPS), ensuring accurate quotes and preventing overbookings."
    },
    {
      question: "What integrations are supported for car rental engines?",
      answer: "We integrate with major car rental APIs (Rentalcars, CarTrawler), GPS providers (Google Maps, Waze), payment gateways (Stripe, PayPal), and CRM systems for customer data management and loyalty programs."
    }
  ];

  const testimonials = [
    {
      quote: "Guidesoft's car rental booking engine has streamlined our operations and increased online reservations by 50%. The mobile experience is outstanding.",
      author: "Tom Wilson",
      role: "Operations Manager, AutoRent International"
    },
    {
      quote: "The custom features for our fleet management, including real-time tracking and reporting, have transformed how we serve corporate clients.",
      author: "Anna Petrov",
      role: "CEO, FleetPro Rentals"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/50 to-indigo-50/50 pointer-events-none" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-blue-100/20 to-indigo-100/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
            <Car className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Car Rental Booking Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Car Rental Booking Engine
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-8">
            Empower your rental business with a dynamic booking engine that connects customers to the perfect vehicle, anytime, anywhere, with real-time availability and effortless reservations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="px-8 bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 transition-opacity shadow-lg">
                Start Your Rental Platform
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
              View Capabilities
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
                  <Badge className="bg-primary/10 border-primary/30 w-fit">What is a Car Rental Booking Engine?</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    On-Demand Mobility Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    A car rental booking engine is the technology backbone for rental companies, enabling online vehicle reservations with features like location-based search, vehicle categorization, add-ons (GPS, insurance), and integrated payments. It ensures efficient fleet utilization and customer satisfaction.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Location-specific vehicle search</li>
                    <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Secure booking and payment</li>
                    <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Fleet management integration</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8">
                <CardHeader>
                  <Badge className="bg-primary/10 border-primary/30 w-fit">Strategic Advantage</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Optimize Fleet & Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    In a competitive market, a robust booking engine differentiates your rental business by offering convenience, transparency, and personalization. It reduces manual processes, minimizes no-shows, and provides data insights for better inventory management and pricing strategies.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Target className="h-4 w-4 text-primary" /> 25% Higher Utilization Rates</div>
                      <div className="flex items-center gap-2 text-foreground"><TrendingUp className="h-4 w-4 text-primary" /> Real-Time Dynamic Pricing</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Users className="h-4 w-4 text-primary" /> B2C & B2B Support</div>
                      <div className="flex items-center gap-2 text-foreground"><Lightbulb className="h-4 w-4 text-primary" /> Add-On Revenue Streams</div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Essential Features for Car Rental Booking
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Comprehensive tools to manage rentals from search to return
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Car, title: "Vehicle Search & Filters", desc: "Search by pickup/drop-off locations, dates, vehicle class (economy, SUV, luxury), transmission, and fuel type with photo galleries and specs." },
              { icon: MapPin, title: "Location & GPS Integration", desc: "Interactive maps for branch locations, route planning, and one-way rental options with distance-based pricing." },
              { icon: Calendar, title: "Reservation Management", desc: "Online booking with hold options, modifications, cancellations, and automated reminders for pickup times and requirements." },
              { icon: Shield, title: "Insurance & Add-Ons", desc: "Optional coverage (collision damage, liability), extras (child seats, GPS, toll tags), and upselling during booking process." },
              { icon: Cloud, title: "Fleet & Provider Integration", desc: "API connections to rental networks, fleet management systems, and third-party services for real-time vehicle status and maintenance alerts." },
              { icon: TrendingUp, title: "Pricing & Promotions", desc: "Dynamic rates based on demand, loyalty discounts, corporate rates, and promo codes for seasonal campaigns and partnerships." }
            ].map((feature, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" transition={{ delay: index * 0.1 }}>
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all h-full group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Development Process for Car Rental Engines
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Step-by-step approach to building scalable rental solutions
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-12">
            {[
              { icon: Lightbulb, title: "Business Analysis", desc: "Understanding your rental model, target customers, fleet size, and operational needs to define system requirements and integrations.", step: 1 },
              { icon: Layout, title: "UI/UX Design", desc: "Designing user-friendly interfaces for vehicle selection, booking flows, and admin dashboards with focus on mobile accessibility.", step: 2 },
              { icon: Code2, title: "Core Engine Development", desc: "Implementing search algorithms, booking logic, payment processing, and API integrations using modern web technologies.", step: 3 },
              { icon: TestTube2, title: "Testing & Validation", desc: "End-to-end testing for booking accuracy, payment security, mobile responsiveness, and high-load scenarios during peak seasons.", step: 4 },
              { icon: UploadCloud, title: "Launch & Optimization", desc: "Deployment to cloud infrastructure, user training, and continuous monitoring with A/B testing for UI improvements.", step: 5 }
            ].map((step, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" className="flex items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Successful Car Rental Projects
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Real implementations driving rental business growth
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
                        <Badge className="bg-gradient-to-r from-green-600 to-blue-600">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mobility Tech Insights
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Trends in car rental and transportation technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "The Future of Car Rental: EVs and Autonomous Vehicles", excerpt: "How electric and self-driving cars are reshaping the rental industry and what booking engines need to adapt.", date: "July 20, 2024" },
              { title: "Integrating GPS and Telematics in Rental Platforms", excerpt: "Enhancing customer experience and fleet security with real-time location tracking and vehicle monitoring.", date: "July 17, 2024" },
              { title: "Subscription Models for Car Rentals", excerpt: "Exploring long-term rental subscriptions as an alternative to traditional daily/weekly bookings.", date: "July 14, 2024" }
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
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90">
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Our Car Rental Booking Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Car, number: "10K+", label: "Vehicles Managed" },
                  { icon: Users, number: "1M+", label: "Rentals Booked" },
                  { icon: Award, number: "98%", label: "Customer Satisfaction" }
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                What Our Rental Clients Say
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-blue-600/20 to-indigo-600/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Accelerate Your Rental Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Deploy a cutting-edge car rental booking engine that optimizes your fleet, delights customers, and boosts profitability.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default CarRentalBookingEngine;
