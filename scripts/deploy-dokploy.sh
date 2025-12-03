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

# Build and push to Dokploy
echo "🏗️  Building application..."
docker-compose build

echo "📤 Pushing to Dokploy..."
# Note: Replace with actual Dokploy deployment command
# dokploy deploy --config dokploy.json

echo "✅ Deployment preparation completed!"
echo ""
echo "Next steps:"
echo "1. Update .env.production with your actual secrets"
echo "2. Run: dokploy deploy --config dokploy.json"
echo "3. Or push to your Git repository if using Git-based deployment"
echo ""
echo "For manual deployment:"
echo "docker-compose up -d"
