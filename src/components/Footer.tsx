import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import guideSoftLogo from "@/assets/guideitsol-logo.png";
import { Button } from "@/components/ui/button";
import { motion, Easing } from "framer-motion";
import { mainNavigation } from "@/lib/navigation-data"; // Import mainNavigation
import ScrollAnimation from "@/components/ui/scroll-animation";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as Easing } },
  };

  const linkVariants = {
    hover: { x: 5, color: "hsl(var(--primary))" },
  };

  const socialIconVariants = {
    hover: { scale: 1.2, color: "hsl(var(--primary))" },
  };

  // Stagger animation for footer columns
  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as Easing 
      } 
    },
  };

  // Extracting categories from mainNavigation for comprehensive footer links
  const servicesCategory = mainNavigation.find(nav => nav.title === "Services");
  const solutionsCategory = mainNavigation.find(nav => nav.title === "Solutions");
  const travelCategory = mainNavigation.find(nav => nav.title === "Travel");
  const hireUsCategory = mainNavigation.find(nav => nav.title === "Hire Us");
  const companyCategory = mainNavigation.find(nav => nav.title === "Company");
  
  // Get popular services (first category from each major service area)
  const servicesLinks = [
    ...(servicesCategory?.children?.[0]?.children?.slice(0, 4) || []),
    ...(servicesCategory?.children?.[1]?.children?.slice(0, 2) || []),
  ];
  
  // Get popular solutions
  const solutionsLinks = [
    ...(solutionsCategory?.children?.[0]?.children?.slice(0, 3) || []),
    ...(solutionsCategory?.children?.[1]?.children?.slice(0, 3) || []),
  ];
  
  // Get travel links
  const travelLinks = [
    ...(travelCategory?.children?.[0]?.children?.slice(0, 3) || []),
    ...(travelCategory?.children?.[1]?.children?.slice(0, 3) || []),
  ];
  
  // Get hire us links
  const hireLinks = [
    ...(hireUsCategory?.children?.[0]?.children?.slice(0, 3) || []),
    ...(hireUsCategory?.children?.[1]?.children?.slice(0, 3) || []),
  ];
  
  const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/pages' },
    { title: 'All Services', href: '/services' },
    { title: 'Solutions', href: '/solutions' },
    { title: 'Travel Tech', href: '/travel' },
    { title: 'Hire Developers', href: '/hire-us' },
    { title: 'Portfolio', href: '/portfolio' },
    { title: 'Blog', href: '/blog' },
    { title: 'AI Learning', href: '/ai-learning' },
    { title: 'Contact Us', href: '/contact' },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
      className="bg-dark-background text-background relative overflow-hidden"
    >
      {/* Subtle background gradient for glossy effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-background/90 to-dark-background/95 opacity-80 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iaHNsKDIzOSA4NCUgNjclICAtIDAuMTUpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <ScrollAnimation 
            className="space-y-4 lg:col-span-2"
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <motion.img 
                src={guideSoftLogo} 
                alt="Guidesoft"
                className="w-10 h-10 rounded-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <motion.span 
                className="text-xl font-bold text-foreground"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Guidesoft
              </motion.span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Guidesoft is a leading IT solutions provider delivering innovative technology services, software development, and digital transformation solutions for modern businesses.
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a 
                href="#" 
                whileHover="hover" 
                variants={socialIconVariants} 
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover="hover" 
                variants={socialIconVariants} 
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover="hover" 
                variants={socialIconVariants} 
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover="hover" 
                variants={socialIconVariants} 
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
            </div>
          </ScrollAnimation>

          {/* Quick Links */}
          <ScrollAnimation 
            className="space-y-4"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={link.title}>
                  <motion.div 
                    whileHover="hover" 
                    variants={linkVariants} 
                    className="inline-block"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link to={link.href || "#"} className="text-muted-foreground transition-colors text-sm hover:text-primary">
                      {link.title}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </ScrollAnimation>

          {/* Popular Services */}
          <ScrollAnimation 
            className="space-y-4"
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold text-lg text-foreground">Popular Services</h3>
            <ul className="space-y-2">
              {servicesLinks.map((service, index) => (
                <li key={service.title}>
                  <motion.div 
                    whileHover="hover" 
                    variants={linkVariants} 
                    className="inline-block"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link to={service.href || "#"} className="text-muted-foreground transition-colors text-sm hover:text-primary">
                      {service.title}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </ScrollAnimation>

          {/* Solutions & Travel */}
          <ScrollAnimation 
            className="space-y-4"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="font-semibold text-lg text-foreground">Solutions</h3>
            <ul className="space-y-2">
              {solutionsLinks.slice(0, 5).map((solution, index) => (
                <li key={solution.title}>
                  <motion.div 
                    whileHover="hover" 
                    variants={linkVariants} 
                    className="inline-block"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link to={solution.href || "#"} className="text-muted-foreground transition-colors text-sm hover:text-primary">
                      {solution.title}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-lg text-foreground mt-6">Travel Tech</h3>
            <ul className="space-y-2">
              {travelLinks.slice(0, 3).map((travel, index) => (
                <li key={travel.title}>
                  <motion.div 
                    whileHover="hover" 
                    variants={linkVariants} 
                    className="inline-block"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link to={travel.href || "#"} className="text-muted-foreground transition-colors text-sm hover:text-primary">
                      {travel.title}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </ScrollAnimation>

          {/* Contact Info */}
          <ScrollAnimation 
            className="space-y-4"
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="font-semibold text-lg text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <motion.div 
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  123 Tech Park, IT Hub,<br />
                  Hyderabad, Telangana, INDIA
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+918500647979</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">support@guideitsol.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">contact@guideitsol.com</span>
              </motion.div>
            </div>
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="default" className="w-full mt-6 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity shadow-lg text-sm">
                  Get a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </ScrollAnimation>
        </div>

        {/* Bottom Bar */}
        <ScrollAnimation 
          className="border-t border-primary/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left relative z-10"
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © 2025 Guidesoft. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-primary" />
                <span>123 Tech Park, IT Hub, Hyderabad, Telangana, INDIA</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1 text-primary" />
                <span>+918500647979</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </motion.footer>
  );
};

export default Footer;