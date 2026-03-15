"use client";

import React from 'react';
// SmartImage available for future use in case icons/images get added here
// import SmartImage from '@/components/ui/SmartImage'
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { icon: Phone, href: "tel:+918500647979", label: "Call Us" },
  { icon: MessageCircle, href: "https://wa.me/918500647979", label: "WhatsApp" },
  { icon: Facebook, href: "https://www.facebook.com/p/GuidesoftI-100089990527060/", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/GuidesoftIt", label: "Twitter" },
  { icon: Linkedin, href: "https://in.linkedin.com/company/guideitsol-it-solutions-trainings", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/gs_business_groups/", label: "Instagram" },
];

const VerticalSocialDock = () => {
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.5, // Delay appearance after page load
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-3 p-2 rounded-full bg-background/40 backdrop-blur-xl border border-primary/20 shadow-lg"
    >
      {socialLinks.map((link, index) => (
        <motion.div key={index} variants={itemVariants}>
          <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-300"
            >
              <link.icon className="h-5 w-5" />
            </Button>
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default VerticalSocialDock;
