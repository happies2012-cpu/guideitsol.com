"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Mail, Phone, Calendar, CreditCard, Check, Star, Wallet, Smartphone, QrCode } from "lucide-react";
import { motion } from "framer-motion";
import { generateUpiLink, copyToClipboard, isValidUpiId } from '@/lib/upi-utils';

type ModalType =
  | 'contact'
  | 'quote'
  | 'payment'
  | 'consultation'
  | 'demo'
  | 'trial'
  | 'newsletter'
  | 'services';

interface ModalData {
  title?: string;
  description?: string;
  service?: string;
  amount?: number;
  plan?: string;
}

interface ModalContextType {
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
  isOpen: boolean;
  modalType: ModalType | null;
  modalData: ModalData | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (type: ModalType, data?: ModalData) => {
    setModalType(type);
    setModalData(data || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    setModalData(null);
  };

  const handleSubmit = async (formData: Record<string, unknown>) => {
    try {
      console.log('Submitting form:', { type: modalType, data: formData });
      
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: modalType,
          data: formData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = (await response.json()) as { success: boolean };
      console.log('Form submission result:', result);
      
      alert('Thank you! Your request has been received. We will get back to you soon.');
      closeModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again later or contact us directly at info@guideitsol.com.');
    }
  };

  const renderModalContent = () => {
    if (!modalType) return null;

    switch (modalType) {
      case 'contact':
        return <ContactForm onSubmit={handleSubmit} />;
      case 'quote':
        return <QuoteForm onSubmit={handleSubmit} service={modalData?.service} />;
      case 'payment':
        return <PaymentForm onSubmit={handleSubmit} amount={modalData?.amount} plan={modalData?.plan} />;
      case 'consultation':
        return <ConsultationForm onSubmit={handleSubmit} />;
      case 'demo':
        return <DemoForm onSubmit={handleSubmit} />;
      case 'trial':
        return <TrialForm onSubmit={handleSubmit} />;
      case 'newsletter':
        return <NewsletterForm onSubmit={handleSubmit} />;
      case 'services':
        return <ServicesForm onSubmit={handleSubmit} />;
      default:
        return <ContactForm onSubmit={handleSubmit} />;
    }
  };

  const getModalTitle = () => {
    if (modalData?.title) return modalData.title;

    switch (modalType) {
      case 'contact': return 'Get in Touch';
      case 'quote': return 'Request a Quote';
      case 'payment': return 'Complete Payment';
      case 'consultation': return 'Book Consultation';
      case 'demo': return 'Schedule a Demo';
      case 'trial': return 'Start Basic Plan';
      case 'newsletter': return 'Subscribe to Newsletter';
      case 'services': return 'Explore Our Services';
      default: return 'Contact Us';
    }
  };

  const getModalDescription = () => {
    if (modalData?.description) return modalData.description;

    switch (modalType) {
      case 'contact': return 'Let us know how we can help you achieve your goals.';
      case 'quote': return 'Get a personalized quote for your project requirements.';
      case 'payment': return 'Secure payment processing for your selected plan.';
      case 'consultation': return 'Schedule a 30-minute consultation with our experts.';
      case 'demo': return 'See our solutions in action with a personalized demo.';
      case 'trial': return 'Activate the basic plan and start immediately.';
      case 'newsletter': return 'Stay updated with the latest in AI and technology.';
      case 'services': return 'Discover how our services can transform your business.';
      default: return 'We are here to help you succeed.';

    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, modalType, modalData }}>
      {children}
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {getModalTitle()}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {getModalDescription()}
            </DialogDescription>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};

// Individual Form Components
const ContactForm: React.FC<{ onSubmit: (data: Record<string, unknown>) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your full name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Your company"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your project..."
          rows={4}
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
        <Mail className="w-4 h-4 mr-2" />
        Send Message
      </Button>
    </form>
  );
};

