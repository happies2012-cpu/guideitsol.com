"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react'; // Import MessageCircle for WhatsApp
import { cn } from '@/lib/utils';

interface SocialIconProps {
  icon: React.ElementType;
  href: string;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, href, label }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 shadow-md"
      whileHover={{ scale: 1.1, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  );
};

export const VerticalSocialDock: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/p/GuidesoftI-100089990527060/", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/GuidesoftIt", label: "Twitter" },
    { icon: Linkedin, href: "https://in.linkedin.com/company/guideitsol-it-solutions-trainings", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/gs_business_groups/", label: "Instagram" },
    { icon: MessageCircle, href: "https://wa.me/918500647979?text=Hello%20GuideSoft%20IT%20Solutions!", label: "WhatsApp" }, // WhatsApp link
  ];

  return (
    <motion.div
      className={cn(
        "fixed left-4 top-1/2 -translate-y-1/2 z-40",
        "hidden md:flex flex-col space-y-4 p-2 rounded-full bg-background/40 backdrop-blur-xl border border-primary/20 shadow-lg"
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
    >
      {socialLinks.map((link, index) => (
        <SocialIcon key={index} {...link} />
      ))}
    </motion.div>
  );
};
