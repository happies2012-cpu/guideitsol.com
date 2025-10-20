# CI/CD Integration for Guidesoft Website

## Overview

This document describes the CI/CD integration setup for the Guidesoft Website project. The integration includes:

1. GitHub Actions workflows for automated building and deployment
2. Deployment scripts for manual deployment
3. Configuration files for production deployment

## GitHub Actions Workflows

### 1. CI/CD Pipeline (`ci-cd.yml`)

Location: `.github/workflows/ci-cd.yml`

This workflow runs on every push to the `main` branch and pull requests to `main`. It performs the following steps:

1. Checks out the code
2. Sets up Node.js environment
3. Installs dependencies using `npm ci`
4. Builds the project using `npm run build`
5. Runs tests (if any)
6. Deploys to GitHub Pages

### 2. Deploy Workflow (`deploy.yml`)

Location: `.github/workflows/deploy.yml`

This is an alternative deployment workflow with similar steps but includes additional deployment options.

## Deployment Scripts

### 1. Automated Deployment Script (`deploy-website.sh`)

This script automates the deployment process:

1. Checks if you're on the correct branch
2. Verifies there are no uncommitted changes
3. Ensures your local branch is up to date with remote
4. Builds the project
5. Commits and pushes changes if needed

Usage:
```bash
./deploy-website.sh
```

### 2. GitHub Deployment Helper (`github-deploy.sh`)

This script provides guidance for GitHub deployment:

1. Builds the project
2. Commits changes
3. Provides instructions for pushing to GitHub

Usage:
```bash
./github-deploy.sh
```

## Setup Instructions

### Prerequisites

1. Node.js (version 20.x or higher)
2. npm (comes with Node.js)
3. Git
4. GitHub account with proper permissions

### GitHub Actions Setup

1. The workflows are already in place in `.github/workflows/`
2. No additional setup is required for GitHub Actions
3. The workflows will automatically run on push to `main` branch

### Manual Deployment Setup

1. Ensure you're on the `main` branch:
   ```bash
   git checkout main
   ```

2. Run the deployment script:
   ```bash
   ./deploy-website.sh
   ```

## Authentication

### Personal Access Token (Recommended)

1. Create a Personal Access Token at https://github.com/settings/tokens
2. Select the `repo` scope
3. Copy the token
4. Use it to push:
   ```bash
   git push https://<username>:<token>@github.com/<username>/GuidesoftWebsiteFInal.git main
   ```

### SSH Authentication

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
   git remote set-url origin git@github.com:<username>/GuidesoftWebsiteFInal.git
   ```

## Environment Configuration

The project requires the following environment variables in `.env`:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3001
NODE_ENV="production"
FRONTEND_URL="https://yourdomain.com"
```

For production deployment, update these values accordingly.

## Troubleshooting

### Push Failures

If you encounter push failures:

1. Verify your authentication method
2. Check that your token has the correct permissions (`repo` scope)
3. Ensure you have write access to the repository
4. Verify the repository name and owner

### Build Failures

If the build fails:

1. Check that all dependencies are installed: `npm install`
2. Verify Node.js version compatibility
3. Check for TypeScript or JavaScript errors
4. Ensure environment variables are properly set

### Deployment Failures

If deployment fails:

1. Check GitHub Actions logs for detailed error messages
2. Verify GitHub Pages settings in repository Settings
3. Ensure the `gh-pages` branch exists and is properly configured

## Monitoring

The CI/CD pipeline will automatically:

1. Build and test on every push
2. Report build status
3. Deploy successful builds to GitHub Pages

You can monitor the pipeline status in the Actions tab of the GitHub repository.

## Contact

For issues with CI/CD integration, contact the development team.