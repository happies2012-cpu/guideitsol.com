"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { FileText, Calendar, ArrowRight, CheckCircle } from "lucide-react";

const TermsConditions = () => {
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
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Terms & Conditions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-4">
            These terms govern your use of our services and website. Please read them carefully.
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
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/90 mb-6">
                These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User" or "you") and Guidesoft ("Company," "we," "us," or "our") governing your access to and use of guideitsol.com (the "Site") and our services.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Acceptance of Terms</h2>
              <p className="text-foreground/90 mb-6">
                By accessing or using our Site and services, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must not use our Site or services.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Changes to Terms</h2>
              <p className="text-foreground/90 mb-6">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Site after such changes constitutes your acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Use of Services</h2>
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Eligibility</h3>
              <p className="text-foreground/90 mb-4">
                You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this eligibility requirement.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Account Registration</h3>
              <p className="text-foreground/90 mb-4">
                To access certain features of our services, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as needed</li>
                <li>Keep your password confidential and secure</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Prohibited Activities</h3>
              <p className="text-foreground/90 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Interfere with or disrupt the services or servers</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Transmit any viruses or malicious code</li>
                <li>Use our services to transmit spam or unsolicited messages</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Intellectual Property</h2>
              <p className="text-foreground/90 mb-6">
                All content, features, and functionality on our Site and services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of Guidesoft or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Services and Payments</h2>
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Service Descriptions</h3>
              <p className="text-foreground/90 mb-4">
                We strive to describe our services accurately, but we do not warrant that service descriptions are complete, error-free, or current. We reserve the right to modify services at any time.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Pricing and Payments</h3>
              <p className="text-foreground/90 mb-4">
                All prices are subject to change without notice. We may offer subscription-based services with recurring payments. You authorize us to charge your payment method for applicable fees.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Disclaimer of Warranties</h2>
              <p className="text-foreground/90 mb-6">
                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, secure, or error-free.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Limitation of Liability</h2>
              <p className="text-foreground/90 mb-6">
                To the fullest extent permitted by law, Guidesoft shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Termination</h2>
              <p className="text-foreground/90 mb-6">
                We may terminate or suspend your access to our services immediately, without prior notice, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Governing Law</h2>
              <p className="text-foreground/90 mb-6">
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Contact Information</h2>
              <p className="text-foreground/90 mb-6">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <p className="text-foreground font-medium">Guidesoft Legal Team</p>
                <p className="text-foreground/90">Email: support@guideitsol.com</p>
                <p className="text-foreground/90">Phone: +91 8500647979</p>
                <p className="text-foreground/90 mt-2">123 Tech Park, IT Hub<br />Hyderabad, Telangana<br />INDIA</p>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Questions About Our Terms?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">We're here to help clarify any concerns you may have about our terms and conditions.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Contact Our Legal Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default TermsConditions;