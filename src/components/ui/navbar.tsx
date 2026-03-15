"use client"

import * as React from "react"
import { motion } from "framer-motion"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Link } from "react-router-dom";
import guideSoftLogo from "@/assets/guidesoft-logo.png";
import { mainNavigation, NavItem } from "@/lib/navigation-data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faMobileAlt, faPalette, faCloud, faChartLine, faRobot, faGlobe, faUsers, faTachometerAlt, faShoppingCart, faDatabase, faCog, faSearch, faBars, faMessage, faBriefcase, faBullseye, faBook, faVideo, faMicrophone, faCamera, faUserFriends, faShare, faComment, faCircle, faShield, faBolt, faMobile, faMapMarkerAlt, faCogs } from '@fortawesome/free-solid-svg-icons';

// Helper function to get appropriate icons for services
const getIconForService = (title: string): JSX.Element => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("web development") || lowerTitle.includes("software")) return <FontAwesomeIcon icon={faCode} className="size-5 shrink-0" />;
  if (lowerTitle.includes("app development") || lowerTitle.includes("mobile")) return <FontAwesomeIcon icon={faMobileAlt} className="size-5 shrink-0" />;
  if (lowerTitle.includes("ui/ux") || lowerTitle.includes("design")) return <FontAwesomeIcon icon={faPalette} className="size-5 shrink-0" />;
  if (lowerTitle.includes("cloud") || lowerTitle.includes("devops")) return <FontAwesomeIcon icon={faCloud} className="size-5 shrink-0" />;
  if (lowerTitle.includes("data") || lowerTitle.includes("analytics")) return <FontAwesomeIcon icon={faChartLine} className="size-5 shrink-0" />;
  if (lowerTitle.includes("ai") || lowerTitle.includes("machine learning")) return <FontAwesomeIcon icon={faRobot} className="size-5 shrink-0" />;
  if (lowerTitle.includes("travel") || lowerTitle.includes("booking")) return <FontAwesomeIcon icon={faGlobe} className="size-5 shrink-0" />;
  if (lowerTitle.includes("hire") || lowerTitle.includes("developer")) return <FontAwesomeIcon icon={faUsers} className="size-5 shrink-0" />;
  if (lowerTitle.includes("enterprise")) return <FontAwesomeIcon icon={faTachometerAlt} className="size-5 shrink-0" />;
  if (lowerTitle.includes("ecommerce") || lowerTitle.includes("shopping")) return <FontAwesomeIcon icon={faShoppingCart} className="size-5 shrink-0" />;
  if (lowerTitle.includes("database")) return <FontAwesomeIcon icon={faDatabase} className="size-5 shrink-0" />;
  if (lowerTitle.includes("consulting")) return <FontAwesomeIcon icon={faCog} className="size-5 shrink-0" />;
  return <FontAwesomeIcon icon={faCode} className="size-5 shrink-0" />; // Default icon
};

// Helper function to generate descriptions for services
const getDescriptionForService = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("web development")) return "Custom websites and web applications built with modern technologies";
  if (lowerTitle.includes("app development")) return "Native and cross-platform mobile applications";
  if (lowerTitle.includes("ui/ux")) return "User-centered design for exceptional digital experiences";
  if (lowerTitle.includes("software development")) return "Custom software solutions tailored to your business needs";
  if (lowerTitle.includes("ecommerce")) return "Complete online store solutions with payment integration";
  if (lowerTitle.includes("full stack")) return "End-to-end development from frontend to backend";
  if (lowerTitle.includes("data engineering")) return "Scalable data pipelines and processing solutions";
  if (lowerTitle.includes("travel")) return "Comprehensive travel technology solutions";
  if (lowerTitle.includes("android")) return "Native Android applications with modern frameworks";
  if (lowerTitle.includes("ios")) return "Native iOS applications with Swift and Objective-C";
  if (lowerTitle.includes("hire")) return "Skilled developers for your project requirements";
  if (lowerTitle.includes("consulting")) return "Expert guidance for your technology decisions";
  return `Professional ${title.toLowerCase()} services for your business`;
};

