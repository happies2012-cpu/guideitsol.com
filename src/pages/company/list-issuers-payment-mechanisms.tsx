"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { FileText, Calendar, ArrowRight, CheckCircle } from "lucide-react";

const ListIssuersPaymentMechanisms = () => {
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
            List of Issuers Covered Under Payment Mechanisms
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-4">
            Banks and financial institutions supported by PayU payment systems
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
                List of Issuers Covered Under Payment Mechanisms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/90 mb-6">
                PayU's payment infrastructure supports transactions from a wide range of issuing banks and financial institutions. This document provides an overview of the major issuers covered under various payment mechanisms offered by PayU.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Credit Card Issuers</h2>
              <p className="text-foreground/90 mb-4">
                PayU processes payments from all major credit card issuers in India and internationally:
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Indian Issuers</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>State Bank of India (SBI)</li>
                <li>HDFC Bank</li>
                <li>ICICI Bank</li>
                <li>Axis Bank</li>
                <li>Kotak Mahindra Bank</li>
                <li>Bank of Baroda</li>
                <li>Punjab National Bank</li>
                <li>Canara Bank</li>
                <li>Union Bank of India</li>
                <li>Indian Bank</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">International Issuers</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Visa (Global)</li>
                <li>Mastercard (Global)</li>
                <li>American Express (Global)</li>
                <li>Diners Club (Global)</li>
                <li>JCB (Japan Credit Bureau)</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Debit Card Issuers</h2>
              <p className="text-foreground/90 mb-4">
                All major Indian banks issuing RuPay, Visa, and Mastercard debit cards are supported:
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">RuPay Card Issuers</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>State Bank Group (SBI, State Bank of Bikaner & Jaipur, etc.)</li>
                <li>Punjab National Bank Group</li>
                <li>Bank of Baroda</li>
                <li>Canara Bank</li>
                <li>Union Bank of India</li>
                <li>Indian Bank</li>
                <li>Central Bank of India</li>
                <li>Punjab & Sind Bank</li>
                <li>Bank of India</li>
                <li>Bank of Maharashtra</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">International Debit Card Issuers</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>All banks issuing Visa and Mastercard debit cards</li>
                <li>Major international banks with global debit card networks</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Net Banking Partners</h2>
              <p className="text-foreground/90 mb-4">
                PayU supports net banking payments from the following financial institutions:
              </p>
              
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>State Bank of India</li>
                <li>HDFC Bank</li>
                <li>ICICI Bank</li>
                <li>Axis Bank</li>
                <li>Kotak Mahindra Bank</li>
                <li>Bank of Baroda</li>
                <li>Punjab National Bank</li>
                <li>Canara Bank</li>
                <li>Union Bank of India</li>
                <li>Indian Bank</li>
                <li>Central Bank of India</li>
                <li>Punjab & Sind Bank</li>
                <li>Bank of India</li>
                <li>Bank of Maharashtra</li>
                <li>Indian Overseas Bank</li>
                <li>Corporation Bank</li>
                <li>Andhra Bank</li>
                <li>Allahabad Bank</li>
                <li>Oriental Bank of Commerce</li>
                <li>UCO Bank</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Wallet Partners</h2>
              <p className="text-foreground/90 mb-4">
                PayU facilitates transactions through the following digital wallet providers:
              </p>
              
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Paytm Wallet</li>
                <li>PhonePe Wallet</li>
                <li>Amazon Pay</li>
                <li>Google Pay</li>
                <li>Mobikwik</li>
                <li>FreeCharge</li>
                <li>JioMoney</li>
                <li>Airtel Payments Bank</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. UPI Providers</h2>
              <p className="text-foreground/90 mb-4">
                PayU supports payments through all major UPI providers:
              </p>
              
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Google Pay (GPay)</li>
                <li>PhonePe</li>
                <li>Paytm UPI</li>
                <li>BHIM UPI</li>
                <li>Amazon Pay UPI</li>
                <li>Mobikwik UPI</li>
                <li>Truecaller Pay</li>
                <li>WhatsApp Pay</li>
                <li>All bank-specific UPI apps (SBI, HDFC, ICICI, etc.)</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. International Payment Methods</h2>
              <p className="text-foreground/90 mb-4">
                For international transactions, PayU supports:
              </p>
              
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Major international credit cards (Visa, Mastercard, Amex)</li>
                <li>PayPal</li>
                <li>Apple Pay</li>
                <li>Google Pay (International)</li>
                <li>Alipay (for Chinese customers)</li>
                <li>WeChat Pay (for Chinese customers)</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Updates and Changes</h2>
              <p className="text-foreground/90 mb-6">
                This list is updated regularly as PayU expands its network of supported issuers and payment mechanisms. New partnerships are added and existing ones may be modified based on commercial agreements and regulatory requirements.
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Information About Payment Methods?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Our integration team can help you understand which payment methods are available for your customers.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Contact Integration Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default ListIssuersPaymentMechanisms;