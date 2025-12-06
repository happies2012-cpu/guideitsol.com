#!/usr/bin/env node

/**
 * Payment Systems Test Script
 * 
 * This script tests the basic configuration of payment systems
 * to ensure they are properly set up.
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgRed: '\x1b[31m',
  fgCyan: '\x1b[36m'
};

// Log functions
const log = {
  info: (msg) => console.log(`${colors.fgCyan}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.fgGreen}${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.fgYellow}${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.fgRed}${msg}${colors.reset}`)
};

// Check if environment file exists
function checkEnvFile() {
  const envFiles = ['.env', '.env.production', '.env.local'];
  let foundEnv = false;
  
  for (const envFile of envFiles) {
    const envPath = path.join(__dirname, '..', envFile);
    if (fs.existsSync(envPath)) {
      log.success(`✓ ${envFile} found`);
      foundEnv = true;
    }
  }
  
  if (!foundEnv) {
    log.error('✗ No environment files found (.env, .env.production, .env.local)');
  }
  
  return foundEnv;
}

// Validate required environment variables
function validateEnvVars() {
  const requiredVars = [
    { name: 'PAYPAL_CLIENT_ID', description: 'PayPal Client ID' },
    { name: 'PAYU_MERCHANT_KEY', description: 'PayU Merchant Key' },
    { name: 'PAYU_MERCHANT_SALT', description: 'PayU Merchant Salt' },
    { name: 'RAZORPAY_KEY_ID', description: 'Razorpay Key ID', required: false }
  ];

  let allValid = true;
  
  requiredVars.forEach(({ name, description, required = true }) => {
    if (process.env[name]) {
      log.success(`✓ ${description} configured`);
    } else if (required) {
      log.error(`✗ ${description} missing`);
      allValid = false;
    } else {
      log.warning(`⚠ ${description} not configured (optional)`);
    }
  });

  return allValid;
}

// Test PayU configuration
async function testPayUConfig() {
  log.info('\n--- Testing PayU Configuration ---');
  
  try {
    const merchantKey = process.env.PAYU_MERCHANT_KEY;
    const merchantSalt = process.env.PAYU_MERCHANT_SALT;
    
    if (!merchantKey || !merchantSalt) {
      log.error('PayU merchant key or salt not configured');
      return false;
    }
    
    // Test environment-based URLs
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction ? 'https://secure.payu.in' : 'https://test.payu.in';
    
    log.success(`PayU Environment: ${isProduction ? 'Production' : 'Sandbox'}`);
    log.success(`PayU Base URL: ${baseUrl}`);
    
    return true;
  } catch (error) {
    log.error(`PayU configuration test failed: ${error.message}`);
    return false;
  }
}

// Test PayPal configuration
async function testPayPalConfig() {
  log.info('\n--- Testing PayPal Configuration ---');
  
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      log.error('PayPal client ID or secret not configured');
      return false;
    }
    
    // Test environment-based URLs
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction ? 'https://api.paypal.com' : 'https://api.sandbox.paypal.com';
    
    log.success(`PayPal Environment: ${isProduction ? 'Production' : 'Sandbox'}`);
    log.success(`PayPal Base URL: ${baseUrl}`);
    
    return true;
  } catch (error) {
    log.error(`PayPal configuration test failed: ${error.message}`);
    return false;
  }
}

// Test Razorpay configuration
async function testRazorpayConfig() {
  log.info('\n--- Testing Razorpay Configuration ---');
  
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    
    if (!keyId) {
      log.warning('Razorpay Key ID not configured (optional)');
      return true;
    }
    
    // Check if it's a test or production key
    const isTestKey = keyId.startsWith('rzp_test_');
    const isLiveKey = keyId.startsWith('rzp_live_');
    
    if (isTestKey) {
      log.success('Razorpay Environment: Test/Sandbox');
    } else if (isLiveKey) {
      log.success('Razorpay Environment: Production');
    } else {
      log.warning('Razorpay Key ID format not recognized');
    }
    
    return true;
  } catch (error) {
    log.error(`Razorpay configuration test failed: ${error.message}`);
    return false;
  }
}

// Main test function
async function testPaymentSystems() {
  log.info('Starting payment systems configuration test...\n');

  try {
    // Check environment files
    const envFileExists = checkEnvFile();
    if (!envFileExists) {
      log.error('Cannot proceed without environment configuration files');
      process.exit(1);
    }

    // Validate environment variables
    log.info('\n--- Validating Environment Variables ---');
    const envVarsValid = validateEnvVars();
    if (!envVarsValid) {
      log.error('Required environment variables are missing');
      process.exit(1);
    }

    // Test individual payment systems
    const payuResult = await testPayUConfig();
    const paypalResult = await testPayPalConfig();
    const razorpayResult = await testRazorpayConfig();
    
    const allTestsPassed = payuResult && paypalResult && razorpayResult;

    log.info('\n=== Test Summary ===');
    if (allTestsPassed) {
      log.success('✅ All payment systems configured correctly!');
      log.info('\nNext steps:');
      log.info('1. Test payment flows using sandbox/test credentials');
      log.info('2. For production deployment, ensure you use live credentials');
      log.info('3. Verify webhook URLs are accessible');
      log.info('4. Check payment gateway dashboards for successful test transactions');
    } else {
      log.error('❌ Some payment systems have configuration issues');
      log.info('Please check the errors above and refer to PAYMENT_GATEWAY_SETUP.md for detailed instructions.');
      process.exit(1);
    }

  } catch (error) {
    log.error(`Payment systems test failed: ${error.message}`);
    process.exit(1);
  }
}

// Run tests
testPaymentSystems();