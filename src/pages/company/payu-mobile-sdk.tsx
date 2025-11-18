"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Easing } from "framer-motion";
import { Download, Smartphone, Code, FileText, Calendar, ArrowRight } from "lucide-react";

const PayUMobileSDK = () => {
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

  // Mock download URLs - in a real implementation, these would point to actual SDK files
  const sdkDownloads = [
    {
      platform: "Android",
      version: "5.1.2",
      size: "2.4 MB",
      url: "/downloads/payu-android-sdk-5.1.2.aar",
      description: "Android SDK for integrating PayU payments in your Android app"
    },
    {
      platform: "iOS",
      version: "4.3.1",
      size: "1.8 MB",
      url: "/downloads/payu-ios-sdk-4.3.1.framework.zip",
      description: "iOS SDK for integrating PayU payments in your iOS app"
    },
    {
      platform: "React Native",
      version: "2.0.5",
      size: "1.2 MB",
      url: "/downloads/payu-react-native-2.0.5.tgz",
      description: "React Native wrapper for PayU payments"
    },
    {
      platform: "Flutter",
      version: "1.4.3",
      size: "950 KB",
      url: "/downloads/payu-flutter-1.4.3.tar.gz",
      description: "Flutter plugin for PayU payments"
    }
  ];

  const documentationLinks = [
    {
      title: "Android SDK Documentation",
      url: "https://developer.payu.com/docs/android-sdk",
      description: "Complete guide for integrating PayU Android SDK"
    },
    {
      title: "iOS SDK Documentation",
      url: "https://developer.payu.com/docs/ios-sdk",
      description: "Complete guide for integrating PayU iOS SDK"
    },
    {
      title: "API Reference",
      url: "https://developer.payu.com/docs/api-reference",
      description: "Detailed API documentation for all PayU services"
    },
    {
      title: "Integration Guide",
      url: "https://developer.payu.com/docs/integration-guide",
      description: "Step-by-step guide for full PayU integration"
    }
  ];

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
            <Smartphone className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">PayU Mobile SDK</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            PayU Mobile SDK Downloads
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-4">
            Download the official PayU SDKs for Android, iOS, and cross-platform frameworks
          </p>
          <div className="flex items-center justify-center gap-2 text-foreground/80">
            <Calendar className="h-4 w-4" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </motion.section>

      {/* 2. SDK Downloads Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
              SDK Downloads
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              Get the latest SDKs for integrating PayU payments into your mobile applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sdkDownloads.map((sdk, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{sdk.platform}</span>
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">
                        v{sdk.version}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-foreground/90 mb-6">{sdk.description}</p>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-foreground/70">Size: {sdk.size}</span>
                      <span className="text-sm text-foreground/70">Updated: {lastUpdated}</span>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        // In a real implementation, this would trigger the download
                        window.open(sdk.url, '_blank');
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download {sdk.platform} SDK
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. Documentation Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-20 relative bg-gradient-to-br from-background/50 to-primary/5"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent">
              Documentation & Resources
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              Access comprehensive guides and documentation for PayU integration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {documentationLinks.map((doc, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Card className="bg-background/40 backdrop-blur-xl border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-start">
                      <FileText className="h-5 w-5 mr-3 mt-1 text-primary" />
                      <span className="text-xl">{doc.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/90 mb-6">{doc.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        window.open(doc.url, '_blank');
                      }}
                    >
                      View Documentation
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Integration Support */}
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
                Need Integration Support?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground/90 mb-6">
                Our technical team is here to help you integrate PayU payments into your mobile application. 
                Whether you're building for Android, iOS, or a cross-platform framework, we provide comprehensive support.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Code Samples</h3>
                  <p className="text-foreground/80">Access ready-to-use code examples for quick integration</p>
                </div>
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Documentation</h3>
                  <p className="text-foreground/80">Comprehensive guides for all platforms and frameworks</p>
                </div>
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
                  <p className="text-foreground/80">Direct assistance from our integration specialists</p>
                </div>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Contact Our Integration Team</h3>
                <p className="text-foreground/90 mb-4">
                  For SDK-related questions, integration support, or technical assistance:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-foreground font-medium">Email</p>
                    <p className="text-foreground/90">integration@payu.in</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">Phone</p>
                    <p className="text-foreground/90">+91-124-445-4567</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">Support Portal</p>
                    <p className="text-foreground/90">support.payu.in</p>
                  </div>
                </div>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Integrate PayU Payments?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Download the SDK and start accepting payments in your mobile app today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
              Download SDK
              <Download className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              View Documentation
              <FileText className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PayUMobileSDK;