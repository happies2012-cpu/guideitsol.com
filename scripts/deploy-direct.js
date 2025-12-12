#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('Direct deployment to Dokploy...');

try {
  // Check if dokploy CLI is installed
  try {
    execSync('dokploy --version', { stdio: 'ignore' });
    console.log('Dokploy CLI is available.');
  } catch (error) {
    console.error('Dokploy CLI is not installed or not available in PATH.');
    console.error('Please install Dokploy CLI to deploy the application.');
    console.error('Visit https://dokploy.com/docs/installation for installation instructions.');
    process.exit(1);
  }

  // Deploy using dokploy CLI directly
  console.log('Deploying application using Dokploy directly...');
  execSync('dokploy deploy --source .', { stdio: 'inherit' });

  console.log('Direct deployment to Dokploy completed successfully!');

} catch (error) {
  console.error('Direct deployment to Dokploy failed:', error.message);
  process.exit(1);
}