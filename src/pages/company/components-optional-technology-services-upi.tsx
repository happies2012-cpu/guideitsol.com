"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { FileText, Calendar, ArrowRight, CheckCircle } from "lucide-react";

const ComponentsOptionalTechnologyServicesUPI = () => {
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
            Components of the Optional Technology Services Suite for UPI
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-4">
            Technical components and services available for UPI payment integration
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
                Components of the Optional Technology Services Suite for UPI
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/90 mb-6">
                PayU offers an Optional Technology Services Suite for UPI (Unified Payments Interface) that provides enhanced functionality and customization options for merchants integrating UPI payments. This document outlines the available components and services.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Core UPI Integration Components</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">UPI Payment Gateway</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Secure API integration for UPI transactions</li>
                <li>Support for VPA (Virtual Payment Address) validation</li>
                <li>Real-time transaction processing and confirmation</li>
                <li>Integration with all major UPI providers (GPay, PhonePe, Paytm, etc.)</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">QR Code Generation</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Dynamic QR code generation for merchant transactions</li>
                <li>Static QR code options for fixed amount payments</li>
                <li>Customizable QR code designs to match brand identity</li>
                <li>Batch QR code generation for multiple products/services</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">UPI Intent Handling</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Deep linking for seamless app-to-app transactions</li>
                <li>Intent-based payment flows for mobile applications</li>
                <li>Fallback mechanisms for different UPI apps</li>
                <li>Auto-detection of installed UPI applications</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Advanced Features and Services</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Multi-lingual Support</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>UPI payment interfaces in multiple Indian languages</li>
                <li>Localized error messages and notifications</li>
                <li>Regional language support for customer communication</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Recurring Payments</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>UPI AutoPay integration for subscription models</li>
                <li>Mandate creation and management APIs</li>
                <li>Automated recurring billing with customer consent</li>
                <li>Flexible billing schedules and amount variations</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Smart Collect</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Push payment requests to customers via UPI</li>
                <li>Bulk payment request capabilities</li>
                <li>Customizable payment request templates</li>
                <li>Real-time status tracking of payment requests</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Security and Compliance Components</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Fraud Detection</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Real-time transaction monitoring</li>
                <li>Machine learning-based anomaly detection</li>
                <li>Risk scoring for UPI transactions</li>
                <li>Automated blocking of suspicious activities</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">PCI DSS Compliance</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Secure handling of payment data</li>
                <li>Tokenization for sensitive information</li>
                <li>End-to-end encryption of transaction data</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Regulatory Reporting</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Automated compliance reporting for NPCI</li>
                <li>Transaction audit trails</li>
                <li>Customer due diligence (CDD) integration</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Analytics and Reporting</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Transaction Analytics</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Real-time dashboard for UPI transactions</li>
                <li>Performance metrics and KPIs</li>
                <li>Customer behavior analysis</li>
                <li>Conversion rate optimization tools</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Custom Reporting</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Scheduled automated reports</li>
                <li>Customizable report templates</li>
                <li>Export options in multiple formats (CSV, Excel, PDF)</li>
                <li>API access to reporting data</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Developer Tools and Support</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">API Documentation</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Comprehensive API reference guides</li>
                <li>Sample code in multiple programming languages</li>
                <li>Interactive API testing environment</li>
                <li>SDKs for popular development platforms</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Technical Support</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>24/7 technical support for integration issues</li>
                <li>Dedicated integration specialist for enterprise clients</li>
                <li>Regular updates and feature announcements</li>
                <li>Knowledge base and community forums</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Pricing and Implementation</h2>
              <p className="text-foreground/90 mb-6">
                The Optional Technology Services Suite for UPI is available on a subscription basis with usage-based charges. Implementation timelines vary based on the complexity of integration and customization requirements.
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Integrate UPI Payments?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Our UPI integration specialists can help you implement the right technology suite for your business.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Contact UPI Integration Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default ComponentsOptionalTechnologyServicesUPI;