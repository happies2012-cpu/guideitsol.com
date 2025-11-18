"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { FileText, Calendar, ArrowRight, CheckCircle } from "lucide-react";

const MerchantTermsInternetHandlingCharge = () => {
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
            Merchant Terms and Conditions
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-4">
            Applicable for availing Online Payment Aggregation Services on Internet Handling Charge Model
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
                Merchant Terms and Conditions - Internet Handling Charge Model
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/90 mb-6">
                These Merchant Terms and Conditions ("Terms") govern the provision of Online Payment Aggregation Services by PayU to merchants ("Merchant" or "you") under the Internet Handling Charge Model. By integrating PayU's payment services, you agree to be bound by these Terms.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Definitions</h2>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li><strong>PayU:</strong> Refers to PayU Payments Private Limited, a company incorporated under the laws of India.</li>
                <li><strong>Internet Handling Charge Model:</strong> A pricing model where PayU charges an internet handling fee as a percentage of the transaction value, separate from fixed service fees.</li>
                <li><strong>Merchant:</strong> Any person or entity that uses PayU's payment services to collect payments from customers.</li>
                <li><strong>Customer:</strong> The end-user making payments to the Merchant through PayU's platform.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Services Provided</h2>
              <p className="text-foreground/90 mb-4">
                PayU provides online payment aggregation services that enable Merchants to accept various forms of electronic payments from Customers. Under the Internet Handling Charge Model:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>PayU facilitates payment processing through multiple payment methods</li>
                <li>PayU settles collected payments to the Merchant's designated bank account</li>
                <li>PayU provides reporting and reconciliation services</li>
                <li>PayU offers fraud detection and prevention mechanisms</li>
                <li>PayU handles customer support for payment-related issues</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Internet Handling Charges and Fees</h2>
              <p className="text-foreground/90 mb-4">
                Under the Internet Handling Charge Model, Merchants will be charged:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>An internet handling charge as a percentage of each successful transaction value</li>
                <li>Possible fixed fees per transaction in addition to percentage charges</li>
                <li>Applicable taxes as per prevailing tax laws</li>
                <li>Additional fees for specific services, chargebacks, or failed transactions</li>
              </ul>
              <p className="text-foreground/90 mb-6">
                Detailed fee structure will be provided separately in the fee schedule and may be updated from time to time with prior notice.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Merchant Obligations</h2>
              <p className="text-foreground/90 mb-4">
                Merchants must:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Provide accurate and complete business and banking information</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain all necessary licenses and registrations</li>
                <li>Ensure their business is not in restricted categories</li>
                <li>Provide proper invoices and documentation to Customers</li>
                <li>Handle Customer service and disputes related to goods/services</li>
                <li>Display PayU's payment options and security badges as required</li>
                <li>Not misrepresent PayU's services or capabilities</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Settlement Process</h2>
              <p className="text-foreground/90 mb-4">
                PayU will settle successful transaction amounts to the Merchant's bank account after deducting applicable internet handling charges and fees:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Standard settlement cycle is T+2 working days</li>
                <li>Settlement timing may vary based on merchant category and risk profile</li>
                <li>PayU may impose holds or reserves on settlements for high-risk merchants</li>
                <li>Merchants can access settlement reports through the dashboard</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Chargeback and Refund Management</h2>
              <p className="text-foreground/90 mb-4">
                Merchants are responsible for:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Responding to chargeback disputes within specified timeframes</li>
                <li>Providing evidence to contest chargebacks when appropriate</li>
                <li>Processing legitimate customer refund requests promptly</li>
                <li>Understanding that chargeback fees will be deducted from their account</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Security and Compliance</h2>
              <p className="text-foreground/90 mb-4">
                Merchants must:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Comply with PCI DSS standards for card-not-present transactions</li>
                <li>Implement appropriate security measures to protect customer data</li>
                <li>Not store sensitive payment information without proper authorization</li>
                <li>Report security incidents promptly to PayU</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">8. Term and Termination</h2>
              <p className="text-foreground/90 mb-4">
                These Terms:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-6 space-y-2">
                <li>Remain in effect until terminated by either party</li>
                <li>May be terminated by PayU with 30 days' written notice</li>
                <li>Allow PayU to terminate immediately for cause or business reasons</li>
                <li>Require merchants to fulfill existing customer commitments upon termination</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">9. Limitation of Liability</h2>
              <p className="text-foreground/90 mb-6">
                PayU's liability is limited to the amount of fees paid by the Merchant in the preceding 12 months. PayU is not liable for indirect, incidental, or consequential damages.
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Help with Internet Handling Charge Model?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Our pricing team can help you understand how the Internet Handling Charge Model works for your business.</p>
          <Link to="/contact">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Contact Pricing Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default MerchantTermsInternetHandlingCharge;