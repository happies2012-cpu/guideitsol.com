import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAnimation } from "@/contexts/AnimationContext";

interface AnimatedRoutesProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: "blur(10px)"
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 1
    }
  },
  out: {
    opacity: 0,
    y: -30,
    scale: 1.05,
    filter: "blur(10px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 1
    }
  }
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1
};

const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({ children }) => {
  const location = useLocation();
  const { animationsEnabled } = useAnimation();

  if (!animationsEnabled) {
    return <div>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;