#!/usr/bin/env node

/**
 * Production Deployment Preparation Script
 * 
 * This script helps prepare the application for production deployment
 * by checking configurations and providing guidance.
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
  fgCyan: '\x1b[36m',
  fgBlue: '\x1b[34m'
};

// Log functions
const log = {
  info: (msg) => console.log(`${colors.fgCyan}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.fgGreen}${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.fgYellow}${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.fgRed}${msg}${colors.reset}`),
  header: (msg) => console.log(`${colors.bright}${colors.fgBlue}${msg}${colors.reset}`)
};

// Check if environment file exists
function checkEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.production');
  if (fs.existsSync(envPath)) {
    log.success('✓ .env.production file found');
    return true;
  } else {
    log.error('✗ .env.production file not found');
    log.info('Please create .env.production file based on .env.production.template');
    return false;
  }
}

// Check for placeholder values in environment file
function checkPlaceholderValues() {
  const envPath = path.join(__dirname, '..', '.env.production');
  if (!fs.existsSync(envPath)) {
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const placeholders = [
    'YOUR_PAYPAL_PRODUCTION_CLIENT_ID',
    'YOUR_PAYU_PRODUCTION_MERCHANT_KEY',
    'YOUR_ACTUAL_LIVE_KEY_ID',
    'yourdomain.com'
  ];

  let hasPlaceholders = false;
  placeholders.forEach(placeholder => {
    if (envContent.includes(placeholder)) {
      log.warning(`⚠ Found placeholder value: ${placeholder}`);
      hasPlaceholders = true;
    }
  });

  if (!hasPlaceholders) {
    log.success('✓ No placeholder values found in .env.production');
  }

  return !hasPlaceholders;
}

// Check required files
function checkRequiredFiles() {
  log.header('\n=== Checking Required Files ===');
  
  const requiredFiles = [
    '.env.production',
    'package.json',
    'server/index.js',
    'src/components/PaymentComponent.tsx'
  ];

  let allFilesExist = true;
  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      log.success(`✓ ${file} found`);
    } else {
      log.error(`✗ ${file} not found`);
      allFilesExist = false;
    }
  });

  return allFilesExist;
}

// Check npm scripts
function checkNPMScripts() {
  log.header('\n=== Checking NPM Scripts ===');
  
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    log.error('✗ package.json not found');
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const requiredScripts = [
    'build:prod',
    'server',
    'prisma:migrate',
    'prisma:generate'
  ];

  let allScriptsExist = true;
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      log.success(`✓ npm run ${script} - ${packageJson.scripts[script]}`);
    } else {
      log.error(`✗ npm run ${script} not found`);
      allScriptsExist = false;
    }
  });

  return allScriptsExist;
}

// Display deployment instructions
function displayDeploymentInstructions() {
  log.header('\n=== Production Deployment Instructions ===');
  
  console.log(`
${colors.fgYellow}1. Prepare Production Environment:${colors.reset}
   - Copy .env.production.template to .env.production
   - Replace all placeholder values with actual production credentials
   - Ensure all sensitive data is properly secured

${colors.fgYellow}2. Build Application:${colors.reset}
   $ npm run build:prod

${colors.fgYellow}3. Database Setup:${colors.reset}
   $ npm run prisma:migrate
   $ npm run prisma:generate

${colors.fgYellow}4. Configure Payment Gateways:${colors.reset}
   - Log in to each payment gateway dashboard
   - Update webhook URLs with your production domain:
     * PayU: https://yourdomain.com/api/payu/webhook
     * Razorpay: https://yourdomain.com/api/ai-enrollments/razorpay-webhook
     * PayPal: https://yourdomain.com/api/paypal/webhook
   - Verify success/failure URLs are correctly configured

${colors.fgYellow}5. SSL Certificate:${colors.reset}
   - Ensure valid SSL certificate is installed
   - Verify HTTPS is enforced
   - Test all payment pages load securely

${colors.fgYellow}6. Final Testing:${colors.reset}
   - Test all payment methods with small amounts
   - Verify webhook notifications are received
   - Check database records are created correctly
   - Confirm success/failure flows work as expected

${colors.fgYellow}7. Start Production Server:${colors.reset}
   $ npm run server

${colors.fgYellow}8. Monitoring Setup:${colors.reset}
   - Set up logging for payment transactions
   - Configure alerts for failed payments
   - Monitor webhook delivery success rates
  `);
}

// Main function
async function prepareDeployment() {
  log.header('Production Deployment Preparation Script');
  log.info('Checking deployment readiness...\n');

  try {
    // Check environment file
    const envFileExists = checkEnvFile();
    
    // Check for placeholder values
    const noPlaceholders = checkPlaceholderValues();
    
    // Check required files
    const filesOk = checkRequiredFiles();
    
    // Check npm scripts
    const scriptsOk = checkNPMScripts();
    
    // Summary
    log.header('\n=== Deployment Readiness Summary ===');
    
    if (envFileExists && noPlaceholders && filesOk && scriptsOk) {
      log.success('✅ Application is ready for production deployment!');
      log.info('Please follow the deployment instructions below.');
    } else {
      log.warning('⚠ Application needs attention before production deployment.');
      log.info('Please address the issues identified above.');
    }
    
    // Display instructions
    displayDeploymentInstructions();
    
    log.header('\n=== Additional Resources ===');
    log.info('Refer to these files for detailed instructions:');
    log.info('- PRODUCTION_DEPLOYMENT_CHECKLIST.md');
    log.info('- PAYMENT_GATEWAY_SETUP.md');
    log.info('- DEPLOYMENT_PAYMENTS.md');
    log.info('- PAYU_PRODUCTION_SETUP.md');

  } catch (error) {
    log.error(`Deployment preparation failed: ${error.message}`);
    process.exit(1);
  }
}

// Run preparation
prepareDeployment();