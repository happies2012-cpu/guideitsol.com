import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { FloatingLabelTextarea } from "@/components/ui/floating-label-textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface LightboxFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  serviceType: string;
}

const LightboxForm: React.FC<LightboxFormProps> = ({ isOpen, onClose, title, serviceType }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'consultation_request',
          data: {
            ...formData,
            serviceType
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast.success("Message Received!", {
        description: `Thank you for your interest in ${title}. Our team will review your inquiry and respond within 2 hours.`,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: ""
      });
      
      // Close the lightbox
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Submission Failed", {
        description: "There was an error sending your message. Please try again later.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingLabelInput
            id="name"
            name="name"
            label="Full Name *"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          
          <FloatingLabelInput
            id="email"
            name="email"
            label="Email Address *"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          
          <FloatingLabelInput
            id="company"
            name="company"
            label="Company Name"
            type="text"
            value={formData.company}
            onChange={handleInputChange}
          />
          
          <FloatingLabelInput
            id="phone"
            name="phone"
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
          />
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-foreground mb-1">
              Service Interest
            </label>
            <input
              id="service"
              name="service"
              type="text"
              value={serviceType}
              readOnly
              className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
          
          <FloatingLabelTextarea
            id="message"
            name="message"
            label="Message *"
            required
            value={formData.message}
            onChange={handleInputChange}
            error={errors.message}
          />
          
          <Button type="submit" className="w-full bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90">
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LightboxForm;