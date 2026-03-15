"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X, Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useButtonActions } from '@/hooks/use-button-actions';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleScheduleCall } = useButtonActions();

  const toggleOpen = () => setIsOpen(!isOpen);

  const actions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/918500647979",
      color: "bg-[#25D366]",
      textColor: "text-white"
    },
    {
      icon: Phone,
      label: "Call Now",
      href: "tel:+918500647979",
      color: "bg-blue-600",
      textColor: "text-white"
    },
    {
      icon: Calendar,
      label: "Book Meeting",
      onClick: handleScheduleCall,
      color: "bg-primary",
      textColor: "text-primary-foreground"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="flex flex-col items-end gap-3 mb-2"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-medium shadow-sm border border-border">
                  {action.label}
                </span>
                {action.href ? (
                  <a href={action.href} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="icon"
                      className={`w-12 h-12 rounded-full shadow-lg ${action.color} ${action.textColor} hover:scale-110 transition-transform`}
                    >
                      <action.icon className="w-6 h-6" />
                    </Button>
                  </a>
                ) : (
                  <Button
                    size="icon"
                    onClick={() => {
                      action.onClick?.();
                      setIsOpen(false);
                    }}
                    className={`w-12 h-12 rounded-full shadow-lg ${action.color} ${action.textColor} hover:scale-110 transition-transform`}
                  >
                    <action.icon className="w-6 h-6" />
                  </Button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        onClick={toggleOpen}
        className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-destructive hover:bg-destructive/90 rotate-45' : 'bg-primary hover:bg-primary/90'
        }`}
      >
        {isOpen ? <X className="w-7 h-7" /> : <Plus className="w-8 h-8" />}
      </Button>
    </div>
  );
};

export default FloatingActions;
