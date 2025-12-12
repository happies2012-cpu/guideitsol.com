import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, MessageCircle } from "lucide-react"; // Removed unused icons
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import guideSoftLogo from "@/assets/guidesoft-logo.png";
import EnhancedHeader from "@/components/ui/enhanced-header";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark-background text-background px-4 py-2 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-muted-foreground">
              <span className="text-primary mr-2">✉</span>
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
      <EnhancedHeader />
    </>
  );
};

export default Header;
