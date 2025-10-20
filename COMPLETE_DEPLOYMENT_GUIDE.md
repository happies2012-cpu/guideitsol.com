# Guidesoft Website Deployment Guide

## Prerequisites

1. Node.js (version 20.x or higher)
2. npm (comes with Node.js)
3. Git
4. GitHub account with proper permissions

## CI/CD Setup

This project uses GitHub Actions for continuous integration and deployment. The workflows are located in `.github/workflows/`:

1. `ci-cd.yml` - Main CI/CD pipeline
2. `deploy.yml` - Alternative deployment workflow

## Manual Deployment

### Using the Deployment Script

1. Make sure you're on the `main` branch:
   ```bash
   git checkout main
   ```

2. Run the deployment script:
   ```bash
   ./deploy-website.sh
   ```

### Manual Steps

1. **Ensure all changes are committed:**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

## GitHub Actions Workflow

The CI/CD pipeline will automatically:

1. Run on every push to the `main` branch
2. Install dependencies
3. Build the project
4. Run tests (if any)
5. Deploy to GitHub Pages

## Environment Variables

Make sure the following environment variables are set in your `.env` file:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3001
NODE_ENV="production"
FRONTEND_URL="https://yourdomain.com"
```

For production deployment, update these values accordingly.

## Troubleshooting

### Authentication Issues

If you encounter authentication issues when pushing to GitHub:

1. Create a new Personal Access Token (PAT) with `repo` scope:
   - Go to https://github.com/settings/tokens
   - Generate new token with `repo` scope
   - Copy the token

2. Use the token to push:
   ```bash
   git push https://<username>:<token>@github.com/<username>/<repository>.git main
   ```

### SSH Authentication

If you prefer SSH authentication:

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add to ssh-agent:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Add public key to GitHub:
   - Copy: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub Settings > SSH and GPG keys
   - Add new SSH key

4. Change remote URL:
   ```bash
   git remote set-url origin git@github.com:<username>/<repository>.git
   ```

## Production Deployment

For production deployment, you may need to:

1. Update environment variables in `.env.production`
2. Configure your web server (Nginx, Apache, etc.)
3. Set up SSL certificates
4. Configure database for production
5. Set up monitoring and logging

## GitHub Pages Deployment

The project is configured to deploy to GitHub Pages automatically through GitHub Actions. To enable GitHub Pages:

1. Go to repository Settings
2. Navigate to Pages section
3. Set Source to "GitHub Actions"

## Contact

For deployment issues, contact the development team.