import React, { useEffect, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Parallax: React.FC<ParallaxProps> = ({ 
  children, 
  speed = 0.5, 
  className = "",
  style = {}
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed * 100]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        ...style
      }}
    >
      {children}
    </motion.div>
  );
};

export default Parallax;