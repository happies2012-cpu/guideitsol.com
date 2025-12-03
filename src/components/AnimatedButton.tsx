import React from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAnimation } from "@/contexts/AnimationContext";

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => {
  const { animationsEnabled } = useAnimation();

  if (!animationsEnabled) {
    return (
      <Button className={className} {...props}>
        {children}
      </Button>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;