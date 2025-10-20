#!/bin/bash

# GitHub Deployment Script for Guidesoft Website

echo "=== Guidesoft Website Deployment Script ==="
echo

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found. Please run this script from the project root directory."
  exit 1
fi

echo "1. Checking Git status..."
git status
echo

echo "2. Building the project..."
npm run build
if [ $? -ne 0 ]; then
  echo "Error: Build failed. Please check the build errors and try again."
  exit 1
fi
echo "Build completed successfully!"
echo

echo "3. Adding all changes to Git..."
git add .
echo

echo "4. Checking if there are changes to commit..."
if [[ -n $(git status -s) ]]; then
  echo "Changes detected. Committing..."
  git commit -m "Automated deployment $(date)"
else
  echo "No changes to commit."
fi
echo

echo "5. Deployment preparation completed!"
echo
echo "To deploy to GitHub, you need to:"
echo "1. Create a Personal Access Token at https://github.com/settings/tokens"
echo "2. Select the 'repo' scope"
echo "3. Copy the token"
echo "4. Run one of the following commands:"
echo
echo "   For HTTPS with token:"
echo "   git push https://<username>:<your_token_here>@github.com/<username>/GuidesoftWebsiteFInal.git main"
echo
echo "   For example:"
echo "   git push https://happies2012-cpu:ghp_your_token_here@github.com/happies2012-cpu/GuidesoftWebsiteFInal.git main"
echo
echo "Alternatively, you can set up SSH authentication:"
echo "1. Generate SSH key: ssh-keygen -t ed25519 -C \"your_email@example.com\""
echo "2. Add to ssh-agent: eval \"\$(ssh-agent -s)\" && ssh-add ~/.ssh/id_ed25519"
echo "3. Add the public key to GitHub at https://github.com/settings/keys"
echo "4. Change remote URL: git remote set-url origin git@github.com:happies2012-cpu/GuidesoftWebsiteFInal.git"
echo "5. Push: git push origin main"
echo
echo "For more detailed instructions, see COMPLETE_DEPLOYMENT_GUIDE.md"