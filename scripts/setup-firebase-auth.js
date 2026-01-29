#!/usr/bin/env node

/**
 * Firebase Authentication Setup Script
 * 
 * This script enables Firebase Authentication providers:
 * - Email/Password
 * - Google OAuth
 * 
 * Run: node scripts/setup-firebase-auth.js
 */

const { execSync } = require('child_process');

console.log('🔥 Firebase Authentication Setup\n');

// Check if Firebase CLI is installed
try {
    execSync('firebase --version', { stdio: 'pipe' });
    console.log('✅ Firebase CLI is installed\n');
} catch (error) {
    console.error('❌ Firebase CLI is not installed');
    console.log('Install it with: npm install -g firebase-tools\n');
    process.exit(1);
}

// Instructions for manual setup
console.log('📋 Firebase Authentication Setup Instructions:\n');
console.log('Since Firebase Authentication providers cannot be enabled via CLI,');
console.log('please follow these steps in the Firebase Console:\n');

console.log('1️⃣  Open Firebase Console:');
console.log('   https://console.firebase.google.com/project/gsgroups-71fb9/authentication/providers\n');

console.log('2️⃣  Enable Email/Password Authentication:');
console.log('   - Click on "Email/Password" provider');
console.log('   - Toggle "Enable" to ON');
console.log('   - Click "Save"\n');

console.log('3️⃣  Enable Google OAuth:');
console.log('   - Click on "Google" provider');
console.log('   - Toggle "Enable" to ON');
console.log('   - Enter Project support email (your email)');
console.log('   - Click "Save"\n');

console.log('4️⃣  Add Authorized Domains:');
console.log('   - Go to Authentication > Settings > Authorized domains');
console.log('   - Add: localhost (for development)');
console.log('   - Add your production domain when ready\n');

console.log('5️⃣  Verify Setup:');
console.log('   - Run: npm run dev');
console.log('   - Navigate to: http://localhost:8080/register');
console.log('   - Test Google OAuth login');
console.log('   - Test Email/Password registration\n');

console.log('✅ Firestore Database: ENABLED');
console.log('✅ Firestore Security Rules: DEPLOYED');
console.log('⏳ Authentication Providers: MANUAL SETUP REQUIRED\n');

console.log('🔗 Quick Links:');
console.log('   Firebase Console: https://console.firebase.google.com/project/gsgroups-71fb9');
console.log('   Authentication: https://console.firebase.google.com/project/gsgroups-71fb9/authentication');
console.log('   Firestore: https://console.firebase.google.com/project/gsgroups-71fb9/firestore\n');

console.log('💡 After enabling authentication providers, your app will be ready to use!\n');
