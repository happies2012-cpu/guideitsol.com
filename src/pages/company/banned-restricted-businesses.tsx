"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { FileText, Calendar, ArrowRight, CheckCircle } from "lucide-react";

const BannedRestrictedBusinesses = () => {
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
            Banned & Restricted List of Businesses
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-4">
            Businesses not permitted or requiring special approval for PayU payment processing
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
                Banned & Restricted List of Businesses
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/90 mb-6">
                PayU maintains a list of businesses and business types that are either prohibited from using PayU's payment services or require special approval and additional due diligence before onboarding. This list is subject to change based on regulatory requirements and risk assessment.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Banned Businesses</h2>
              <p className="text-foreground/90 mb-4">
                The following business types are strictly prohibited from using PayU's services:
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Illegal Activities</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Drug trafficking and illegal substance sales</li>
                <li>Human trafficking and exploitation</li>
                <li>Counterfeit goods and piracy</li>
                <li>Money laundering operations</li>
                <li>Terrorist financing activities</li>
                <li>Gambling and betting (where prohibited by law)</li>
                <li>Weapons and ammunition sales (illegal or unlicensed)</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Adult Content</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Adult entertainment services</li>
                <li>Sexual services and escort services</li>
                <li>Adult content distribution</li>
                <li>Sex toy retail (in certain jurisdictions)</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">High-Risk Financial Services</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Offshore banking and unregulated financial institutions</li>
                <li>Binary options and high-risk investment platforms</li>
                <li>Cryptocurrency exchanges (in certain jurisdictions)</li>
                <li>Debt collection agencies</li>
                <li>Foreclosure and bankruptcy services</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Restricted Businesses</h2>
              <p className="text-foreground/90 mb-4">
                The following business types may be approved for PayU services but require enhanced due diligence and special approval:
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Regulated Industries</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Pharmaceuticals and supplements (require licensing verification)</li>
                <li>Telecommunications services</li>
                <li>Financial services and fintech companies</li>
                <li>Insurance providers</li>
                <li>Real estate transactions</li>
                <li>Travel and tourism services</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">High-Risk Merchants</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-2">
                <li>Subscription-based services with high chargeback rates</li>
                <li>Digital downloads and software</li>
                <li>Multi-level marketing (MLM) companies</li>
                <li>Dropshipping businesses</li>
                <li>Online gaming (where legally permitted)</li>
                <li>Antiques and collectibles</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">Geographically Restricted</h3>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Businesses operating in sanctioned countries or regions</li>
                <li>Businesses serving customers in high-risk jurisdictions</li>
                <li>Cross-border transactions requiring special compliance</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Application Process for Restricted Businesses</h2>
              <p className="text-foreground/90 mb-4">
                Restricted businesses must:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Complete an enhanced application form with detailed business information</li>
                <li>Provide additional documentation as requested</li>
                <li>Undergo extended due diligence and background checks</li>
                <li>Accept higher fees and reserve requirements</li>
                <li>Comply with additional monitoring and reporting requirements</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Review and Updates</h2>
              <p className="text-foreground/90 mb-6">
                This list is reviewed regularly and updated based on regulatory changes, risk assessments, and business intelligence. PayU reserves the right to add or remove businesses from these categories at any time.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Violation Consequences</h2>
              <p className="text-foreground/90 mb-6">
                Merchants found operating in banned categories or misrepresenting their business type during onboarding may face immediate account termination, fund holds, and potential legal action.
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Have Questions About Business Categories?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Our compliance team can help clarify if your business is eligible for PayU services.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Contact Compliance Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default BannedRestrictedBusinesses;