#!/usr/bin/env node

/**
 * Payment Gateway Deployment Script
 * 
 * This script helps with deploying payment gateway configurations
 * and verifying environment setup.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
function checkEnvFile(envFile) {
  const envPath = path.join(__dirname, '..', envFile);
  if (fs.existsSync(envPath)) {
    log.success(`✓ ${envFile} found`);
    return true;
  } else {
    log.error(`✗ ${envFile} not found`);
    return false;
  }
}

// Validate required environment variables
function validateEnvVars(envFile) {
  const envPath = path.join(__dirname, '..', envFile);
  if (!fs.existsSync(envPath)) {
    log.error(`Environment file ${envFile} does not exist`);
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'PAYPAL_CLIENT_ID',
    'PAYU_MERCHANT_KEY',
    'PAYU_MERCHANT_SALT'
  ];

  let isValid = true;
  requiredVars.forEach(varName => {
    if (!envContent.includes(varName)) {
      log.warning(`⚠ Missing ${varName} in ${envFile}`);
      isValid = false;
    }
  });

  if (isValid) {
    log.success(`✓ All required variables present in ${envFile}`);
  }

  return isValid;
}

// Check payment gateway configurations
async function checkPaymentConfigs() {
  log.info('\n=== Payment Gateway Configuration Check ===\n');

  // Check environment files
  const devEnvExists = checkEnvFile('.env');
  const prodEnvExists = checkEnvFile('.env.production');

  if (!devEnvExists && !prodEnvExists) {
    log.error('No environment files found. Please create .env or .env.production');
    return false;
  }

  // Validate environment variables
  if (devEnvExists) {
    log.info('\n--- Development Environment ---');
    validateEnvVars('.env');
  }

  if (prodEnvExists) {
    log.info('\n--- Production Environment ---');
    validateEnvVars('.env.production');
  }

  return true;
}

// Deploy payment gateway configurations
async function deployPayments() {
  log.info('Starting payment gateway deployment check...\n');

  try {
    // Check payment configurations
    const configValid = await checkPaymentConfigs();

    if (!configValid) {
      log.error('\nPayment gateway configuration issues detected.');
      log.info('Please refer to PAYMENT_GATEWAY_SETUP.md for detailed instructions.');
      process.exit(1);
    }

    log.success('\n✅ Payment gateway configurations verified successfully!');
    log.info('\nNext steps:');
    log.info('1. Ensure all environment variables are properly set with real credentials');
    log.info('2. Test payment flows in sandbox environment');
    log.info('3. For production deployment, use .env.production with live credentials');
    log.info('4. Refer to PAYMENT_GATEWAY_SETUP.md for detailed setup instructions');

  } catch (error) {
    log.error(`Deployment failed: ${error.message}`);
    process.exit(1);
  }
}

// Run deployment
deployPayments();