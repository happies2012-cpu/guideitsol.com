import React from "react";
import { BentoDemo } from "@/components/BentoDemo";

const BentoDemoPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            Bento Grid Demo
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Showcase of our BentoGrid component with various features
          </p>
        </div>
        
        <BentoDemo />
      </div>
    </div>
  );
};

export default BentoDemoPage;