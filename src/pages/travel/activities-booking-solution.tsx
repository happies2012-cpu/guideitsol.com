"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, Easing } from "framer-motion";
import { Activity, MapPin, Calendar, CheckCircle, Users, Award, ArrowRight, Lightbulb, Shield, TrendingUp, Target, Layout, Code2, TestTube2, UploadCloud, Cloud, Rocket } from "lucide-react";

const ActivitiesBookingSolution = () => {
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
      title: "Global Activities Marketplace",
      description: "Developed a comprehensive activities booking platform connecting travelers with local experiences worldwide, featuring real-time availability and instant confirmations.",
      result: "750K+ Bookings",
      tech: ["React", "Node.js", "Viator API"]
    },
    {
      title: "Destination-Specific Activity Portal",
      description: "Built a specialized booking system for a tourist destination, integrating local tours, adventure activities, and cultural experiences with dynamic pricing.",
      result: "95% Customer Satisfaction",
      tech: ["Vue.js", "MongoDB", "GetYourGuide API"]
    },
    {
      title: "Corporate Team Building Platform",
      description: "Created a B2B solution for corporate groups, offering customized team-building activities, group discounts, and enterprise invoicing.",
      result: "200+ Corporate Clients",
      tech: ["Angular", "PostgreSQL", "Custom API"]
    }
  ];

  const faqs = [
    {
      question: "What is an Activities Booking Solution?",
      answer: "An activities booking solution is a platform that enables travelers to discover, compare, and book local experiences, tours, and attractions. It integrates with activity providers, handles real-time availability, and provides instant confirmations with flexible cancellation policies."
    },
    {
      question: "How does it handle different activity types and providers?",
      answer: "Our solutions support various activity categories (tours, adventures, cultural experiences, wellness) and integrate with multiple providers through APIs. We manage inventory synchronization, pricing updates, and provider payouts automatically."
    },
    {
      question: "What are the key features for activities booking platforms?",
      answer: "Essential features include location-based search, activity filters (duration, price, difficulty), real-time availability, instant booking confirmation, mobile vouchers, reviews/ratings, and multi-language support for global travelers."
    }
  ];

  const testimonials = [
    {
      quote: "Guidesoft's activities booking solution has transformed our tourism offerings. Bookings increased by 70% and our partners love the seamless integration.",
      author: "Sophie Laurent",
      role: "Director of Tourism, Visit Paris"
    },
    {
      quote: "The platform's ability to handle complex group bookings and custom itineraries has made it invaluable for our adventure travel business.",
      author: "Mike Thompson",
      role: "Founder, Adventure Seekers"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-50/50 via-red-50/50 to-pink-50/50 pointer-events-none" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 via-red-100/20 to-pink-100/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Activities Booking Solution</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Activities Booking Solution
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-8">
            Unlock unforgettable experiences with a comprehensive activities booking platform that connects travelers to the world's best tours, adventures, and local attractions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="px-8 bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-90 transition-opacity shadow-lg">
                Build Your Activities Platform
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
              Explore Experiences
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
                  <Badge className="bg-primary/10 border-primary/30 w-fit">What is an Activities Booking Solution?</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Experience Discovery Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    An activities booking solution is a digital marketplace that enables travelers to discover and book unique local experiences, tours, and attractions. It aggregates offerings from global providers, manages real-time availability, and provides seamless booking experiences with instant confirmations.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Location-based activity search</li>
                    <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Instant booking confirmations</li>
                    <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Dynamic pricing and promotions</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8">
                <CardHeader>
                  <Badge className="bg-primary/10 border-primary/30 w-fit">Market Opportunity</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Tap into Experience Economy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    The experience economy is booming, with travelers seeking authentic, memorable activities. A robust booking platform can capture this demand, offering high margins, repeat business, and partnerships with local providers worldwide.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Target className="h-4 w-4 text-primary" /> 50% Higher Conversion Rates</div>
                      <div className="flex items-center gap-2 text-foreground"><TrendingUp className="h-4 w-4 text-primary" /> Recurring Revenue Streams</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Users className="h-4 w-4 text-primary" /> Global Provider Network</div>
                      <div className="flex items-center gap-2 text-foreground"><Lightbulb className="h-4 w-4 text-primary" /> Personalized Recommendations</div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Core Features for Activities Booking
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Everything needed to create engaging activity booking experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: "Activity Discovery & Search", desc: "Advanced search with filters for location, category, duration, price, difficulty, and group size. AI-powered recommendations based on traveler preferences." },
              { icon: MapPin, title: "Location & Mapping", desc: "Interactive maps showing activity locations, meeting points, and routes. Integration with Google Maps for directions and nearby attractions." },
              { icon: Calendar, title: "Availability & Booking", desc: "Real-time availability checking, instant booking confirmations, and flexible rescheduling. Support for private tours and custom experiences." },
              { icon: Shield, title: "Provider Management", desc: "Onboarding local operators, managing contracts, handling payouts, and quality assurance through reviews and ratings systems." },
              { icon: Cloud, title: "API Integrations", desc: "Connections with major activity aggregators (Viator, GetYourGuide, Klook) and local providers for comprehensive inventory access." },
              { icon: TrendingUp, title: "Marketing & Analytics", desc: "SEO optimization, social sharing, email marketing, and detailed analytics on bookings, revenue, and traveler demographics." }
            ].map((feature, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" transition={{ delay: index * 0.1 }}>
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all h-full group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Activities Booking Platform Development Process
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Crafting platforms that bring experiences to life
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-12">
            {[
              { icon: Lightbulb, title: "Market Research & Strategy", desc: "Analyzing target destinations, traveler preferences, and competitive landscape to define platform positioning and feature set.", step: 1 },
              { icon: Layout, title: "Design & User Experience", desc: "Creating visually appealing activity listings, intuitive booking flows, and mobile-optimized interfaces for on-the-go travelers.", step: 2 },
              { icon: Code2, title: "Platform Development", desc: "Building scalable backend with provider integrations, frontend with rich media support, and admin tools for content management.", step: 3 },
              { icon: TestTube2, title: "Integration & Testing", desc: "Testing API connections, booking flows, payment processing, and cross-device compatibility with real provider data.", step: 4 },
              { icon: UploadCloud, title: "Launch & Optimization", desc: "Deploying to production, onboarding providers, and continuous optimization based on user feedback and performance metrics.", step: 5 }
            ].map((step, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover" className="flex items-center gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Successful Activities Booking Projects
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Creating memorable experiences through innovative platforms
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
                        <Badge className="bg-gradient-to-r from-orange-600 to-red-600">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Experience Economy Insights
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Trends shaping the future of activities and experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Virtual Reality Previews for Activities", excerpt: "How VR technology is revolutionizing activity discovery, allowing travelers to preview experiences before booking.", date: "July 26, 2024" },
              { title: "Sustainable Tourism and Eco-Activities", excerpt: "The rise of environmentally conscious activities and how booking platforms can promote sustainable tourism.", date: "July 23, 2024" },
              { title: "AI-Powered Activity Recommendations", excerpt: "Using machine learning to suggest personalized activities based on travel history, preferences, and social data.", date: "July 20, 2024" }
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
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-90">
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Our Activities Booking Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Activity, number: "10K+", label: "Activities Listed" },
                  { icon: Users, number: "2M+", label: "Travelers Served" },
                  { icon: Award, number: "96%", label: "Booking Success Rate" }
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
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                What Our Experience Partners Say
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
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-pink-600/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Bring Experiences to Life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Create a world-class activities booking platform that connects travelers with unforgettable experiences and drives revenue for your business.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Start Building Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default ActivitiesBookingSolution;
