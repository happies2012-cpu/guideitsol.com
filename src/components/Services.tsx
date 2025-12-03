import { Calculator, TrendingUp, Target, PieChart, BarChart3, Users, Code, Globe, Lightbulb, CheckCircle, Layers, Cloud, Shield, Truck, Coffee, ShoppingCart, Video, MessageSquare, Plane, Hotel, Car, Ship, LucideIcon } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { mainNavigation, NavItem } from "@/lib/navigation-data"; // Import mainNavigation and NavItem
import ScrollAnimation from "@/components/ui/scroll-animation";
import Skeleton from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const Services = () => {
  const [loading, setLoading] = useState(true);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Helper to get a Lucide icon based on a title keyword
  const getIconForTitle = (title: string): LucideIcon | undefined => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("web development")) return Code;
    if (lowerTitle.includes("app development")) return Globe;
    if (lowerTitle.includes("ui/ux")) return Lightbulb;
    if (lowerTitle.includes("ecommerce")) return ShoppingCart;
    if (lowerTitle.includes("full stack")) return Layers;
    if (lowerTitle.includes("cross platform")) return CheckCircle;
    if (lowerTitle.includes("data engineering")) return BarChart3;
    if (lowerTitle.includes("it consulting")) return Users;
    if (lowerTitle.includes("android app")) return Globe;
    if (lowerTitle.includes("ios app")) return Target;
    if (lowerTitle.includes("iot app")) return Cloud;
    if (lowerTitle.includes("native app")) return Shield;
    if (lowerTitle.includes("flutter app")) return Plane;
    if (lowerTitle.includes("progressive web")) return TrendingUp;
    if (lowerTitle.includes("enterprise app")) return PieChart;
    if (lowerTitle.includes("travel portal")) return Hotel;
    if (lowerTitle.includes("travel booking")) return Car;
    if (lowerTitle.includes("white label")) return Ship;
    if (lowerTitle.includes("api integration")) return Calculator;
    if (lowerTitle.includes("global distribution")) return TrendingUp;
    if (lowerTitle.includes("hire")) return Users;
    if (lowerTitle.includes("on-demand")) return Truck;
    if (lowerTitle.includes("booking app")) return Coffee;
    if (lowerTitle.includes("chatbot")) return MessageSquare;
    if (lowerTitle.includes("food delivery")) return Truck;
    if (lowerTitle.includes("video streaming")) return Video;
    return undefined; // Default or fallback icon
  };

  // Flatten and select a diverse set of services from mainNavigation
  const allServices: NavItem[] = [];
  mainNavigation.forEach(navItem => {
    if (navItem.title === "Services" && navItem.children) {
      navItem.children.forEach(subCategory => {
        if (subCategory.children) {
          allServices.push(...subCategory.children);
        } else {
          allServices.push(subCategory);
        }
      });
    }
  });

  // Filter out duplicates and select a representative set (e.g., first 6 unique titles)
  const uniqueServices = Array.from(new Map(allServices.map(item => [item.title, item])).values());
  const selectedServices = uniqueServices.slice(0, 6); // Display first 6 unique services

  const servicesToDisplay = selectedServices.map((service, index) => ({
    icon: getIconForTitle(service.title),
    // Removed the generic placeholder image, now ServiceCard will use the icon if image is undefined
    title: service.title,
    description: `Explore our ${service.title.toLowerCase()} solutions designed to drive your business forward.`,
    href: service.href || "#",
    isHighlighted: index === 1 // Highlight the second card as an example
  }));

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimation className="text-center mb-16">
            <Skeleton variant="text" width="300px" height="40px" className="mx-auto mb-4" />
            <Skeleton variant="text" width="400px" height="20px" className="mx-auto" />
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <ScrollAnimation 
                key={index} 
                className="h-full"
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-background/40 border border-primary/20 rounded-lg overflow-hidden h-full">
                  <div className="p-8">
                    <div className="flex justify-center mb-6">
                      <Skeleton variant="circular" width="80px" height="80px" />
                    </div>
                    <Skeleton variant="text" width="150px" height="24px" className="mx-auto mb-4" />
                    <Skeleton variant="text" width="100%" height="16px" className="mb-2" />
                    <Skeleton variant="text" width="90%" height="16px" className="mb-2" />
                    <Skeleton variant="text" width="80%" height="16px" className="mb-6" />
                    <div className="flex justify-center">
                      <Skeleton variant="rectangular" width="120px" height="36px" borderRadius="6px" />
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            Guidesoft Professional Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We provide comprehensive IT consulting services to help your company achieve sustainable growth and success
          </p>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesToDisplay.map((service, index) => (
            <ScrollAnimation 
              key={index} 
              className="h-full"
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard
                icon={service.icon}
                // image={service.image} // No longer passing a generic image
                title={service.title}
                description={service.description}
                href={service.href}
                isHighlighted={service.isHighlighted}
              />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;