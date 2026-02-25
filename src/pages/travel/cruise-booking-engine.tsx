"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, Easing } from "framer-motion";
import { Ship, MapPin, Calendar, CheckCircle, Users, Award, ArrowRight, Lightbulb, Shield, TrendingUp, Target, Layout, Code2, TestTube2, UploadCloud, Cloud, Rocket } from "lucide-react";

const CruiseBookingEngine = () => {
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
      title: "Luxury Cruise Line Reservation System",
      description: "Developed a sophisticated cruise booking engine for a premium cruise line, featuring itinerary planning, cabin selection, and onboard service bookings.",
      result: "250K+ Bookings",
      tech: ["React", "Node.js", "Cruise API"]
    },
    {
      title: "Multi-Cruise Aggregator Platform",
      description: "Built an aggregator engine connecting users to various cruise operators with advanced search, price comparison, and loyalty integration.",
      result: "92% Conversion Rate",
      tech: ["Vue.js", "MongoDB", "Royal Caribbean API"]
    },
    {
      title: "Expedition Cruise Booking Portal",
      description: "Created a specialized engine for adventure cruises, including environmental impact tracking and customized excursion packages.",
      result: "150K+ Passengers",
      tech: ["Angular", "PostgreSQL", "Custom GIS"]
    }
  ];

  const faqs = [
    {
      question: "What is a Cruise Booking Engine?",
      answer: "A cruise booking engine is a specialized platform that enables customers to search for cruise itineraries, select ships and cabins, view deck plans, and book voyages online. It integrates with cruise line APIs, payment systems, and travel agents for comprehensive reservation management."
    },
    {
      question: "How does it handle complex itineraries and cabin inventory?",
      answer: "Our engines manage multi-port itineraries, availability across cabin categories (inside, balcony, suites), group bookings, and special needs (accessibility, dietary). Real-time inventory sync prevents overselling and supports waitlists."
    },
    {
      question: "What integrations are key for cruise booking systems?",
      answer: "Essential integrations include cruise line APIs (Royal Caribbean, Carnival, Norwegian), GDS for add-ons (flights, hotels), payment gateways, CRM for passenger profiles, and email/SMS for confirmations and updates."
    }
  ];

  const testimonials = [
    {
      quote: "Guidesoft's cruise booking engine has made our reservation process seamless and our customers love the intuitive interface. Bookings are up 45% since implementation.",
      author: "Elena Vasquez",
      role: "VP Sales, Ocean Adventures"
    },
    {
      quote: "The advanced features for group bookings and itinerary customization have set us apart in the competitive cruise market. Exceptional development team!",
      author: "James Hartley",
      role: "CTO, Blue Horizon Cruises"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50/50 via-indigo-50/50 to-blue-50/50 pointer-events-none" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-indigo-100/20 to-blue-100/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
            <Ship className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Cruise Booking Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Cruise Booking Engine
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-8">
            Set sail with a sophisticated booking engine that captures the magic of cruising, from itinerary discovery to onboard reservations, delivering unforgettable vacation experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity shadow-lg">
                Book Your Cruise Voyage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
              Explore Cruises
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
                  <Badge className="bg-primary/10 border-primary/30 w-fit">What is a Cruise Booking Engine?</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Voyage Discovery & Reservation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    A cruise booking engine is designed for the unique complexities of cruise travel, allowing users to explore destinations, ships, itineraries, and amenities before booking cabins, excursions, and packages. It handles group bookings, special events, and loyalty perks with precision.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Interactive deck plans and virtual tours</li>
                    <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Flexible cancellation policies</li>
                    <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Themed cruise and port-specific searches</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8">
                <CardHeader>
                  <Badge className="bg-primary/10 border-primary/30 w-fit">Market Edge</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Elevate Cruise Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    In the luxury travel segment, a superior booking engine can significantly boost conversions by providing immersive experiences and personalized recommendations. It reduces abandonment rates and supports upselling of premium cabins and excursions, directly impacting revenue per passenger.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Target className="h-4 w-4 text-primary" /> 35% Increase in Premium Bookings</div>
                      <div className="flex items-center gap-2 text-foreground"><TrendingUp className="h-4 w-4 text-primary" /> Enhanced Passenger Loyalty</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Users className="h-4 w-4 text-primary" /> Group & Event Management</div>
                      <div className="flex items-center gap-2 text-foreground"><Lightbulb className="h-4 w-4 text-primary" /> Personalized Itineraries</div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Signature Features for Cruise Booking
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Tailored functionality for the world of luxury sea travel
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Ship, title: "Itinerary & Ship Search", desc: "Search by destination, duration, cruise line, ship class, and themes (family, luxury, adventure) with detailed port schedules and weather info." },
              { icon: MapPin, title: "Cabin & Deck Selection", desc: "Interactive 3D deck plans, cabin views, category comparisons, and availability checker for suites, balconies, and interior rooms." },
              { icon: Calendar, title: "Booking & Passenger Management", desc: "Multi-passenger bookings, special requests (dietary, mobility), document uploads, and group coordinator tools for events and charters." },
              { icon: Shield, title: "Excursions & Onboard Bookings", desc: "Pre-cruise excursion reservations, spa/dining packages, and onboard activity scheduling with real-time availability." },
              { icon: Cloud, title: "Cruise Line API Integration", desc: "Seamless connectivity with major operators (Carnival, Royal Caribbean, MSC) for inventory, pricing, and passenger data exchange." },
              { icon: TrendingUp, title: "Promotions & Loyalty", desc: "Dynamic deals, flash sales, loyalty point redemption, and affiliate tracking for travel agents and partners." }
            ].map((feature, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" transition={{ delay: index * 0.1 }}>
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all h-full group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Cruise Booking Engine Development Journey
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Navigating from concept to launch with maritime precision
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-12">
            {[
              { icon: Lightbulb, title: "Voyage Planning", desc: "Collaborating with cruise experts to map requirements, user journeys, and key integrations for seamless sailing experiences.", step: 1 },
              { icon: Layout, title: "Design & Visualization", desc: "Crafting immersive UI with 3D ship models, itinerary timelines, and responsive designs for desktop and mobile voyagers.", step: 2 },
              { icon: Code2, title: "Engine Construction", desc: "Developing robust backend for API orchestration, booking logic, and frontend with animations for deck exploration.", step: 3 },
              { icon: TestTube2, title: "Sea Trials & Testing", desc: "Simulating high-volume bookings, testing API reliability, and ensuring cross-browser/device compatibility for global users.", step: 4 },
              { icon: UploadCloud, title: "Launch & Support", desc: "Deploying to scalable cloud, training agents, and providing 24/7 monitoring for peak sailing seasons.", step: 5 }
            ].map((step, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" className="flex items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Award-Winning Cruise Projects
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Voyages that set new standards in booking technology
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
                        <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Cruise Industry Insights
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Navigating trends in luxury sea travel technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Sustainable Cruising: Tech for Eco-Friendly Voyages", excerpt: "How booking engines can promote green cruises with carbon offset options and sustainable ship selections.", date: "July 22, 2024" },
              { title: "Personalization in Cruise Bookings: AI Recommendations", excerpt: "Using machine learning to suggest itineraries, cabins, and excursions based on passenger preferences and history.", date: "July 19, 2024" },
              { title: "Post-Pandemic Cruise Booking Strategies", excerpt: "Adapting engines for health protocols, flexible policies, and virtual ship tours to rebuild traveler confidence.", date: "July 16, 2024" }
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
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90">
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Our Cruise Booking Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Ship, number: "100+", label: "Cruise Lines Integrated" },
                  { icon: Users, number: "500K+", label: "Passengers Booked" },
                  { icon: Award, number: "95%", label: "Booking Completion Rate" }
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                What Our Cruise Partners Say
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-blue-600/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Chart New Courses for Your Cruise Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Embark on a partnership to create a booking engine that sails ahead of the competition and delights every passenger.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Set Sail with Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default CruiseBookingEngine;
