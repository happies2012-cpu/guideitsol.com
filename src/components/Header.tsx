import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, MessageCircle } from "lucide-react"; // Removed unused icons
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import guideSoftLogo from "@/assets/guideitsol-logo.png";
import Navbar from "@/components/ui/navbar";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark-background text-background px-4 py-2.5 text-sm border-b border-border/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-muted-foreground">
              <span className="text-primary mr-2 text-lg">
                <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </span>
              support@guideitsol.com
            </span>
            <span className="hidden md:block text-muted-foreground">Working: Monday - friday, 08am - 5pm</span>
            <Link to="/contact" className="hidden md:block text-muted-foreground hover:text-primary transition-colors ml-4">
              Contact Us
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground text-sm">English</span>
          </div>
        </div>
      </div>

      {/* Enhanced Navbar Component */}
      <Navbar />
    </>
  );
};

export default Header;