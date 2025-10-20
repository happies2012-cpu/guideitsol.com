import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const RobotCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const robotRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const mouseMoved = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update position
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Set visible after first move
      if (!mouseMoved.current) {
        setIsVisible(true);
        mouseMoved.current = true;
      }
      
      // Calculate velocity
      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;
      velocity.current = { x: deltaX, y: deltaY };
      
      // Calculate head rotation based on cursor movement direction
      const rotationX = Math.max(-20, Math.min(20, deltaY * 0.2));
      const rotationY = Math.max(-20, Math.min(20, deltaX * 0.2));
      
      setHeadRotation({ x: rotationX, y: rotationY });
      
      // Update last position
      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={robotRef}
      className="fixed pointer-events-none z-50 hidden md:block"
      style={{
        left: position.x - 30,
        top: position.y - 30,
        transform: 'translateZ(0)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isClicking ? 0.8 : 1,
        opacity: 1
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 28,
        scale: { duration: 0.1 }
      }}
    >
      {/* Robot Body */}
      <div className="relative w-16 h-16">
        {/* Robot Head */}
        <motion.div
          className="absolute w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full z-10 border-2 border-white shadow-lg flex items-center justify-center"
          style={{
            top: '-10px',
            left: '10px',
          }}
          animate={{
            rotateX: headRotation.x,
            rotateY: headRotation.y,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Robot Eyes */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
          
          {/* Robot Antenna */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
        </motion.div>
        
        {/* Robot Body */}
        <div className="absolute top-4 left-2 w-12 h-10 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg border-2 border-gray-600 flex items-center justify-center">
          {/* Robot Body Details */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-blue-400 rounded-full"></div>
          
          {/* Robot Logo */}
          <div className="text-white text-xs font-bold">AI</div>
        </div>
        
        {/* Robot Arms */}
        <motion.div 
          className="absolute top-5 -left-1 w-3 h-1 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"
          animate={{ 
            rotate: Math.sin(Date.now() / 200) * 10,
            x: isClicking ? -2 : 0
          }}
          transition={{ 
            duration: 0.1, 
            repeat: Infinity, 
            repeatType: "loop",
            x: { duration: 0.1 }
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-5 -right-1 w-3 h-1 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"
          animate={{ 
            rotate: Math.sin(Date.now() / 200 + Math.PI) * 10,
            x: isClicking ? 2 : 0
          }}
          transition={{ 
            duration: 0.1, 
            repeat: Infinity, 
            repeatType: "loop",
            x: { duration: 0.1 }
          }}
        ></motion.div>
        
        {/* Robot Legs */}
        <motion.div 
          className="absolute top-14 left-3 w-2 h-3 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"
          animate={{ y: isClicking ? 2 : 0 }}
          transition={{ y: { duration: 0.1 } }}
        ></motion.div>
        <motion.div 
          className="absolute top-14 right-3 w-2 h-3 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"
          animate={{ y: isClicking ? 2 : 0 }}
          transition={{ y: { duration: 0.1 } }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default RobotCursor;