# GitHub Push Instructions

## Current Status
The Diwali effect build has been completed and committed locally, but pushing to GitHub is failing due to authentication issues.

## Local Commits
- Commit: 2ed5896 - "added diwali"
- Commit: fa85c80 - "Add Diwali effect build summary documentation"

## Backup Files
1. `guidesoft-website-diwali-build.tar.gz` - Complete project archive (located in `/Users/mac/Downloads/`)
2. `DIWALI_EFFECT_BUILD_SUMMARY.md` - Build documentation

## Steps to Push to GitHub

### Option 1: Using Personal Access Token (Recommended)
1. Generate a Personal Access Token (PAT) on GitHub:
   - Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
   - Click "Generate new token" > "Generate new token (classic)"
   - Select scopes: `repo` (full control of private repositories)
   - Copy the generated token

2. Push using the token:
   ```bash
   cd "/Users/mac/Downloads/GuidesoftWebsiteFInal "
   git push https://<username>:<token>@github.com/happies2012-cpu/GuidesoftWebsiteFInal.git main
   ```

### Option 2: SSH Key Authentication
1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add SSH key to ssh-agent:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Add SSH key to GitHub:
   - Copy the SSH public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub Settings > SSH and GPG keys > New SSH key
   - Paste the key and save

4. Change remote URL to SSH:
   ```bash
   cd "/Users/mac/Downloads/GuidesoftWebsiteFInal "
   git remote set-url origin git@github.com:happies2012-cpu/GuidesoftWebsiteFInal.git
   git push origin main
   ```

### Option 3: Use GitHub CLI
1. Install GitHub CLI if not already installed
2. Authenticate: `gh auth login`
3. Push: `git push`

## Fallback Deployment
If GitHub push continues to fail:
1. Use the `guidesoft-website-diwali-build.tar.gz` archive
2. Extract on the deployment server
3. Run `npm install` to install dependencies
4. Run `npm run start:all` to start the application