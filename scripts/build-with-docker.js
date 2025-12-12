#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('Building production-ready application using Docker...');

try {
  // Check if Docker is installed
  try {
    execSync('docker --version', { stdio: 'ignore' });
    console.log('Docker is available.');
  } catch (error) {
    console.error('Docker is not installed or not available in PATH.');
    console.error('Please install Docker to build the application.');
    process.exit(1);
  }

  // Check if docker-compose is installed
  let dockerComposeAvailable = false;
  try {
    execSync('docker-compose --version', { stdio: 'ignore' });
    console.log('Docker Compose (standalone) is available.');
    dockerComposeAvailable = true;
  } catch (error) {
    try {
      execSync('docker compose version', { stdio: 'ignore' });
      console.log('Docker Compose (plugin) is available.');
      dockerComposeAvailable = true;
    } catch (error2) {
      console.error('Docker Compose is not installed or not available in PATH.');
      console.error('Please install Docker Compose to build the application.');
      process.exit(1);
    }
  }

  // Build the Docker image using docker-compose
  console.log('Building Docker image...');
  try {
    execSync('docker-compose build', { stdio: 'inherit' });
    console.log('To run the application, use: docker-compose up');
  } catch (buildError) {
    console.log('Trying docker compose build...');
    execSync('docker compose build', { stdio: 'inherit' });
    console.log('To run the application, use: docker compose up');
  }

  console.log('Docker build completed successfully!');

} catch (error) {
  console.error('Docker build failed:', error.message);
  process.exit(1);
}