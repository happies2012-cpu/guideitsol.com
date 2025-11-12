# GitHub Pages Setup Guide

## Enabling GitHub Pages

To fix the 404 status and enable GitHub Pages for your site, follow these steps:

1. Go to your repository settings:
   - Navigate to https://github.com/happies2012-cpu/guideitsol.com/settings

2. Scroll down to the "Pages" section

3. In the "Build and deployment" section:
   - Source: Select "GitHub Actions"
   - This tells GitHub to use your workflow file for deployment

4. Click "Save"

## Verifying GitHub Actions Workflow

Your repository already has a workflow file at [.github/workflows/pages.yml](file:///Users/mac/Desktop/guideitsol.com/.github/workflows/pages.yml) that should deploy to GitHub Pages.

## Troubleshooting Deployment Issues

If the deployment is still failing, check:

1. **Personal Access Token Permissions**:
   - Ensure your GH_PAT token has the `pages:write` and `pages:read` scopes
   - Verify the token is added as a repository secret named `GH_PAT`

2. **Workflow Permissions**:
   - Check that your workflow has the correct permissions:
   ```yaml
   permissions:
     contents: read
     pages: write
     id-token: write
   ```

3. **Repository Settings**:
   - Ensure GitHub Pages is set to deploy from GitHub Actions
   - Verify the repository is public (required for GitHub Pages)

## Manual Deployment Trigger

To manually trigger a deployment:

1. Go to the "Actions" tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

## Checking Deployment Status

After deployment:
1. Check the Actions tab for workflow status
2. Visit your site at: https://happies2012-cpu.github.io/guideitsol.com/
3. Check the Pages section in Settings for deployment status

## Common Issues and Solutions

1. **404 Error**: Usually means GitHub Pages isn't enabled or properly configured
2. **Permission Errors**: Ensure your PAT has the correct scopes
3. **Build Failures**: Check the workflow logs for specific error messages