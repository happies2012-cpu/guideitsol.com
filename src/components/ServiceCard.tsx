"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { motion, Easing } from "framer-motion"; // Import motion and Easing
import { Link } from "react-router-dom"; // Import Link

interface ServiceCardProps {
  icon?: LucideIcon; // Make icon optional
  image?: string; // New image prop
  title: string;
  description: string;
  href: string; // New href prop for redirection
  isHighlighted?: boolean;
}

const ServiceCard = ({ icon: Icon, image, title, description, href, isHighlighted = false }: ServiceCardProps) => {
  return (
    <div className={`group cursor-pointer transition-all duration-300 h-full ${isHighlighted ? 'bg-primary text-primary-foreground' : 'bg-service-bg hover:bg-primary hover:text-primary-foreground'} rounded-lg overflow-hidden`}>
      <Card 
        hoverEffect 
        className={`relative overflow-hidden backdrop-blur-xl ${isHighlighted ? 'bg-primary text-primary-foreground border-primary' : 'bg-background/40 border-primary/20'} hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--gradient-primary-start)/0.5)] h-full`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br from-gradient-primary-start/5 via-gradient-primary-end/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isHighlighted ? 'from-gradient-primary-start/20 to-gradient-primary-end/20' : ''}`} />
        <CardContent className="p-8 text-center relative z-10 flex flex-col h-full">
          {image ? (
            <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 transition-colors">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/20 to-gradient-primary-end/20 opacity-50" />
            </div>
          ) : (
            Icon && (
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 ${isHighlighted ? 'bg-primary-foreground/20' : 'bg-primary/10 group-hover:bg-primary group-hover:shadow-lg'}`}>
                <Icon className={`h-10 w-10 transition-all duration-300 ${isHighlighted ? 'text-primary-foreground' : 'text-primary group-hover:text-primary-foreground group-hover:scale-110'}`} />
              </div>
            )
          )}
          
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <p className={`mb-6 leading-relaxed flex-grow ${isHighlighted ? 'text-primary-foreground/90' : 'text-muted-foreground group-hover:text-primary-foreground/90'}`}>
            {description}
          </p>
          
          <Link to={href} className="mt-auto"> {/* Wrap button in Link */}
            <Button 
              variant="ghost" 
              className={`group/button ${isHighlighted ? 'text-primary-foreground hover:bg-primary-foreground/20' : 'text-primary hover:text-primary group-hover:text-primary-foreground group-hover:hover:bg-primary-foreground/20'}`}
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCard;