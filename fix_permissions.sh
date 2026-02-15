#!/bin/bash

# Fix Permissions Script for guideitsol.com
# Use this script to resolve EPERM errors during npm install/build within this project.

echo "🔒 Fixing file permissions for project and npm cache..."
echo "This might ask for your password (sudo)."

# 1. Fix ownership of current directory
sudo chown -R $(whoami) .

# 2. Fix ownership of npm cache
sudo chown -R $(whoami) ~/.npm

# 3. Clear npm cache to be safe
npm cache clean --force

echo "✅ Permissions fixed! You can now run 'npm install && npm run build'."
