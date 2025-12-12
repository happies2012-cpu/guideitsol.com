"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { RotateCcw, Calendar, ArrowRight, CheckCircle, XCircle } from "lucide-react";

const RefundCancellationPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as Easing } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as Easing } },
    hover: { y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
  };

  const lastUpdated = "April 5, 2024";

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
            <RotateCcw className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Refund & Cancellation Policy</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-4">
            Our policy on refunds and cancellations for services and subscriptions.
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
                Our Refund & Cancellation Commitment
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/90 mb-6">
                Guidesoft ("we," "us," or "our") is committed to providing high-quality services. This Refund and Cancellation Policy outlines the terms under which you may cancel services or request refunds.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Subscription Services</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Cancellation</h3>
              <p className="text-foreground/90 mb-4">
                You may cancel your subscription at any time by:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Logging into your account and navigating to the subscription settings</li>
                <li>Contacting our customer support team at support@guideitsol.com</li>
              </ul>
              <p className="text-foreground/90 mb-6">
                Cancellation will be effective at the end of the current billing period. You will continue to have access to services until the end of your paid period.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Refunds for Subscriptions</h3>
              <p className="text-foreground/90 mb-6">
                We offer a 14-day money-back guarantee for new subscription customers. If you are not satisfied with our services within the first 14 days of your subscription, you may request a full refund.
              </p>
              <p className="text-foreground/90 mb-6">
                After the 14-day period, refunds for subscriptions are not typically provided, except in cases of service interruptions or other extenuating circumstances at our discretion.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">One-Time Services</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Project Cancellation</h3>
              <p className="text-foreground/90 mb-6">
                For one-time services such as custom development projects:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Cancellation requests must be made in writing</li>
                <li>Cancellations made before work begins will receive a full refund</li>
                <li>Cancellations after work has commenced will be refunded based on work completed</li>
                <li>A cancellation fee may apply for projects that have progressed significantly</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Refunds for One-Time Services</h3>
              <p className="text-foreground/90 mb-6">
                Refunds for one-time services are evaluated on a case-by-case basis. Factors considered include:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Stage of project completion at time of cancellation</li>
                <li>Reason for cancellation or refund request</li>
                <li>Quality of deliverables provided</li>
                <li>Compliance with project terms and timelines</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Non-Refundable Items</h2>
              <p className="text-foreground/90 mb-6">
                The following are generally not eligible for refunds:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Services already rendered or delivered</li>
                <li>Custom development work that meets agreed specifications</li>
                <li>Third-party services or products</li>
                <li>Consulting time or resources already utilized</li>
                <li>Setup or onboarding fees</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">How to Request a Refund</h2>
              <p className="text-foreground/90 mb-4">
                To request a refund, please:
              </p>
              <ol className="list-decimal pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Contact our support team at support@guideitsol.com</li>
                <li>Provide your account information and order details</li>
                <li>Explain the reason for your refund request</li>
                <li>Include any relevant documentation or evidence</li>
              </ol>
              <p className="text-foreground/90 mb-6">
                Refund requests are typically processed within 5-10 business days. We will notify you of the decision via email.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Dispute Resolution</h2>
              <p className="text-foreground/90 mb-6">
                If you are not satisfied with our response to your refund request, you may contact our customer advocacy team at advocacy@guideitsol.com. We are committed to resolving disputes fairly and promptly.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Contact Information</h2>
              <p className="text-foreground/90 mb-6">
                For questions about this policy or to request a refund or cancellation, please contact us at:
              </p>
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <p className="text-foreground font-medium">Guidesoft Support Team</p>
                <p className="text-foreground/90">Email: support@guideitsol.com</p>
                <p className="text-foreground/90">Phone: +1 (555) 123-4567</p>
                <p className="text-foreground/90 mt-2">123 Tech Avenue<br />San Francisco, CA 94103<br />United States</p>
              </div>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Have Questions About Our Policy?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">We're here to help clarify any concerns you may have about refunds or cancellations.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Contact Our Support Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default RefundCancellationPolicy;