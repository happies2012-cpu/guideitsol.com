#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, rmSync, renameSync } from 'fs';
import { join, resolve } from 'path';

const rootDir = resolve(process.cwd());
const distDir = join(rootDir, 'dist');
const serverDir = join(rootDir, 'server');
const distServerDir = join(distDir, 'server');

console.log('Building production-ready application...');

try {
  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.split('.')[0].replace('v', ''));
  
  if (majorVersion < 20) {
    console.warn(`WARNING: You are using Node.js ${nodeVersion}. Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.`);
    console.warn('Attempting to build anyway, but it may fail...');
  }
  
  // 1. Build the frontend
  console.log('Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });

  // Move build output to public subdirectory to separate from server code
  console.log('Organizing build output...');
  // distPublicDir is already defined in the scope if I remove the declaration here
  const distPublicDir = join(distDir, 'public');
  
  // Create a temporary directory for the build output
  const tempDir = join(rootDir, 'temp_build');
  if (existsSync(tempDir)) {
    rmSync(tempDir, { recursive: true, force: true });
  }
  
  // Move dist content to temp
  renameSync(distDir, tempDir);
  
  // Create new dist structure
  mkdirSync(distDir);
  mkdirSync(distPublicDir);
  
  // Move content from temp to dist/public
  copyDirRecursive(tempDir, distPublicDir);
  
  // Clean up temp
  rmSync(tempDir, { recursive: true, force: true });

  // 2. Copy server files to dist
  console.log('Copying server files...');
  if (!existsSync(distServerDir)) {
    mkdirSync(distServerDir, { recursive: true });
  }

  // Copy server directory
  copyDirRecursive(serverDir, distServerDir);

  // 3. Copy package.json and other necessary files
  console.log('Copying package files...');
  const filesToCopy = ['package.json', '.env'];
  filesToCopy.forEach(file => {
    const src = join(rootDir, file);
    const dest = join(distDir, file);
    if (existsSync(src)) {
      copyFileSync(src, dest);
      console.log(`Copied ${file}`);
    }
  });

  // 4. Copy certs directory if it exists
  const certsDir = join(rootDir, 'certs');
  const distCertsDir = join(distDir, 'certs');
  if (existsSync(certsDir)) {
    console.log('Copying certs directory...');
    copyDirRecursive(certsDir, distCertsDir);
  }

  // 5. Copy public directory
  const publicDir = join(rootDir, 'public');
  // distPublicDir already defined above
  if (existsSync(publicDir)) {
    console.log('Copying public directory...');
    copyDirRecursive(publicDir, distPublicDir);
  }

  // 6. Copy key assets to dist root for direct access
  const faviconSrc = join(rootDir, 'public', 'favicon.ico');
  const faviconDest = join(distDir, 'favicon.ico');
  if (existsSync(faviconSrc)) {
    console.log('Copying favicon to dist root...');
    copyFileSync(faviconSrc, faviconDest);
  } else {
    console.log('favicon.ico not found, skipping...');
  }

  // 7. Copy prisma directory
  const prismaDir = join(rootDir, 'prisma');
  const distPrismaDir = join(distDir, 'prisma');
  if (existsSync(prismaDir)) {
    console.log('Copying prisma directory...');
    copyDirRecursive(prismaDir, distPrismaDir);
  }

  console.log('Production build completed successfully!');
  console.log('Output directory:', distDir);

} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

function copyDirRecursive(src, dest) {
  const entries = readdirSync(src, { withFileTypes: true });
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  for (let entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}