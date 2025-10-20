import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '@/components/ui/PageHero';

const RobotCursorDemo = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        title="Robot Cursor Demo"
        subtitle="Move your cursor around the screen to see the robot follow and watch your movements"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-xl p-8 shadow-lg border border-border"
          >
            <h2 className="text-2xl font-bold mb-4">Interactive Robot Cursor</h2>
            <p className="text-muted-foreground mb-6">
              This demo showcases a custom robot cursor that follows your mouse movements and rotates its head 
              to "watch" your cursor as you move around the screen. The robot's head movements are calculated 
              based on the direction and velocity of your cursor.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-primary/10 p-6 rounded-lg border border-primary/20"
              >
                <h3 className="text-xl font-semibold mb-2">Features</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Smooth cursor following animation</li>
                  <li>Head rotation based on cursor movement</li>
                  <li>Real-time velocity calculation</li>
                  <li>Responsive design (hidden on mobile)</li>
                  <li>Spring physics for natural movement</li>
                </ul>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-secondary/10 p-6 rounded-lg border border-secondary/20"
              >
                <h3 className="text-xl font-semibold mb-2">How It Works</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Tracks mouse position using event listeners</li>
                  <li>Calculates head rotation based on movement direction</li>
                  <li>Uses Framer Motion for smooth animations</li>
                  <li>Applies spring physics for natural movement</li>
                  <li>Hidden on mobile devices for better UX</li>
                </ul>
              </motion.div>
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4">Try It Out!</h3>
              <p className="text-muted-foreground mb-6">
                Move your cursor around the screen to see the robot follow and watch your movements. 
                Notice how the robot's head rotates to follow your cursor direction.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold"
                >
                  Move Here
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-32 h-32 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold"
                >
                  Or Here
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold"
                >
                  Try This
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 bg-card rounded-xl p-8 shadow-lg border border-border"
          >
            <h2 className="text-2xl font-bold mb-4">Technical Implementation</h2>
            <p className="text-muted-foreground mb-6">
              The robot cursor is implemented as a React component using Framer Motion for animations. 
              It tracks mouse movements and calculates head rotation based on cursor velocity and direction.
            </p>
            
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Key Technologies:</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>React with TypeScript for component structure</li>
                <li>Framer Motion for smooth animations and transitions</li>
                <li>CSS3 for styling and gradients</li>
                <li>Event listeners for mouse tracking</li>
                <li>Mathematical calculations for head rotation</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RobotCursorDemo;