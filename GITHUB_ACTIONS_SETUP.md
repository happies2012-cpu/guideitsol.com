# GitHub Actions Setup Guide

## Overview
This guide explains how to set up GitHub Actions for deploying your website to GitHub Pages, resolving the permission error you encountered.

## Problem
The error you encountered:
```
remote: Permission to happies2012-cpu/guideitsol.com.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/happies2012-cpu/guideitsol.com.git/': The requested URL returned error: 403
```

This happens because the default `GITHUB_TOKEN` has limited permissions and cannot push to protected branches or deploy to GitHub Pages.

## Solution: Create a Personal Access Token (PAT)

### Step 1: Create a Personal Access Token

1. Go to GitHub.com and sign in to your account
2. Click on your profile picture in the top right corner
3. Select "Settings" from the dropdown menu
4. In the left sidebar, scroll down and click "Developer settings"
5. Click "Personal access tokens" then "Tokens (classic)"
6. Click "Generate new token" then "Generate new token (classic)"
7. Give your token a descriptive name (e.g., "GH-Pages-Deploy")
8. Set the expiration date (recommend setting it to "No expiration" for convenience, but remember to rotate it periodically)
9. Select the following scopes:
   - `repo` (full control of private repositories)
   - `workflow` (update GitHub Action workflows)
10. Click "Generate token"
11. Copy the generated token immediately (you won't be able to see it again)

### Step 2: Add the Token as a Repository Secret

1. Go to your repository on GitHub (https://github.com/happies2012-cpu/guideitsol.com)
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" then "Actions"
4. Click "New repository secret"
5. Set the name to `GH_PAGES_TOKEN`
6. Paste the Personal Access Token you copied earlier into the value field
7. Click "Add secret"

### Step 3: Update Your Workflow File

Your workflow file (`.github/workflows/deploy.yml`) has already been updated to use the new secret:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  if: github.ref == 'refs/heads/main'
  with:
    github_token: ${{ secrets.GH_PAGES_TOKEN }}
    publish_dir: ./dist
    publish_branch: gh-pages
```

### Step 4: Test the Deployment

1. Make a small change to your code
2. Commit and push to the `main` branch
3. Go to the "Actions" tab in your repository
4. Watch the deployment workflow run
5. Check the "gh-pages" branch to confirm files were deployed
6. Visit your GitHub Pages site to verify it's working

## Alternative Solution: Use Deploy Keys

If you prefer not to use a Personal Access Token, you can use SSH deploy keys:

### Step 1: Generate SSH Keys

Run this command in your terminal:
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions@gh-pages" -f gh-pages -N ""
```

This creates two files:
- `gh-pages` (private key)
- `gh-pages.pub` (public key)

### Step 2: Add Keys to GitHub

1. Go to your repository Settings > Deploy keys
2. Click "Add deploy key"
3. Give it a title (e.g., "GH Pages Deploy")
4. Paste the contents of `gh-pages.pub` into the key field
5. Check "Allow write access"
6. Click "Add key"

7. Go to Settings > Secrets and variables > Actions
8. Click "New repository secret"
9. Name it `ACTIONS_DEPLOY_KEY`
10. Paste the contents of `gh-pages` (the private key) into the value field
11. Click "Add secret"

### Step 3: Update Your Workflow

Change the deploy step in your workflow to:
```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  if: github.ref == 'refs/heads/main'
  with:
    deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
    publish_dir: ./dist
    publish_branch: gh-pages
```

## Troubleshooting

### Common Issues and Solutions

1. **Permission Denied Error Persists**
   - Ensure the Personal Access Token has `repo` scope
   - Verify the secret name matches exactly (`GH_PAGES_TOKEN`)
   - Check that the workflow file references the correct secret

2. **Pages Not Updating**
   - Check that GitHub Pages is configured to use the `gh-pages` branch
   - Go to Settings > Pages in your repository
   - Ensure "Source" is set to "Deploy from a branch" and branch is `gh-pages`

3. **Build Failures**
   - Check the build logs in the Actions tab
   - Ensure all dependencies install correctly
   - Verify the `dist` directory is being created

4. **Token Expired**
   - Generate a new Personal Access Token
   - Update the repository secret with the new token

## Security Best Practices

1. **Token Management**
   - Rotate tokens periodically
   - Use descriptive names for tokens
   - Limit token scopes to only what's necessary
   - Store tokens securely (GitHub Secrets)

2. **Workflow Security**
   - Pin action versions (use specific tags, not `@main`)
   - Review third-party actions before using them
   - Keep workflows minimal and focused

3. **Repository Security**
   - Enable branch protection rules
   - Require reviews for production deployments
   - Use environment variables for sensitive data

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [peaceiris/actions-gh-pages Documentation](https://github.com/peaceiris/actions-gh-pages)
- [GitHub Personal Access Tokens](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
- [GitHub Deploy Keys](https://docs.github.com/en/developers/overview/managing-deploy-keys)

## Need Help?

If you encounter issues with this setup:
1. Check the workflow logs in the Actions tab
2. Verify all steps were completed correctly
3. Ensure the Personal Access Token has the correct permissions
4. Contact GitHub Support if the issue persists