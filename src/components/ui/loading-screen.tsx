import React from "react";
import { motion } from "framer-motion";
import Skeleton from "@/components/ui/skeleton";

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading...",
  fullScreen = true
}) => {
  return (
    <div className={fullScreen ? "fixed inset-0 flex items-center justify-center bg-background z-50" : "flex items-center justify-center py-8"}>
      <div className="text-center space-y-6">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end"></div>
            </div>
          </div>
        </motion.div>
        
        <div className="space-y-2">
          <Skeleton 
            variant="text" 
            width="200px" 
            className="mx-auto"
          />
          <p className="text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;