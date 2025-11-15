import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you would send this data to your backend
    // For now, we'll just show a success message
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Full Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@company.com"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1">
              Company Name
            </label>
            <Input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Your Company"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-foreground mb-1">
              Service Interest
            </label>
            <Input
              id="service"
              name="service"
              type="text"
              value={serviceType}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your project requirements and goals..."
              rows={4}
            />
          </div>
          
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