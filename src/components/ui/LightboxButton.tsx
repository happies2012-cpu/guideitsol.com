import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import LightboxForm from "./LightboxForm";
import { useState } from "react";

interface LightboxButtonProps extends ButtonProps {
  title: string;
  serviceType: string;
  children: React.ReactNode;
}

const LightboxButton: React.FC<LightboxButtonProps> = ({ 
  title, 
  serviceType, 
  children, 
  ...buttonProps 
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <Button 
        {...buttonProps}
        onClick={(e) => {
          e.preventDefault();
          setIsLightboxOpen(true);
          // Call any onClick handler passed in buttonProps
          if (buttonProps.onClick) {
            buttonProps.onClick(e);
          }
        }}
      >
        {children}
      </Button>
      
      <LightboxForm 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={title}
        serviceType={serviceType}
      />
    </>
  );
};

export default LightboxButton;