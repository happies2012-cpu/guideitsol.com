"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { FileText, Calendar, ArrowRight, CheckCircle } from "lucide-react";

const TermsConditionsSplitPay = () => {
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
            Terms and Conditions for Split Pay Services
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-4">
            Guidelines for distributing payments among multiple recipients
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
                Terms and Conditions for Split Pay Services
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/90 mb-6">
                These Terms and Conditions ("Terms") govern the use of PayU's Split Pay Services, which enable Merchants to distribute payment amounts among multiple recipients in a single transaction. By using Split Pay Services, you agree to be bound by these Terms.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Definitions</h2>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li><strong>Split Pay:</strong> A service that allows distribution of a single payment among multiple recipients.</li>
                <li><strong>Primary Merchant:</strong> The main merchant account that initiates the Split Pay transaction.</li>
                <li><strong>Sub-Merchants:</strong> Additional recipients who receive a portion of the payment.</li>
                <li><strong>Split Ratio:</strong> The predetermined percentage or fixed amount allocated to each recipient.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Service Overview</h2>
              <p className="text-foreground/90 mb-6">
                Split Pay allows Primary Merchants to automatically distribute payment amounts to Sub-Merchants at the time of transaction processing. This service is particularly useful for marketplaces, e-commerce platforms, and service aggregators.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Eligibility and Registration</h2>
              <p className="text-foreground/90 mb-4">
                To use Split Pay Services:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Primary Merchants must have an active PayU account with verified business credentials</li>
                <li>Sub-Merchants must either have their own PayU accounts or be registered as beneficiaries</li>
                <li>All parties must comply with PayU's standard merchant terms and conditions</li>
                <li>Business models must be approved by PayU for Split Pay functionality</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Configuration and Setup</h2>
              <p className="text-foreground/90 mb-4">
                Split Pay requires proper configuration:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Primary Merchants must define split ratios or fixed amounts for each Sub-Merchant</li>
                <li>Split configurations must be set up through PayU's dashboard or API</li>
                <li>All Sub-Merchant details must be accurate and up-to-date</li>
                <li>Split rules can be modified with prior notice to PayU</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Transaction Processing</h2>
              <p className="text-foreground/90 mb-4">
                During transaction processing:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Customers make a single payment to the Primary Merchant</li>
                <li>PayU automatically distributes amounts to Sub-Merchants based on configured rules</li>
                <li>Each recipient receives their portion after applicable fees are deducted</li>
                <li>Transaction records are maintained for all parties involved</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Fees and Charges</h2>
              <p className="text-foreground/90 mb-4">
                Fee structure for Split Pay transactions:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Standard transaction fees apply to the total transaction amount</li>
                <li>Additional Split Pay service fees may apply per transaction</li>
                <li>Each recipient is responsible for their own transaction fees</li>
                <li>Fee structures may vary based on business volume and agreement</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Settlement Process</h2>
              <p className="text-foreground/90 mb-4">
                Settlement for Split Pay transactions:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Each recipient receives their allocated amount according to their settlement schedule</li>
                <li>Settlement timing may vary between Primary Merchants and Sub-Merchants</li>
                <li>PayU maintains separate settlement records for each recipient</li>
                <li>Disputes related to split amounts must be resolved between the parties involved</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">8. Compliance and Reporting</h2>
              <p className="text-foreground/90 mb-4">
                All parties must adhere to:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Applicable tax laws and regulations</li>
                <li>Financial reporting requirements</li>
                <li>Anti-money laundering (AML) and know-your-customer (KYC) regulations</li>
                <li>PayU's standard compliance policies</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">9. Limitations and Restrictions</h2>
              <p className="text-foreground/90 mb-4">
                Split Pay Services are subject to the following limitations:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Maximum number of Sub-Merchants per transaction may be limited</li>
                <li>Certain business categories may be restricted from using Split Pay</li>
                <li>Minimum and maximum transaction amounts may apply</li>
                <li>Geographic restrictions may apply based on regulatory requirements</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">10. Liability and Disclaimers</h2>
              <p className="text-foreground/90 mb-6">
                PayU's liability is limited to facilitating the Split Pay transaction as configured. PayU is not responsible for disputes between Primary Merchants and Sub-Merchants regarding split amounts or business arrangements.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">11. Termination</h2>
              <p className="text-foreground/90 mb-6">
                PayU may suspend or terminate Split Pay Services for any party that violates these Terms or for business reasons with prior notice.
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Want to Implement Split Pay for Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Our technical team can help you set up Split Pay services for your marketplace or platform.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Contact Technical Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default TermsConditionsSplitPay;