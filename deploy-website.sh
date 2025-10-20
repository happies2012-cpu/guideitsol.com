#!/bin/bash

# Deployment script for Guidesoft Website

echo "Starting deployment process..."

# Check if we're on the main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
  echo "Warning: You are not on the main branch. Current branch: $current_branch"
  read -p "Do you want to continue? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
  fi
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
  echo "You have uncommitted changes. Please commit or stash them before deploying."
  git status -s
  exit 1
fi

# Check if we're behind the remote
git fetch origin
if [[ $(git rev-list HEAD...origin/main --count) -gt 0 ]]; then
  echo "Your local branch is not up to date with origin/main."
  echo "Please pull the latest changes before deploying."
  exit 1
fi

# Build the project
echo "Building the project..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed. Deployment cancelled."
  exit 1
fi

echo "Build successful!"

# Commit and push any changes (if needed)
echo "Checking for changes to commit..."
git add .
if [[ -n $(git status -s) ]]; then
  echo "Committing changes..."
  git commit -m "Automated deployment commit"
  echo "Pushing to GitHub..."
  git push origin main
else
  echo "No changes to commit."
fi

echo "Deployment process completed!"