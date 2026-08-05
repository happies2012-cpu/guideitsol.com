"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero/HeroSection";
import { BackgroundSliderCarousel } from "@/components/sliders/BackgroundSliderCarousel";
import HeroNew from "@/components/HeroNew";
import AIToolsSection from "@/components/AIToolsSection";
import SkillsSection from "@/components/SkillsSection";
import TrainingsSection from "@/components/TrainingsSection";
import ProjectsSection from "@/components/ProjectsSection";
import { useAnimations } from "@/hooks/useAnimations";
import PageTransition from "@/components/ui/page-transition";
import { 
  Zap, 
  Shield, 
  Users, 
  Headphones, 
  CheckCircle, 
  ArrowRight,
  Star,
  Quote
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { staggerContainer, staggerItem } = useAnimations();

  return (
    <PageTransition animationType="slide">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Premium AI SaaS Hero */}
        <HeroSection />

        {/* 8 Animated Background Sliders */}
        <BackgroundSliderCarousel />

        {/* New Modern Hero */}
        <motion.div variants={staggerItem}>
          <HeroNew />
        </motion.div>

        {/* AI Tools Section */}
        <motion.div variants={staggerItem}>
          <AIToolsSection />
        </motion.div>

        {/* Skills Section */}
        <motion.div variants={staggerItem}>
          <SkillsSection />
        </motion.div>

        {/* Trainings Section */}
        <motion.div variants={staggerItem}>
          <TrainingsSection />
        </motion.div>

        {/* Projects Section */}
        <motion.div variants={staggerItem}>
          <ProjectsSection />
        </motion.div>

        {/* Why Choose Us */}
        <section className="section-padding bg-muted/30">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="badge-primary inline-flex mb-4"
              >
                <CheckCircle className="w-3 h-3 mr-2" />
                Why Choose Us
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                The <span className="gradient-text">GS Advantage</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We're not just developers – we're partners in your success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Delivered projects on time, every time. Our efficient workflows mean faster time-to-market."
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-grade security for your data. SOC2 compliant with end-to-end encryption."
                },
                {
                  icon: Users,
                  title: "Dedicated Team",
                  description: "Work with senior developers who own your project from concept to deployment."
                },
                {
                  icon: Headphones,
                  title: "24/7 Support",
                  description: "Round-the-clock support and maintenance. We're here when you need us."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-elevated p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="badge-primary inline-flex mb-4"
              >
                <Quote className="w-3 h-3 mr-2" />
                Testimonials
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                What Our <span className="gradient-text">Clients Say</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CTO, TechStartup",
                  content: "GS Intelligence transformed our workflow. The AI tools saved us 40% development time.",
                  rating: 5
                },
                {
                  name: "Michael Chen",
                  role: "Founder, E-Commerce Plus",
                  content: "Best investment we made. The team's expertise in React and AI is unmatched.",
                  rating: 5
                },
                {
                  name: "Emily Davis",
                  role: "VP Engineering, ScaleUp",
                  content: "Professional, responsive, and technically excellent. They delivered beyond expectations.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-elevated p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-muted/30">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Ready to <span className="gradient-text">Get Started?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of businesses already using our AI tools and services to transform their operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="btn-primary">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/ai-tools">
                  <Button size="lg" variant="outline" className="btn-outline">
                    Explore AI Tools
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </PageTransition>
  );
};

export default Home;
