import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = "",
  style = {},
  animate = true
}) => {
  return (
    <motion.div
      className={cn(
        "bg-muted rounded-md",
        className
      )}
      style={style}
      animate={animate ? {
        opacity: [0.5, 1, 0.5],
      } : {}}
      transition={{
        duration: 1.5,
        repeat: animate ? Infinity : 0,
        ease: "easeInOut"
      }}
    />
  );
};

export default SkeletonLoader;