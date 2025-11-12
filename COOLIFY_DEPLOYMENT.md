# Coolify Deployment Guide

## Understanding the Issue

The error logs you're seeing indicate that Coolify is deploying your application with Caddy instead of your configured Nginx server. This is causing deployment issues.

## Files Added for Proper Deployment

We've added three files to ensure proper deployment on Coolify:

### 1. Caddyfile
A configuration file for Caddy web server that can be used as an alternative to Nginx.

### 2. docker-compose.yml
Explicitly defines how to build and run your application using your Dockerfile.

### 3. coolify.json
Provides deployment configuration specifically for Coolify platform.

## Deployment Options

### Option 1: Use Dockerfile (Recommended)
1. In Coolify, select your repository
2. Choose "Dockerfile" as deployment method
3. Point to the existing `Dockerfile` in your project root
4. Set port to 80

### Option 2: Use Docker Compose
1. In Coolify, select your repository
2. Choose "Docker Compose" as deployment method
3. Point to the `docker-compose.yml` file we created
4. Set port to 80

### Option 3: Use the Coolify Configuration
1. In Coolify, select your repository
2. Choose "Deploy" and it will automatically use the `coolify.json` configuration

## Troubleshooting

### If Caddy is Still Being Used
1. Check Coolify's application settings
2. Ensure you've selected the correct deployment method (Dockerfile or Docker Compose)
3. Verify the port configuration is set to 80

### Health Check Issues
1. Ensure your application responds correctly on port 80
2. Check that the index.html file is accessible
3. Verify that static assets are being served properly

## Environment Variables

Make sure these environment variables are set in Coolify:
- `NODE_ENV=production`

## Common Issues and Solutions

1. **Caddy instead of Nginx**: Explicitly specify Dockerfile deployment method
2. **Port issues**: Ensure port 80 is configured correctly
3. **Health check failures**: Verify the application responds to HTTP requests
4. **Static asset issues**: Check that all assets are included in the build

## After Deployment

Once deployed successfully:
1. Test the website loads correctly
2. Verify all pages and assets are accessible
3. Check that API endpoints work if applicable