import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "text" | "rectangular" | "circular";
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "",
  style = {},
  variant = "rectangular",
  width,
  height,
  borderRadius,
  animate = true
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "circular":
        return { borderRadius: "50%" };
      case "text":
        return { 
          borderRadius: "0.25rem",
          height: "1rem"
        };
      default:
        return {};
    }
  };

  const computedStyle = {
    width,
    height,
    borderRadius,
    ...getVariantStyles(),
    ...style
  };

  return (
    <motion.div
      className={cn(
        "bg-muted",
        className
      )}
      style={computedStyle}
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

export default Skeleton;