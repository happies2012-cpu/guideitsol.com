"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { FileText, Calendar, ArrowRight, CheckCircle } from "lucide-react";

const MerchantCustomerProtectionFund = () => {
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
            Merchant Cum Customer Protection Fund
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-4">
            Claims Procedure
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
                Merchant Cum Customer Protection Fund - Claims Procedure
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/90 mb-6">
                The Merchant Cum Customer Protection Fund ("Fund") is established to address genuine cases of financial loss suffered by either Merchants or Customers due to technical or system failures in PayU's payment infrastructure.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Purpose of the Fund</h2>
              <p className="text-foreground/90 mb-6">
                The Fund aims to provide compensation for verifiable financial losses arising from system errors, technical glitches, or security breaches in PayU's payment processing systems, subject to the terms and conditions outlined herein.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Eligibility Criteria</h2>
              <p className="text-foreground/90 mb-4">
                Claims may be considered from:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Merchants registered with PayU who experience financial loss due to system failures</li>
                <li>Customers who suffer financial loss due to technical issues in PayU's payment processing</li>
                <li>Losses must be directly attributable to PayU's system or process failures</li>
                <li>Claims must be reported within 30 days of the incident</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Types of Claims Covered</h2>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Double debits for a single transaction</li>
                <li>Failed transactions where amount was debited but not credited</li>
                <li>Unauthorized transactions due to security breaches in PayU's systems</li>
                <li>System errors causing incorrect settlement amounts</li>
                <li>Technical failures preventing access to funds</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Claims Process</h2>
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Step 1: Reporting</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Submit a claim through PayU's official claims portal or customer support</li>
                <li>Provide transaction details, including transaction ID, date, and amount</li>
                <li>Explain the nature of the issue and financial impact</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Step 2: Documentation</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Submit supporting documents such as bank statements, transaction receipts</li>
                <li>Provide screenshots or evidence of the issue if available</li>
                <li>Include any correspondence related to the incident</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Step 3: Investigation</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>PayU's team will review the claim and supporting documents</li>
                <li>Technical teams may investigate system logs and transaction records</li>
                <li>Additional information may be requested during the investigation</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Claim Resolution</h2>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Valid claims will be resolved within 30 working days</li>
                <li>Compensation will be credited to the claimant's registered bank account</li>
                <li>Claimants will be notified of the decision via email and SMS</li>
                <li>Unsuccessful claims will receive detailed reasons for rejection</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Limitations and Exclusions</h2>
              <p className="text-foreground/90 mb-4">
                The Fund does not cover:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Losses due to Merchant or Customer negligence</li>
                <li>Disputes between Merchants and Customers regarding goods/services</li>
                <li>Issues arising from third-party payment methods or banks</li>
                <li>Losses due to force majeure events</li>
                <li>Claims submitted after the stipulated time period</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Fund Management</h2>
              <p className="text-foreground/90 mb-6">
                The Fund is managed by PayU's Risk and Compliance team. The total corpus and individual claim limits are determined annually and may be revised at PayU's discretion.
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need to File a Protection Fund Claim?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Our support team can help you with the claims process.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default MerchantCustomerProtectionFund;