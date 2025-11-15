"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, Easing } from "framer-motion";
import { Code, Smartphone, Search, Zap, CheckCircle, Users, Award, Calendar, ArrowRight, Lightbulb, Shield, TrendingUp, Target, Layout, Code2, TestTube2, UploadCloud } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import LightboxForm from "@/components/ui/LightboxForm";

const WebDevelopment = () => {
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
      title: "E-Commerce Platform for Retail Giant",
      description: "Built a scalable, responsive e-commerce site with custom CMS integration, resulting in 40% increase in conversion rates.",
      result: "40% Conversion Boost",
      tech: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Corporate Website for Tech Startup",
      description: "Developed a modern, SEO-optimized corporate site with headless CMS, improving search rankings by 150 positions.",
      result: "150+ SEO Ranking Improvement",
      tech: ["Next.js", "Strapi", "Tailwind"]
    },
    {
      title: "Portfolio Site for Creative Agency",
      description: "Created a dynamic portfolio with advanced animations and performance tuning, reducing load time by 60%.",
      result: "60% Faster Load Times",
      tech: ["Vue.js", "Firebase", "GSAP"]
    }
  ];

  const faqs = [
    {
      question: "What technologies do you use for web development?",
      answer: "We specialize in modern stacks like React, Next.js, Vue.js, Node.js, Python/Django, and headless CMS like Strapi or Contentful. We choose based on your project's needs for scalability and performance."
    },
    {
      question: "How long does it take to develop a website?",
      answer: "Timeline varies by complexity: Simple sites take 2-4 weeks, custom e-commerce 6-12 weeks, enterprise solutions 3-6 months. We provide detailed timelines during the discovery phase."
    },
    {
      question: "Do you offer ongoing maintenance and support?",
      answer: "Yes! We provide comprehensive post-launch support including updates, security monitoring, performance optimization, and 24/7 technical support to keep your site running smoothly."
    }
  ];

  const testimonials = [
    {
      quote: "Guidesoft delivered our e-commerce platform ahead of schedule with exceptional quality. Their expertise in responsive design transformed our online presence.",
      author: "Sarah Johnson",
      role: "CEO, RetailCo"
    },
    {
      quote: "The SEO optimization they implemented boosted our organic traffic by 200% in just three months. Highly recommend their web development services!",
      author: "Mike Chen",
      role: "Marketing Director, TechStart"
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
        title="Web Development"
        subtitle="Build responsive, secure, and high-performing websites for your business. From custom solutions to enterprise platforms, we craft digital experiences that drive growth."
        ctaText="Get Started"
        pageType="web-development"
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
                  <Badge className="bg-primary/10 border-primary/30 w-fit">What is Web Development?</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    Crafting Digital Foundations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    Web development is the art and science of building websites and web applications that are functional, user-friendly, and optimized for performance. It encompasses frontend design, backend logic, database management, and seamless integration to create robust digital solutions.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Responsive across all devices</li>
                    <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Secure and scalable architecture</li>
                    <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> SEO-optimized for visibility</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card className="bg-background/40 backdrop-blur-xl border-primary/20 p-8">
                <CardHeader>
                  <Badge className="bg-primary/10 border-primary/30 w-fit">Why It Matters</Badge>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                    Essential for Modern Business
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    In today's digital-first world, a professional website is your business's storefront. It builds credibility, engages customers, and drives conversions. Poor web development can lead to lost opportunities, while exceptional development positions you as an industry leader.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Target className="h-4 w-4 text-primary" /> 70% of consumers judge credibility by design</div>
                      <div className="flex items-center gap-2 text-foreground"><TrendingUp className="h-4 w-4 text-primary" /> Mobile traffic exceeds 50% globally</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground"><Search className="h-4 w-4 text-primary" /> SEO drives 53% of website traffic</div>
                      <div className="flex items-center gap-2 text-foreground"><Zap className="h-4 w-4 text-primary" /> Fast sites convert 32% better</div>
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
              Key Features
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Comprehensive web solutions tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Code, title: "Custom Website Development", desc: "Tailored solutions from scratch using modern frameworks and technologies for unique business requirements." },
              { icon: Layout, title: "CMS Integration", desc: "Seamless integration with WordPress, headless CMS like Strapi, or custom content management for easy updates." },
              { icon: Search, title: "SEO Optimization", desc: "Built-in SEO best practices, fast loading, mobile-first indexing, and schema markup for top search rankings." },
              { icon: Smartphone, title: "Responsive Design", desc: "Pixel-perfect experiences across all devices – desktop, tablet, and mobile – with fluid layouts and adaptive UI." },
              { icon: Zap, title: "Performance Tuning", desc: "Optimized code, image compression, caching strategies, and CDN integration for lightning-fast load times." },
              { icon: Shield, title: "Security & Scalability", desc: "Enterprise-grade security, SSL implementation, and scalable architecture to handle growth and traffic spikes." }
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
              Our Development Process
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              A structured approach ensuring quality, efficiency, and client satisfaction at every step
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-12">
            {[
              { icon: Lightbulb, title: "Requirement Gathering", desc: "We collaborate closely to understand your vision, goals, target audience, and technical needs to create a solid foundation.", step: 1 },
              { icon: Code2, title: "Design & Prototyping", desc: "Our designers create wireframes, mockups, and interactive prototypes for your approval before development begins.", step: 2 },
              { icon: TestTube2, title: "Development", desc: "Agile development with clean code practices, version control, and regular progress updates to ensure alignment.", step: 3 },
              { icon: UploadCloud, title: "Testing & QA", desc: "Comprehensive testing including functionality, performance, security, and cross-browser compatibility to deliver flawless results.", step: 4 },
              { icon: TrendingUp, title: "Deployment & Launch", desc: "Smooth deployment to production servers with monitoring, training, and post-launch support for seamless go-live.", step: 5 }
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
              Our Web Development Portfolio
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Real results from real projects – see how we've helped businesses thrive online
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
              Web Development Insights
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Stay ahead with our latest articles and trends in web technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Top 10 Web Development Trends for 2024", excerpt: "Explore emerging technologies like AI integration, WebAssembly, and progressive web apps shaping the future.", date: "March 15, 2024" },
              { title: "How to Choose the Right Tech Stack", excerpt: "A comprehensive guide to selecting frameworks, languages, and tools that align with your business goals.", date: "March 12, 2024" },
              { title: "Custom vs Template Website: What's Better?", excerpt: "We break down the pros and cons to help you decide the best approach for your online presence.", date: "March 10, 2024" }
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
                Our Web Development Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Code, number: "100+", label: "Ready Workflow with AI" },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Your Digital Presence?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Let's create a stunning, high-performing website that drives business growth.</p>
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
        title="Web Development Inquiry"
        serviceType="Web Development"
      />
    </div>
  );
};

export default WebDevelopment;