const QuoteForm: React.FC<{ onSubmit: (data: Record<string, unknown>) => void; service?: string }> = ({ onSubmit, service }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: service || '',
    budget: '',
    timeline: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="service">Service Required</Label>
          <Input
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            placeholder="Web Development, AI Solutions..."
          />
        </div>
        <div>
          <Label htmlFor="budget">Budget Range</Label>
          <Input
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            placeholder="$10K - $50K"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="timeline">Timeline</Label>
        <Input
          id="timeline"
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          placeholder="3-6 months"
        />
      </div>
      <div>
        <Label htmlFor="description">Project Description *</Label>
        <Textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your project requirements..."
          rows={3}
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
        Request Quote
      </Button>
    </form>
  );
};

const PaymentForm: React.FC<{ onSubmit: (data: Record<string, unknown>) => void; amount?: number; plan?: string }> = ({ onSubmit, amount, plan }) => {
  const [upiId, setUpiId] = React.useState<string>(import.meta.env.VITE_UPI_ID || '8884162999@ybl');
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [paymentMode, setPaymentMode] = React.useState<'stripe' | 'upi' | 'payu'>('stripe');

  const handleStripeCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'payment',
          amount: Number(amount || 0),
          currency: 'inr',
          customerEmail: '',
          productName: plan || 'Guidesoft Service',
          metadata: { source: 'guideitsol.com', plan: plan || 'Professional' },
          paymentMethodTypes: ['card', 'upi'],
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.url) {
        throw new Error(data?.error || 'Unable to start checkout');
      }

      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      alert('Failed to initiate Stripe checkout. Please try again.');
      setIsCheckingOut(false);
    }
  };

  const handlePayU = async () => {
    try {
      const productInfo = plan || 'Subscription';
      const firstname = 'GSSERVICES';
      const email = 'support@guideitsol.com';
      const phone = '8500647979';
      const order = await (await import('@/lib/payu-utils')).createPayUOrder(
        Number(amount || 0),
        productInfo,
        firstname,
        email,
        phone,
        ''
      );
      await (await import('@/lib/payu-utils')).initiatePayUPayment(
        order.orderId,
        Number(amount || 0),
        productInfo,
        firstname,
        email,
        phone
      );
    } catch (e) {
      console.error(e);
      alert('Failed to initiate PayU payment. Please try again.');
    }
  };

  const handleUpiPay = async () => {
    if (!isValidUpiId(upiId)) {
      alert('Please enter a valid UPI ID');
      return;
    }

    const link = generateUpiLink(upiId, Number(amount || 99), plan || 'Guidesoft Service', `Payment for ${plan || 'Guidesoft Service'}`);
    window.open(link, '_blank', 'noopener,noreferrer');
    const copied = await copyToClipboard(upiId);
    if (copied) {
      alert('UPI link opened. Your UPI ID was copied to the clipboard.');
    }
  };

  return (
    <div className="mt-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span>Plan: {plan || 'Professional'}</span>
            <Badge variant="outline">{plan || 'Most Popular'}</Badge>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>${amount || 99}/month</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant={paymentMode === 'stripe' ? 'default' : 'outline'} className="flex-1" onClick={() => setPaymentMode('stripe')}>
            <CreditCard className="w-4 h-4 mr-2" /> Card/UPI
          </Button>
          <Button variant={paymentMode === 'upi' ? 'default' : 'outline'} className="flex-1" onClick={() => setPaymentMode('upi')}>
            <QrCode className="w-4 h-4 mr-2" /> UPI/GPay
          </Button>
          <Button variant={paymentMode === 'payu' ? 'default' : 'outline'} className="flex-1" onClick={() => setPaymentMode('payu')}>
            <Wallet className="w-4 h-4 mr-2" /> PayU
          </Button>
        </div>

        {paymentMode === 'stripe' && (
          <Button onClick={handleStripeCheckout} disabled={isCheckingOut} className="w-full">
            <CreditCard className="w-4 h-4 mr-2" />
            {isCheckingOut ? 'Preparing checkout...' : 'Pay with Stripe (Cards + UPI)'}
          </Button>
        )}

        {paymentMode === 'upi' && (
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Smartphone className="w-4 h-4" /> Pay via any UPI app including GPay
            </div>
            <input
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="Enter UPI ID"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <Button onClick={handleUpiPay} className="w-full">
              <QrCode className="w-4 h-4 mr-2" /> Open UPI/GPay payment
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              We will also copy your UPI ID to the clipboard for quick pasting.
            </p>
          </div>
        )}

        {paymentMode === 'payu' && (
          <Button onClick={handlePayU} variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10">
            <CreditCard className="w-4 h-4 mr-2" />
            Pay with Debit/Credit Card (PayU)
          </Button>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Secure payment powered by Stripe, UPI, and PayU.
        </p>
      </div>
    </div>
  );
};

const ConsultationForm: React.FC<{ onSubmit: (data: Record<string, unknown>) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    preferredDate: '',
    preferredTime: '',
    topic: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="preferredDate">Preferred Date</Label>
          <Input
            id="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="preferredTime">Preferred Time</Label>
          <Input
            id="preferredTime"
            type="time"
            value={formData.preferredTime}
            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="topic">Discussion Topic</Label>
        <Textarea
          id="topic"
          value={formData.topic}
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          placeholder="What would you like to discuss?"
          rows={3}
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
        <Calendar className="w-4 h-4 mr-2" />
        Schedule Consultation
      </Button>
    </form>
  );
};

