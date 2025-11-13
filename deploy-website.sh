#!/bin/bash

# Deployment script for Guidesoft website
echo "Starting Guidesoft website deployment..."

# Build the frontend
echo "Building frontend..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Frontend build failed!"
  exit 1
fi

echo "Frontend build completed successfully!"

# Copy built files to deployment directory
echo "Copying files to deployment directory..."
rm -rf WEBSITE-READY-FOR-DEPLOYMENT/*
cp -r dist/* WEBSITE-READY-FOR-DEPLOYMENT/

# Copy updated robots.txt
echo "Updating robots.txt..."
cp public/robots.txt WEBSITE-READY-FOR-DEPLOYMENT/

# Ensure proper permissions
echo "Setting proper permissions..."
chmod -R 755 WEBSITE-READY-FOR-DEPLOYMENT/

echo "Deployment completed successfully!"
echo "Files are ready in WEBSITE-READY-FOR-DEPLOYMENT directory."

# Optional: Start local server for testing
echo "To test locally, run: npm run preview"