interface MenuItem {
  title: string;
  url?: string;
  href?: string;
  description?: string;
  icon?: JSX.Element;
  items?: MenuItem[];
  children?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

export default function Navbar({
  logo = {
    url: "/",
    src: guideSoftLogo,
    alt: "Guidesoft logo",
    title: "Guidesoft",
  },

  menu,

  mobileExtraLinks = [
    { name: "About Us", url: "/pages" },
    { name: "Contact", url: "/contact" },
    { name: "Careers", url: "/careers" },
    { name: "Support", url: "/support" },
  ],

  auth = {
    login: { text: "Sign in", url: "/login" },
    signup: { text: "Get Started", url: "/register" },
  },
}: NavbarProps) {
  const [openSearch, setOpenSearch] = React.useState(false);

  // Transform mainNavigation data to our menu format
  const navigationMenu = mainNavigation.map((item) => ({
    title: item.title,
    url: item.href || "#",
    items: item.children?.map((child) => ({
      title: child.title,
      url: child.href || "#",
      description: getDescriptionForService(child.title),
      icon: getIconForService(child.title),
      items: child.children?.map((subChild) => ({
        title: subChild.title,
        url: subChild.href || "#",
        description: getDescriptionForService(subChild.title),
        icon: getIconForService(subChild.title),
      })),
    })),
  }));

  return (
    <section className="py-4 bg-background/80 backdrop-blur-xl border-b border-primary/20 sticky top-0 z-50 shadow-lg" style={{ zIndex: 9999 }}>
      <div className="container mx-auto px-4">
        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8 h-8 rounded-lg" alt={logo.alt} />
              <span className="text-xl font-bold text-foreground">{logo.title}.</span>
            </Link>
          </div>

          {/* Center: Navigation Menu */}
          <div className="flex items-center justify-center flex-1">
            <NavigationMenu className="[&_[data-radix-navigation-menu-viewport]]:rounded-2xl [&_[data-radix-navigation-menu-viewport]]:border-white/10 [&_[data-radix-navigation-menu-viewport]]:bg-black">
              <NavigationMenuList className="rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/10">
                {navigationMenu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenSearch(true)}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faSearch} className="size-5" />
            </Button>

            {/* WhatsApp Button */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <a
                href="https://wa.me/918500647979"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
              >
                <FontAwesomeIcon icon={faMessage} className="size-5" />
              </a>
            </Button>

            {/* Auth Buttons */}
            <Button asChild variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
              <Link to={auth.login.url}>{auth.login.text}</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
              <Link to={auth.signup.url}>{auth.signup.text}</Link>
            </Button>
            
            {/* Book Call Quick Button */}
            <Button 
              size="sm" 
              className="hidden xl:flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('openModal', { detail: { type: 'consultation' } }));
              }}
            >
              <FontAwesomeIcon icon={faCogs} className="size-4" />
              Book Call
            </Button>
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8 h-8 rounded-lg" alt={logo.alt} />
              <span className="text-xl font-bold text-foreground">{logo.title}.</span>
            </Link>
            <div className="flex items-center gap-2">
              {/* Search button mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenSearch(true)}
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faSearch} className="size-5" />
              </Button>

              {/* WhatsApp button mobile */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <a
                  href="https://wa.me/918500647979"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact us on WhatsApp"
                >
                  <FontAwesomeIcon icon={faMessage} className="size-5" />
                </a>
              </Button>

              {/* Menu Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                    <FontAwesomeIcon icon={faBars} className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto bg-background/95 backdrop-blur-xl border-l border-primary/20">
                  <SheetHeader>
                    <SheetTitle>
                      <Link to={logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="w-8 h-8 rounded-lg" alt={logo.alt} />
                        <span className="text-xl font-bold text-foreground">{logo.title}.</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="my-6 flex flex-col gap-6">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {navigationMenu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                    <div className="border-t border-primary/20 py-4">
                      <div className="grid grid-cols-2 justify-start gap-2">
                        {mobileExtraLinks.map((link, idx) => (
                          <Link
                            key={idx}
                            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                            to={link.url}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                        <Link to={auth.login.url}>{auth.login.text}</Link>
                      </Button>
                      <Button asChild className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
                        <Link to={auth.signup.url}>{auth.signup.text}</Link>
                      </Button>
                      <Button 
                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('openModal', { detail: { type: 'consultation' } }));
                        }}
                      >
                        <FontAwesomeIcon icon={faCogs} className="size-4 mr-2" />
                        Book Call
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Search Popup */}
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Search services, solutions, or resources..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="text-muted-foreground" heading="Quick Links">
            <CommandItem className="text-foreground">
              <Link to="/services" className="flex items-center gap-2 w-full">
                <FontAwesomeIcon icon={faCode} className="size-4" />
                Our Services
              </Link>
            </CommandItem>
            <CommandItem className="text-foreground">
              <Link to="/portfolio" className="flex items-center gap-2 w-full">
                <FontAwesomeIcon icon={faBriefcase} className="size-4" />
                Portfolio
              </Link>
            </CommandItem>
            <CommandItem className="text-foreground">
              <Link to="/contact" className="flex items-center gap-2 w-full">
                <FontAwesomeIcon icon={faBullseye} className="size-4" />
                Get A Quote
              </Link>
            </CommandItem>
            <CommandItem className="text-foreground">
              <Link to="/blog" className="flex items-center gap-2 w-full">
                <FontAwesomeIcon icon={faBook} className="size-4" />
                Blog
              </Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </section>
  );
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger className="rounded-xl bg-transparent border-0 hover:bg-primary/10 hover:text-primary data-[state=open]:bg-primary/10 data-[state=open]:text-primary">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="rounded-2xl bg-background/95 backdrop-blur-xl border border-primary/20 shadow-xl">
          <div className="w-[800px] p-6">
            <div className="grid grid-cols-2 gap-6">
              {item.items.map((subItem) => (
                <motion.div
                  key={subItem.title}
                  className="space-y-3"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Main category link */}
                  <Link
                    to={subItem.url || "#"}
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-primary/10 group/main transition-colors"
                  >
                    <motion.div
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover/main:bg-primary group-hover/main:text-primary-foreground transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {subItem.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-foreground group-hover/main:text-primary transition-colors">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-xs leading-snug text-muted-foreground line-clamp-1">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>

                  {/* Nested submenu items */}
                  {subItem.items && subItem.items.length > 0 && (
                    <div className="ml-3 pl-3 border-l-2 border-primary/20 space-y-1">
                      {subItem.items.map((nestedItem) => (
                        <motion.div
                          key={nestedItem.title}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Link
                            to={nestedItem.url || "#"}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                          >
                            {nestedItem.title}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link
          className="group inline-flex h-10 w-max items-center justify-center rounded-xl bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
          to={item.url}
        >
          {item.title}
        </Link>
      </motion.div>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b border-primary/20">
        <AccordionTrigger className="py-3 font-semibold hover:no-underline text-foreground hover:text-primary">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {item.items.map((subItem) => (
              <motion.div
                key={subItem.title}
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {subItem.items && subItem.items.length > 0 ? (
                  <AccordionItem value={subItem.title} className="border-b border-primary/10">
                    <AccordionTrigger className="py-2 text-sm font-semibold hover:no-underline text-foreground hover:text-primary">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {subItem.icon}
                        </motion.div>
                        <span>{subItem.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-1">
                      {/* Parent link */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Link
                          to={subItem.url || "#"}
                          className="block px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors font-medium"
                        >
                          View All {subItem.title}
                        </Link>
                      </motion.div>
                      {/* Nested links */}
                      {subItem.items.map((nestedItem) => (
                        <motion.div
                          key={nestedItem.title}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Link
                            to={nestedItem.url || "#"}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                          >
                            {nestedItem.title}
                          </Link>
                        </motion.div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <Link
                    to={subItem.url || "#"}
                    className="flex select-none gap-3 rounded-xl p-3 leading-none outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
                  >
                    <motion.div
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {subItem.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">{subItem.title}</div>
                      {subItem.description && (
                        <p className="text-xs leading-snug text-muted-foreground mt-1">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <motion.div
      key={item.title}
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link to={item.url || "#"} className="font-semibold text-foreground hover:text-primary py-2 block">
        {item.title}
      </Link>
    </motion.div>
  );
};