const DemoForm: React.FC<{ onSubmit: (data: Record<string, unknown>) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="CEO, CTO, Manager..."
          />
        </div>
      </div>
      <div>
        <Label htmlFor="interests">Areas of Interest</Label>
        <Textarea
          id="interests"
          value={formData.interests}
          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
          placeholder="Which features or solutions are you most interested in?"
          rows={3}
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
        Schedule Demo
      </Button>
    </form>
  );
};

const TrialForm: React.FC<{ onSubmit: (data: Record<string, unknown>) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
      </div>
      <Button type="button" className="w-full bg-gradient-to-r from-primary to-secondary" onClick={async () => {
        try {
          const productInfo = 'STARTER';
          const firstname = 'GSSERVICES';
          const email = 'support@guideitsol.com';
          const phone = '8500647979';
          const amount = 250;
          const order = await (await import('@/lib/payu-utils')).createPayUOrder(
            amount,
            productInfo,
            firstname,
            email,
            phone,
            ''
          );
          await (await import('@/lib/payu-utils')).initiatePayUPayment(
            order.orderId,
            amount,
            productInfo,
            firstname,
            email,
            phone
          );
        } catch (e) {
          console.error(e);
          alert('Failed to initiate PayU payment. Please try again.');
        }
      }}>
        <Star className="w-4 h-4 mr-2" />
        Start Basic Plan
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        No credit card required. 14-day trial.
      </p>
    </form>
  );
};

const NewsletterForm: React.FC<{ onSubmit: (data: Record<string, unknown>) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    interests: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
        />
      </div>
      <div className="space-y-3">
        <Label>Topics of Interest (Optional)</Label>
        <div className="grid grid-cols-2 gap-2">
          {['AI Solutions', 'Web Development', 'Mobile Apps', 'Cloud Services', 'Data Analytics', 'Cybersecurity'].map((topic) => (
            <Badge key={topic} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              {topic}
            </Badge>
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
        <Mail className="w-4 h-4 mr-2" />
        Subscribe
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
};

const ServicesForm: React.FC<{ onSubmit: (data: Record<string, unknown>) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    services: [] as string[]
  });

  const services = [
    'Web Development',
    'Mobile App Development',
    'AI Solutions',
    'Cloud Services',
    'Data Analytics',
    'Cybersecurity',
    'DevOps',
    'Consulting'
  ];

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="space-y-3">
        <Label>Services of Interest</Label>
        <div className="grid grid-cols-2 gap-2">
          {services.map((service) => (
            <Badge
              key={service}
              variant={formData.services.includes(service) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => toggleService(service)}
            >
              {formData.services.includes(service) && <Check className="w-3 h-3 mr-1" />}
              {service}
            </Badge>
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
        Get Service Information
      </Button>
    </form>
  );
};
