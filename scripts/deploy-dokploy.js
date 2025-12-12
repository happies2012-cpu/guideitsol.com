#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('Deploying to Dokploy...');

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

  // Deploy using dokploy CLI
  console.log('Deploying application using Dokploy...');
  execSync('dokploy deploy', { stdio: 'inherit' });

  console.log('Deployment to Dokploy completed successfully!');

} catch (error) {
  console.error('Dokploy deployment failed:', error.message);
  process.exit(1);
}