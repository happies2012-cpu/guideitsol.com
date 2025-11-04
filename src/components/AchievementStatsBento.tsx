"use client";

import {
  Users,
  Award,
  TrendingUp,
  Globe,
  Rocket,
  Target,
  Zap,
  Star,
} from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import teamMeeting from "@/assets/team-meeting.jpg";
import SmartImage from "@/components/ui/SmartImage";

const AchievementStatsBento = () => {
  const features = [
    {
      Icon: Users,
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
      Icon: Award,
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
      Icon: TrendingUp,
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

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            Our Global Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover how we've transformed businesses worldwide with cutting-edge AI solutions
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default AchievementStatsBento;