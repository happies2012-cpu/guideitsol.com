"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { FileText, Calendar, ArrowRight, CheckCircle } from "lucide-react";

const TermsConditionsBundledPackages = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as Easing } },
    hover: { y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
  };

  const lastUpdated = "November 18, 2025";

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gradient-primary-start/5 via-gradient-primary-end/5 to-cyan-500/5 pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 18c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z' stroke='hsl(var(--gradient-primary-start)/0.1)' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* 1. Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/10 via-gradient-primary-end/10 to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">PayU Terms</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            Terms & Conditions for Bundled Packages
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-4">
            Guidelines for PayU's bundled service offerings and packages
          </p>
          <div className="flex items-center justify-center gap-2 text-foreground/80">
            <Calendar className="h-4 w-4" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </motion.section>

      {/* 2. Content Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-background/40 backdrop-blur-xl border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
                Terms & Conditions for Bundled Packages
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/90 mb-6">
                These Terms & Conditions ("Terms") govern the use of PayU's bundled service packages, which combine multiple payment and technology services into comprehensive offerings for merchants. By subscribing to any bundled package, you agree to be bound by these Terms.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Definitions</h2>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li><strong>Bundled Package:</strong> A pre-defined combination of PayU services offered at a consolidated price.</li>
                <li><strong>Package Components:</strong> Individual services included in a bundled package.</li>
                <li><strong>Subscription Period:</strong> The duration for which a merchant subscribes to a bundled package.</li>
                <li><strong>Merchant:</strong> The subscriber to a bundled package.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Package Offerings</h2>
              <p className="text-foreground/90 mb-4">
                PayU offers various bundled packages designed for different business needs:
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Starter Bundle</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Basic payment gateway integration</li>
                <li>Standard checkout experience</li>
                <li>Basic reporting dashboard</li>
                <li>Email support during business hours</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Growth Bundle</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>All Starter Bundle features</li>
                <li>Advanced analytics and reporting</li>
                <li>Multiple payment method support</li>
                <li>Priority email support</li>
                <li>Basic fraud protection</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Enterprise Bundle</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>All Growth Bundle features</li>
                <li>Dedicated account manager</li>
                <li>Custom integration support</li>
                <li>24/7 phone and email support</li>
                <li>Advanced fraud protection</li>
                <li>API access to all services</li>
                <li>Custom reporting capabilities</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Subscription and Pricing</h2>
              <p className="text-foreground/90 mb-4">
                Bundled packages are offered on subscription basis:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Monthly, quarterly, and annual subscription options available</li>
                <li>Volume discounts for annual commitments</li>
                <li>Setup fees may apply for certain packages</li>
                <li>Prices are exclusive of applicable taxes</li>
                <li>PayU reserves the right to modify pricing with prior notice</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Package Components and Usage</h2>
              <p className="text-foreground/90 mb-4">
                Each bundled package includes specific components with defined usage limits:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Transaction volume limits per month</li>
                <li>Number of supported payment methods</li>
                <li>API call limits for integration services</li>
                <li>Storage limits for reporting data</li>
                <li>User account limitations</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Service Level Agreements</h2>
              <p className="text-foreground/90 mb-4">
                Different support levels are provided based on the package:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Response time commitments for support requests</li>
                <li>Uptime guarantees for payment services</li>
                <li>Dedicated support channels for higher-tier packages</li>
                <li>Regular service reviews and performance reports</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Modifications and Upgrades</h2>
              <p className="text-foreground/90 mb-4">
                Package modifications and upgrades:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Merchants can upgrade to higher-tier packages at any time</li>
                <li>Prorated charges apply for mid-cycle upgrades</li>
                <li>Downgrades are processed at the end of subscription period</li>
                <li>Additional services can be added to packages for extra fees</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Renewal and Termination</h2>
              <p className="text-foreground/90 mb-4">
                Subscription terms:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Automatic renewal unless canceled before renewal date</li>
                <li>30 days' notice required for cancellation</li>
                <li>Refunds for unused portions may be provided at PayU's discretion</li>
                <li>Continued access to services until end of paid period</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">8. Limitations and Exclusions</h2>
              <p className="text-foreground/90 mb-4">
                Bundled packages have certain limitations:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Services are provided as-is without warranties</li>
                <li>Certain high-risk business categories may be excluded</li>
                <li>Usage beyond limits may incur additional charges</li>
                <li>Some premium features may require separate agreements</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">9. Intellectual Property</h2>
              <p className="text-foreground/90 mb-6">
                All components of the bundled packages, including software, documentation, and tools, remain the property of PayU or its licensors. Merchants receive a limited license to use these components as part of their subscription.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">10. Governing Law</h2>
              <p className="text-foreground/90 mb-6">
                These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 bg-primary text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary-start/20 via-gradient-primary-end/20 to-cyan-500/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Interested in PayU Bundled Packages?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Our sales team can help you choose the right package for your business needs.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Contact Sales Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default TermsConditionsBundledPackages;