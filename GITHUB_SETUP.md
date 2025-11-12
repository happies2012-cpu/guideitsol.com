# GitHub Setup Instructions

## Setting up Personal Access Token (PAT)

To ensure GitHub Actions workflows run correctly without SSH authentication errors, follow these steps:

1. Create a Personal Access Token:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name like "GitHub Actions Deployment"
   - Select scopes: `repo`, `workflow`, `pages`, `pages:write`, `pages:read`
   - Click "Generate token"
   - Copy the generated token (you won't see it again)

2. Add the token to your repository secrets:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `GH_PAT`
   - Value: Paste your personal access token
   - Click "Add secret"

## Troubleshooting SSH Authentication Errors

If you encounter "Input required and not supplied" errors related to SSH:

1. Ensure your workflow uses the PAT instead of SSH:
   ```yaml
   - name: Checkout
     uses: actions/checkout@v4
     with:
       token: ${{ secrets.GH_PAT }}
   ```

2. Verify no other workflows are configured to use SSH authentication

3. Check repository settings for any SSH deployment keys that might be causing conflicts

## Repository Deployment Status

Your repository is configured to deploy to GitHub Pages using the personal access token authentication method.