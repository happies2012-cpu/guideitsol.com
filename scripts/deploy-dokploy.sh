#!/bin/bash

# Dokploy Deployment Script
# This script helps deploy the application to Dokploy

set -e

echo "🚀 Starting Dokploy deployment..."

# Check if required environment variables are set
if [ -z "$JWT_SECRET" ]; then
    echo "❌ JWT_SECRET environment variable is not set"
    exit 1
fi

if [ -z "$PAYU_MERCHANT_KEY" ]; then
    echo "❌ PAYU_MERCHANT_KEY environment variable is not set"
    exit 1
fi

if [ -z "$PAYU_MERCHANT_SALT" ]; then
    echo "❌ PAYU_MERCHANT_SALT environment variable is not set"
    exit 1
fi

# Create .env.production if it doesn't exist
if [ ! -f .env.production ]; then
    echo "📝 Creating .env.production from example..."
    cp .env.production.example .env.production
    echo "⚠️  Please update .env.production with your actual values"
fi

# Ensure data directory exists
mkdir -p data

# Build and start the application
echo "🏗️  Building application..."
docker-compose build

echo "🚀 Starting application..."
docker-compose up -d

echo "✅ Application deployed successfully!"
echo ""
echo "Access your application at: http://localhost:3001"
