"use client";

import { useModal } from '@/components/modals/ModalProvider';

export const useButtonActions = () => {
  const { openModal } = useModal();

  const actions = {
    // Contact actions
    openContact: () => openModal('contact'),
    openContactWithService: (service: string) => openModal('contact', { service }),
    
    // Quote actions
    openQuote: (service?: string) => openModal('quote', { service }),
    openQuoteForService: (service: string) => openModal('quote', { 
      service,
      title: `Get Quote for ${service}`,
      description: `Get a personalized quote for our ${service.toLowerCase()} services.`
    }),
    
    // Payment actions
    openPayment: (plan: string, amount: number) => openModal('payment', { plan, amount }),
    openPaymentForPlan: (planName: string, price: number) => openModal('payment', {
      plan: planName,
      amount: price,
      title: `Subscribe to ${planName}`,
      description: `Complete your payment to start your ${planName} plan.`
    }),
    
    // Consultation actions
    openConsultation: () => openModal('consultation'),
    openFreeConsultation: () => openModal('consultation', {
      title: 'Book Free Consultation',
      description: 'Schedule a 30-minute free consultation with our experts to discuss your project.'
    }),
    
    // Demo actions
    openDemo: () => openModal('demo'),
    openProductDemo: (product?: string) => openModal('demo', {
      title: `${product ? `${product} ` : ''}Demo Request`,
      description: `See ${product ? product : 'our solutions'} in action with a personalized demo.`
    }),
    
    // Trial actions
    openTrial: () => openModal('payment', { plan: 'STARTER', amount: 250, title: 'Start Basic Plan', description: 'Activate the STARTER plan and begin immediately.' }),
    openFreeTrial: (planName?: string) => openModal('payment', {
      plan: planName || 'STARTER',
      amount: 250,
      title: `Start Basic Plan${planName ? ` - ${planName}` : ''}`,
      description: 'Complete payment to start your basic plan.'
    }),
    
    // Newsletter actions
    openNewsletter: () => openModal('newsletter'),
    openNewsletterSignup: () => openModal('newsletter', {
      title: 'Stay Updated',
      description: 'Get the latest insights on AI, technology trends, and industry news.'
    }),
    
    // Services actions
    openServices: () => openModal('services'),
    openServiceInfo: () => openModal('services', {
      title: 'Explore Our Services',
      description: 'Discover how our comprehensive services can help achieve your business goals.'
    }),

    // Helper functions for common CTA patterns
    handleGetStarted: (planName?: string, price?: number) => {
      if (planName && price) {
        openModal('payment', { plan: planName, amount: price });
      } else {
        openModal('consultation');
      }
    },

    handleLearnMore: (service?: string) => {
      if (service) {
        openModal('quote', { service });
      } else {
        openModal('services');
      }
    },

    handleContactSales: () => openModal('payment', {
      plan: 'ENTERPRISE',
      amount: 1000,
      title: 'Subscribe to ENTERPRISE',
      description: 'Complete your payment to start the enterprise plan.'
    }),

    handleBookDemo: (product?: string) => openModal('demo', {
      title: `Book ${product ? `${product} ` : ''}Demo`,
      description: `Schedule a personalized demo to see ${product ? product : 'our platform'} in action.`
    }),

    handleGetQuote: (service?: string) => openModal('quote', {
      service,
      title: 'Request Quote',
      description: `Get a detailed quote for ${service ? service : 'your project'}.`
    }),

    handleScheduleCall: () => openModal('consultation', {
      title: 'Schedule a Call',
      description: 'Book a call with our team to discuss your requirements.'
    }),

    handleExploreServices: () => openModal('services'),

    handleStartProject: () => openModal('quote', {
      title: 'Start Your Project',
      description: 'Tell us about your project and get a personalized proposal.'
    }),

    handleViewPricing: () => {
      // Scroll to pricing section if it exists, otherwise open payment modal
      const pricingSection = document.querySelector('#pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        openModal('payment', { plan: 'Professional', amount: 99 });
      }
    },

    handleChatWithAI: () => {
      // This could integrate with your chatbot
      console.log('Opening AI chat...');
      // For now, open a contact form
      openModal('contact', {
        title: 'AI Assistant',
        description: 'Our AI assistant will help answer your questions.'
      });
    },

    handleDownload: (resource?: string) => {
      // Handle downloads - could open a form to collect info before download
      openModal('contact', {
        title: `Download ${resource || 'Resource'}`,
        description: 'Provide your details to download the resource.'
      });
    }
  };

  return actions;
};
