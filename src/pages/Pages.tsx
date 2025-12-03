"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Target, TrendingUp, CheckCircle, ArrowRight, Sparkles, Brain, Zap, Rocket, Code, Smartphone, Globe, Database, Cloud, Lightbulb } from "lucide-react";
import teamMeeting from "@/assets/team-meeting.jpg";
import { motion, Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { generateAvatarUrl, getHeroImage } from "@/lib/image-utils";

const Pages = () => {
  const values = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "Pioneering cutting-edge solutions with emerging technologies to solve complex business challenges.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Client Success",
      description: "Your success is our success. We're committed to delivering measurable results that drive your business forward.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Agile Excellence",
      description: "Delivering high-quality solutions quickly through iterative development and continuous improvement.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Rocket,
      title: "Growth Mindset",
      description: "Constantly evolving and adapting to new technologies and market demands to stay ahead of the curve.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const milestones = [
    { 
      year: "2018", 
      title: "Company Foundation", 
      description: "Launched with vision to democratize technology for business transformation",
      icon: Brain
    },
    { 
      year: "2019", 
      title: "100 Projects", 
      description: "Delivered innovative technology solutions across diverse industries",
      icon: TrendingUp
    },
    { 
      year: "2021", 
      title: "Global Expansion", 
      description: "Extended services to clients in 25+ countries worldwide",
      icon: Target
    },
    { 
      year: "2023", 
      title: "AI Leadership", 
      description: "Recognized as top innovator in artificial intelligence solutions",
      icon: Zap
    },
    { 
      year: "2024", 
      title: "500+ Projects", 
      description: "Milestone achievement in delivering transformative technology solutions",
      icon: Award
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      image: generateAvatarUrl("Dr. Sarah Chen", "3B82F6"),
      expertise: "AI & Machine Learning",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Michael Zhang",
      role: "Head of Engineering",
      image: generateAvatarUrl("Michael Zhang", "8B5CF6"),
      expertise: "Cloud Architecture",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Dr. Lisa Rodriguez",
      role: "Director of Innovation",
      image: generateAvatarUrl("Dr. Lisa Rodriguez", "10B981"),
      expertise: "Data Science",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      name: "David Kumar",
      role: "VP of Client Success",
      image: generateAvatarUrl("David Kumar", "F97316"),
      expertise: "Digital Transformation",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const expertise = [
    {
      icon: Code,
      title: "Custom Software Development",
      description: "Bespoke solutions tailored to your unique business requirements"
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Native and cross-platform apps for iOS and Android"
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive websites and web applications"
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Robust data infrastructure and analytics solutions"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Secure and scalable cloud infrastructure management"
    },
    {
      icon: Lightbulb,
      title: "AI & Automation",
      description: "Intelligent automation solutions leveraging machine learning"
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

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" as Easing } },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as Easing } },
  };

  const milestoneItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as Easing } },
  };

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gradient-primary-start/5 via-gradient-primary-end/5 to-cyan-500/5 pointer-events-none" />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/10 via-gradient-primary-end/10 to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Driving Innovation Forward</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent animate-fade-in">
            About Guidesoft
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Leading the technology revolution with cutting-edge IT solutions that transform businesses and drive sustainable growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="px-8 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity shadow-lg">
              Our Services
            </Button>
            <Button size="lg" variant="outline" className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
              View Portfolio
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={imageVariants} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-gradient-primary-start/20 to-gradient-primary-end/20 rounded-3xl blur-2xl" />
              <img
                src={teamMeeting}
                alt="Innovation Team"
                className="relative rounded-2xl shadow-2xl w-full h-96 object-cover border border-primary/20 backdrop-blur-sm bg-background/20"
              />
            </motion.div>
            
            <motion.div variants={contentVariants}>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
                Our Mission & Vision
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Guidesoft, our mission is to empower businesses with innovative IT solutions that drive digital transformation and sustainable growth. We democratize access to cutting-edge technology, making it accessible to businesses of all sizes.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We envision a future where intelligent systems augment human decision-making, automate repetitive tasks, and unlock exponential growth through data-driven insights and transformative technology for businesses worldwide.
              </p>
              
              <div className="space-y-4">
                {["500+ Projects Delivered", "98% Client Satisfaction", "$1.5B+ Value Created", "25+ Countries Served"].map((item, index) => (
                  <motion.div key={index} variants={milestoneItemVariants} className="flex items-center gap-3 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                      <CheckCircle className="relative h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
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
              Guidesoft Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and shape our IT solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="relative overflow-hidden backdrop-blur-xl bg-background/40 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--gradient-primary-start)/0.5)] group h-full"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <CardContent className="p-8 relative z-10">
                      <div className="relative w-16 h-16 mb-6">
                        <div className={`absolute inset-0 bg-gradient-to-br from-gradient-primary-start to-gradient-primary-end rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity`} />
                        <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-gradient-primary-end/10 rounded-2xl flex items-center justify-center border border-primary/20">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Expertise Section */}
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
              Guidesoft Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive IT solutions to meet all your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gradient-primary-start to-gradient-primary-end flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Company Journey */}
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
              Guidesoft Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Milestones in our journey from startup to IT solutions leader
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div key={index} variants={milestoneItemVariants} transition={{ delay: index * 0.1 }} className="group relative">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start to-gradient-primary-end rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative w-14 h-14 bg-gradient-to-br from-gradient-primary-start to-gradient-primary-end rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-grow p-6 rounded-2xl bg-background/40 backdrop-blur-xl border border-primary/20 group-hover:border-primary/50 transition-all">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-sm font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/30">{milestone.year}</span>
                          <h3 className="text-xl font-semibold text-foreground">{milestone.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Leadership Team */}
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
              Guidesoft Leadership
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              World-class IT experts driving innovation and excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="relative overflow-hidden backdrop-blur-xl bg-background/40 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--gradient-primary-start)/0.5)] group h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <CardContent className="p-6 relative z-10">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-br from-gradient-primary-start to-gradient-primary-end rounded-full blur-xl opacity-50`} />
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="relative w-full h-full object-cover rounded-full border-2 border-primary/30"
                        />
                      ) : (
                        <div className={`relative w-full h-full bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center border-2 border-primary/30`}>
                          <Users className="h-10 w-10 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground text-center">{member.name}</h3>
                    <p className="text-primary font-medium mb-2 text-center">{member.role}</p>
                    <p className="text-sm text-muted-foreground text-center">{member.expertise}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Ready to Transform Your Business with Guidesoft?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Partner with Guidesoft to unlock the full potential of IT solutions for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity shadow-lg">
                Schedule a Consultation
              </Button>
              <Button size="lg" variant="outline" className="px-8 border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
                Explore Our Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Pages;