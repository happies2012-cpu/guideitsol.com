"use client";

import { Calculator, TrendingUp, Target, PieChart, BarChart3, Users, ArrowRight, Sparkles, Lightbulb, ShieldCheck, Rocket, Workflow, Code, Settings, CheckCircle, Smartphone, Globe, Database, Cloud, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { getHeroImage } from "@/lib/image-utils";
import PageHero from "@/components/ui/PageHero";
import { useState } from "react";
import LightboxForm from "@/components/ui/LightboxForm";
import PageTransition from "@/components/ui/page-transition";

const Services = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const services = [
    {
      icon: Code,
      title: "Custom Software Development",
      description: "Bespoke software solutions tailored to your unique business requirements with cutting-edge technologies and best practices.",
      features: ["Full-Stack Development", "Scalable Architecture", "API Integration", "Quality Assurance"],
      href: "/services/web-development"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Engaging native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
      features: ["Native iOS/Android", "Cross-Platform Solutions", "UI/UX Design", "App Store Optimization"],
      href: "/services/app-development"
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with the latest frameworks for optimal performance and user engagement.",
      features: ["Responsive Design", "CMS Integration", "E-commerce Solutions", "SEO Optimization"],
      href: "/services/web-development"
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Robust data infrastructure and analytics solutions to transform your data into actionable business insights.",
      features: ["Data Pipeline Development", "Data Warehousing", "ETL Processes", "Real-time Analytics"],
      href: "/services/data-engineering"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Secure and scalable cloud infrastructure management with migration, optimization, and monitoring services.",
      features: ["Cloud Migration", "Infrastructure as Code", "DevOps Automation", "Security Compliance"],
      href: "/solutions/emerging-tech-solutions"
    },
    {
      icon: Zap,
      title: "AI & Automation",
      description: "Intelligent automation solutions leveraging machine learning and AI to streamline operations and boost productivity.",
      features: ["Process Automation", "Machine Learning Models", "Predictive Analytics", "Chatbot Development"],
      href: "/ai-learning"
    }
  ];

  const whyChooseUs = [
    {
      icon: Lightbulb,
      title: "Innovative Solutions",
      description: "We leverage cutting-edge technologies and methodologies to deliver forward-thinking solutions that drive real business value."
    },
    {
      icon: ShieldCheck,
      title: "Proven Expertise",
      description: "Our team comprises industry veterans and certified experts with a track record of successful project delivery across various domains."
    },
    {
      icon: Users,
      title: "Client-Centric Approach",
      description: "Your success is our priority. We work closely with you to understand your needs and deliver tailored strategies that align with your goals."
    },
    {
      icon: Rocket,
      title: "Measurable Results",
      description: "We focus on outcomes, ensuring our solutions provide tangible benefits and a strong return on investment with clear KPIs."
    }
  ];

  const developmentProcess = [
    {
      step: 1,
      icon: Workflow,
      title: "Discovery & Strategy",
      description: "We begin by understanding your business goals, challenges, and requirements to define a clear project strategy and roadmap."
    },
    {
      step: 2,
      icon: Code,
      title: "Design & Development",
      description: "Our experts create intuitive designs and develop robust solutions using modern technologies and best practices."
    },
    {
      step: 3,
      icon: Settings,
      title: "Testing & QA",
      description: "Comprehensive testing ensures your solution is secure, performant, and meets all requirements before deployment."
    },
    {
      step: 4,
      icon: CheckCircle,
      title: "Deployment & Support",
      description: "We deploy your solution and provide ongoing support, maintenance, and optimization for sustained success."
    }
  ];

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
    <PageTransition animationType="slide">
      <div className="relative min-h-screen">
        {/* Animated Mesh Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-gradient-primary-start/5 via-gradient-primary-end/5 to-cyan-500/5 pointer-events-none" />
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iaHNsKHZhcigtLWdyYWRpZW50LXByaW1hcnktc3RhcnQpLzAuMSkiIC8+PC9nPjwvc3ZnPg==')] opacity-20" />

        {/* Hero Section with unique background */}
        <PageHero
          title="Our Services"
          subtitle="End-to-end technology solutions designed to accelerate your business growth and drive digital transformation"
          ctaText="Start a Project"
          pageType="services"
        />

        {/* Services Grid */}
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
                Our Technology Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive solutions to meet all your business technology needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="group relative overflow-hidden backdrop-blur-xl bg-background/40 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--gradient-primary-start)/0.5)] h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/5 via-gradient-primary-end/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                      <CardContent className="p-8 relative z-10 h-full flex flex-col">
                        <div className="relative w-16 h-16 mb-6">
                          <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start to-gradient-primary-end rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                          <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-gradient-primary-end/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                        <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                        
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <Link to={service.href}>
                          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary border-primary/20 backdrop-blur-sm transition-all">
                            Explore More
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Why Choose Our Services Section */}
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
                Why Choose Our Services?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Partner with us for unparalleled expertise and innovative solutions that drive real business value
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all duration-300 group h-full">
                      <CardContent className="p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-primary/10 group-hover:bg-primary-foreground/20 transition-colors border border-primary/20 group-hover:border-primary-foreground/30">
                          <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{advantage.title}</h3>
                        <p className="text-muted-foreground group-hover:text-primary-foreground/90 leading-relaxed">
                          {advantage.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Our Development Process Section */}
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
                Our Development Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A streamlined approach to delivering intelligent and impactful technology solutions
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block" />
              
              <div className="space-y-12">
                {developmentProcess.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover="hover"
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col md:flex-row items-center md:justify-between relative"
                    >
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} text-center`}>
                        <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all duration-300 group h-full">
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="absolute md:static w-12 h-12 rounded-full bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end flex items-center justify-center text-primary-foreground shadow-lg border-2 border-background z-10 -mt-6 md:mt-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} hidden md:block`}>
                        {/* Empty div for spacing on one side */}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Join thousands of businesses leveraging our technology solutions to drive growth and innovation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="px-8 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity shadow-lg"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  Start Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm text-white border-white"
                >
                  View Our Portfolio
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Lightbox Form */}
        <LightboxForm 
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          title="Services Inquiry"
          serviceType="services"
        />
      </div>
    </PageTransition>
  );
};

export default Services;