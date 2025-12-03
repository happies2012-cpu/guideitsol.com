"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, Easing } from 'framer-motion';
import { mainNavigation, NavItem } from '@/lib/navigation-data';
import PageHero from '@/components/ui/PageHero';
import EnhancedPageTemplate from '@/components/ui/EnhancedPageTemplate';
import { getHeroImage } from '@/lib/image-utils';

// Helper function to find a NavItem by its href
const findNavItemByHref = (href: string, navItems: NavItem[]): NavItem | undefined => {
  for (const item of navItems) {
    if (item.href === href) {
      return item;
    }
    if (item.children) {
      const found = findNavItemByHref(href, item.children);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};

const DynamicContentPage = () => {
  const { '*': path } = useParams<{ '*': string }>(); // Catch-all parameter for the dynamic path
  const currentPath = `/${path}`;
  const [pageTitle, setPageTitle] = useState("Loading...");
  const [pageDescription, setPageDescription] = useState("Please wait while we load your content.");

  useEffect(() => {
    const navItem = findNavItemByHref(currentPath, mainNavigation);
    if (navItem) {
      setPageTitle(navItem.title);
      setPageDescription(`Discover Guidesoft's comprehensive ${navItem.title} solutions. We provide cutting-edge IT services tailored to your business needs.`);
    } else {
      // Extract title from URL path
      const pathSegments = path?.split('/').filter(Boolean) || [];
      const lastSegment = pathSegments[pathSegments.length - 1] || '';
      const formattedTitle = lastSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      setPageTitle(formattedTitle || "Our Services");
      setPageDescription(`Explore Guidesoft's ${formattedTitle} solutions. We deliver innovative IT services to help your business grow.`);
    }
  }, [currentPath, path]);

  const related = useMemo(() => {
    const siblings: { title: string; href: string }[] = [];
    const findParent = (href: string, items: NavItem[]): NavItem | undefined => {
      for (const it of items) {
        if (it.children?.some((c) => c.href === href)) return it;
        if (it.children) {
          const res = findParent(href, it.children);
          if (res) return res;
        }
      }
      return undefined;
    };
    const parent = findParent(currentPath, mainNavigation);
    if (parent?.children) {
      for (const c of parent.children) {
        if (c.href && c.href !== currentPath) siblings.push({ title: c.title, href: c.href });
      }
    }
    return siblings.slice(0, 8);
  }, [currentPath]);

  // Get the appropriate hero image based on the page title
  const backgroundImage = useMemo(() => {
    // Convert page title to lowercase and replace spaces with hyphens
    const pageType = pageTitle.toLowerCase().replace(/\s+/g, '-');
    return getHeroImage(pageType);
  }, [pageTitle]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };

  // Generate unique content based on page title
  const getPageContent = () => {
    // Convert title to lowercase for matching
    const lowerTitle = pageTitle.toLowerCase();
    
    // Technology section content
    let technologies = [
      "Custom Development",
      "API Integration",
      "Scalable Architecture",
      "Cloud Solutions"
    ];
    
    // Tech stack based on page type
    let techStack = [
      "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes"
    ];
    
    // Projects section content
    let projects = [
      {
        title: "Enterprise Platform",
        description: "A comprehensive solution for enterprise resource planning and management.",
        metrics: {
          users: "50K+",
          uptime: "99.9%",
          performance: "A+",
          roi: "250%"
        },
        technologies: ["React", "Node.js", "MongoDB", "AWS"]
      },
      {
        title: "Mobile Application",
        description: "A cross-platform mobile application for customer engagement and service delivery.",
        metrics: {
          users: "100K+",
          uptime: "99.95%",
          performance: "A++",
          roi: "300%"
        },
        technologies: ["React Native", "Firebase", "GraphQL", "AWS"]
      }
    ];
    
    // Blog posts section content
    let blogPosts = [
      {
        title: "The Future of Web Development with Guidesoft",
        excerpt: "Exploring the latest trends and technologies shaping the future of web development with Guidesoft's innovative solutions.",
        date: "Nov 15, 2025",
        readTime: "5 min read"
      },
      {
        title: "Cloud Migration Best Practices",
        excerpt: "Key strategies and considerations for successful cloud migration projects with Guidesoft's expertise.",
        date: "Nov 10, 2025",
        readTime: "8 min read"
      },
      {
        title: "Building Scalable Applications",
        excerpt: "Architectural patterns and practices for building highly scalable applications with Guidesoft's proven methodologies.",
        date: "Nov 5, 2025",
        readTime: "6 min read"
      }
    ];
    
    // Category based on page type
    let category = "Guidesoft Solutions";
    
    // Customize content based on page title
    if (lowerTitle.includes('hire') || lowerTitle.includes('developer')) {
      technologies = [
        "Dedicated Developers",
        "Remote Teams",
        "Agile Methodology",
        "Code Quality Assurance"
      ];
      
      techStack = [
        "React", "Angular", "Vue.js", "Node.js", "Python", "Java"
      ];
      
      projects = [
        {
          title: "Development Team Augmentation",
          description: "Providing skilled developers to augment an enterprise development team.",
          metrics: {
            users: "20+",
            uptime: "100%",
            performance: "A+",
            roi: "150%"
          },
          technologies: ["React", "Node.js", "PostgreSQL", "Docker"]
        },
        {
          title: "Full Project Development",
          description: "End-to-end development of a custom enterprise application.",
          metrics: {
            users: "50+",
            uptime: "99.9%",
            performance: "A++",
            roi: "200%"
          },
          technologies: ["Angular", "Java", "MySQL", "AWS"]
        }
      ];
      
      category = "Guidesoft Hiring Solutions";
    } else if (lowerTitle.includes('travel')) {
      technologies = [
        "Booking Systems",
        "Payment Integration",
        "Real-time Availability",
        "Multi-language Support"
      ];
      
      techStack = [
        "React", "Node.js", "MongoDB", "Stripe", "Twilio", "AWS"
      ];
      
      projects = [
        {
          title: "Hotel Booking Platform",
          description: "A comprehensive hotel booking platform with real-time availability and pricing.",
          metrics: {
            users: "1M+",
            uptime: "99.95%",
            performance: "A++",
            roi: "350%"
          },
          technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"]
        },
        {
          title: "Flight Reservation System",
          description: "A flight reservation system with complex pricing and availability logic.",
          metrics: {
            users: "500K+",
            uptime: "99.9%",
            performance: "A+",
            roi: "300%"
          },
          technologies: ["Vue.js", "Python", "PostgreSQL", "Celery", "AWS"]
        }
      ];
      
      category = "Guidesoft Travel Solutions";
    } else if (lowerTitle.includes('ai') || lowerTitle.includes('machine learning')) {
      technologies = [
        "Machine Learning Models",
        "Natural Language Processing",
        "Computer Vision",
        "Predictive Analytics"
      ];
      
      techStack = [
        "Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "AWS SageMaker"
      ];
      
      projects = [
        {
          title: "Predictive Maintenance System",
          description: "An AI-powered system for predicting equipment failures before they occur.",
          metrics: {
            users: "100+",
            uptime: "99.9%",
            performance: "A++",
            roi: "400%"
          },
          technologies: ["Python", "TensorFlow", "Kafka", "AWS", "Docker"]
        },
        {
          title: "Customer Sentiment Analysis",
          description: "Real-time analysis of customer sentiment from multiple data sources.",
          metrics: {
            users: "50+",
            uptime: "99.95%",
            performance: "A+",
            roi: "350%"
          },
          technologies: ["Python", "PyTorch", "Elasticsearch", "Kafka", "AWS"]
        }
      ];
      
      category = "Guidesoft AI Solutions";
    } else if (lowerTitle.includes('ecommerce') || lowerTitle.includes('shop')) {
      technologies = [
        "Shopping Cart Systems",
        "Payment Processing",
        "Inventory Management",
        "Order Fulfillment"
      ];
      
      techStack = [
        "React", "Node.js", "MongoDB", "Stripe", "Shopify", "AWS"
      ];
      
      projects = [
        {
          title: "Multi-vendor Marketplace",
          description: "A comprehensive marketplace platform for multiple vendors to sell their products.",
          metrics: {
            users: "2M+",
            uptime: "99.95%",
            performance: "A++",
            roi: "300%"
          },
          technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"]
        },
        {
          title: "Inventory Management System",
          description: "A real-time inventory management system for retail chains.",
          metrics: {
            users: "500+",
            uptime: "99.9%",
            performance: "A+",
            roi: "250%"
          },
          technologies: ["Angular", "Java", "PostgreSQL", "Redis", "AWS"]
        }
      ];
      
      category = "Guidesoft E-commerce Solutions";
    }
    
    return {
      technologies,
      techStack,
      projects,
      blogPosts,
      category
    };
  };

  const pageContent = getPageContent();

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <EnhancedPageTemplate
        title={pageTitle}
        description={pageDescription}
        category={pageContent.category}
        technologies={pageContent.technologies}
        techStack={pageContent.techStack}
        projects={pageContent.projects}
        blogPosts={pageContent.blogPosts}
        backgroundImage={backgroundImage}
      />
    </motion.div>
  );
};

export default DynamicContentPage;