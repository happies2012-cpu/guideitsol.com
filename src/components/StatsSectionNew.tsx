"use client";

import { Users, Award, TrendingUp, Globe } from "lucide-react";
import teamMeeting from "@/assets/team-meeting.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import praveen from "@/assets/praveen.png";
import { motion, Easing } from "framer-motion"; // Import motion and Easing
import { OffersCarousel, CarouselItem } from "@/components/ui/offers-carousel";

const StatsSection = () => {
  const achievements: CarouselItem[] = [
    {
      id: 1,
      imageUrl: teamMeeting,
      title: "AI Workflows ",
      subtitle: "Serving clients worldwide with innovative solutions",
      rating: 5,
      price: 256,
      unit: "+",
    },
    {
      id: 2,
      imageUrl: praveen,
      title: "Years Experience",
      subtitle: "Over a decade of delivering excellence",
      rating: 4.9,
      price: 15,
      unit: "+",
    },
    {
      id: 3,
      imageUrl: heroBg,
      title: "Success Rate",
      subtitle: "Proven track record of successful projects",
      rating: 4.8,
      price: 98,
      unit: "%",
    },
    {
      id: 4,
      imageUrl: teamMeeting,
      title: "Countries",
      subtitle: "Global presence across multiple continents",
      rating: 4.7,
      price: 25,
      unit: "+",
    },
    {
      id: 5,
      imageUrl: praveen,
      title: "AI Workflows",
      subtitle: "Advanced AI models and workflows integrated",
      rating: 5,
      price: 500,
      unit: "+",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="py-16 sm:py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            Our Achievements
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Excellence in IT solutions and AI innovation
          </p>
        </div>
        <OffersCarousel
          offerTitle="Our Achievements"
          offerSubtitle="Excellence in IT solutions and AI innovation"
          ctaText="View all achievements"
          onCtaClick={() => alert("Redirecting to all achievements...")}
          items={achievements}
        />
      </div>
    </motion.section>
  );
};

export default StatsSection;