import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
  animationType?: "slide" | "fade" | "scale" | "flip" | "slide-vertical";
}

const animationVariants = {
  slide: {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  },
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.2 }
  },
  flip: {
    initial: { opacity: 0, rotateY: 90 },
    in: { opacity: 1, rotateY: 0 },
    out: { opacity: 0, rotateY: -90 }
  },
  "slide-vertical": {
    initial: { opacity: 0, y: 100 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -100 }
  }
};

const transitionConfig = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1
};

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  animationType = "slide" 
}) => {
  const location = useLocation();
  
  const variants = animationVariants[animationType];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="in"
        exit="out"
        transition={transitionConfig}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;