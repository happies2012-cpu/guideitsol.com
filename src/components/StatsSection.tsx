"use client";

import { Users, Award, TrendingUp, Globe } from "lucide-react";
import teamMeeting from "@/assets/team-meeting.jpg";
import SmartImage from "@/components/ui/SmartImage";
import { motion, Easing } from "framer-motion";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { 
  Users as UsersIcon, 
  Award as AwardIcon, 
  TrendingUp as TrendingUpIcon, 
  Globe as GlobeIcon,
  Rocket,
  Target,
  Zap,
  Star
} from "lucide-react";

const StatsSection = () => {
  const stats = [
    { icon: Users, number: "256+", label: "AI Workflows " },
    { icon: Award, number: "15+", label: "Years Experience" },
    { icon: TrendingUp, number: "98%", label: "Success Rate" },
    { icon: Globe, number: "25+", label: "Countries" }
  ];

  const features = [
    {
      Icon: UsersIcon,
      name: "Global Clients",
      description: "Serving businesses across 25+ countries worldwide with tailored AI solutions.",
      href: "/about",
      cta: "Learn more",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30" />
      ),
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    },
    {
      Icon: AwardIcon,
      name: "Industry Recognition",
      description: "15+ years of excellence and innovation in AI-powered business solutions.",
      href: "/about",
      cta: "Our story",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30" />
      ),
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: TrendingUpIcon,
      name: "Success Rate",
      description: "98% client satisfaction rate with measurable business impact.",
      href: "/results",
      cta: "View case studies",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30" />
      ),
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: Rocket,
      name: "AI Workflows",
      description: "256+ custom AI workflows deployed for businesses transformation.",
      href: "/services",
      cta: "Explore services",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-fuchsia-100 dark:from-purple-900/30 dark:to-fuchsia-900/30" />
      ),
      className: "lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: Target,
      name: "Precision Solutions",
      description: "Targeted AI implementations with 95% accuracy in predictive models.",
      href: "/technology",
      cta: "Our approach",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30" />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: Zap,
      name: "Efficiency Boost",
      description: "Average 40% increase in operational efficiency for our clients.",
      href: "/results",
      cta: "See results",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/30" />
      ),
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: Star,
      name: "Client Retention",
      description: "95% client retention rate with long-term partnerships.",
      href: "/testimonials",
      cta: "Read testimonials",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30" />
      ),
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" as Easing } },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as Easing } },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as Easing } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <motion.div variants={imageVariants} className="relative">
            <div className="relative rounded-lg shadow-xl w-full h-96 object-cover overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20">
              <SmartImage
                src={teamMeeting}
                alt="Professional team meeting"
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end text-primary-foreground p-6 rounded-lg shadow-lg border border-primary/30 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold">256+</div>
                <div className="text-sm">AI Workflows </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={contentVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
              Guidesoft Business Solutions
              <br />
              <span className="text-primary">256+ AI Workflows </span>
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Our experienced team of consultants provides business solutions with AI employee view capabilities that have helped businesses across the globe achieve their goals through strategic planning and innovative digital transformation.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div key={index} variants={statItemVariants} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 backdrop-blur-sm">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bento Grid Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Guidesoft Global Impact</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how Guidesoft has transformed businesses worldwide with cutting-edge AI solutions and business solutions
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </motion.section>
  );
};

export default StatsSection;