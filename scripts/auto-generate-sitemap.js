#!/usr/bin/env node

// Script to automatically generate XML sitemap for Guidesoft website
// This script can be run as part of the build process or manually

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Base URL for the website
const BASE_URL = 'https://www.guideitsol.com';

// Static pages that should be included in the sitemap
const staticPages = [
  '/',
  '/ai-learning',
  '/services',
  '/solutions',
  '/travel',
  '/hire-us',
  '/portfolio',
  '/blog',
  '/contact',
  '/login',
  '/register'
];

// Generate the sitemap XML
const generateSitemap = () => {
  const currentDate = getCurrentDate();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Add static pages
  staticPages.forEach(page => {
    const priority = page === '/' ? '1.0' : page === '/services' || page === '/solutions' ? '0.9' : '0.8';
    const changefreq = page === '/' ? 'daily' : 'weekly';
    
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });
  
  // Add dynamic service pages
  const servicePages = [
    '/services/web-development',
    '/services/software-development',
    '/services/ui-ux-design-development',
    '/services/ecommerce-development',
    '/services/full-stack-development',
    '/services/cross-platform-development',
    '/services/data-engineering',
    '/services/app-development',
    '/services/travel-tech-solutions',
    '/services/hire-electron-js-developers',
    '/services/hire-reactjs-developers',
    '/services/hire-nextjs-developers',
    '/services/hire-html-developers',
    '/services/hire-angular-developers',
    '/services/hire-magento-developers',
    '/services/hire-gatsbyjs-developers',
    '/services/hire-extjs-developers'
  ];
  
  servicePages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });
  
  // Add dynamic solution pages
  const solutionPages = [
    '/solutions/on-demand-solutions',
    '/solutions/scheduling-app',
    '/solutions/event-management-app',
    '/solutions/flight-booking-app',
    '/solutions/video-conferencing',
    '/solutions/elearning-solution',
    '/solutions/data-analytics',
    '/solutions/devops-consulting',
    '/solutions/data-visualization',
    '/solutions/data-warehousing',
    '/solutions/snowflake-solution',
    '/solutions/it-support-services',
    '/solutions/it-outsourcing-services',
    '/solutions/offshore-development',
    '/solutions/emerging-tech-solutions',
    '/solutions/trending-technology'
  ];
  
  solutionPages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });
  
  // Add dynamic travel pages
  const travelPages = [
    '/travel/travel-booking-engine',
    '/travel/hotel-booking-engine',
    '/travel/flight-booking-engine',
    '/travel/b2b-travel-portal',
    '/travel/b2c-travel-portal'
  ];
  
  travelPages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });
  
  // Add dynamic hire pages
  const hirePages = [
    '/hire-us/hire-android-app-developer',
    '/hire-us/hire-react-native-developers',
    '/hire-us/hire-swift-developers',
    '/hire-us/hire-ios-developers',
    '/hire-us/trending-technology',
    '/hire-us/hire-dedicated-developers',
    '/hire-us/hire-full-stack-developer',
    '/hire-us/hire-devops-engineers',
    '/hire-us/hire-qa-engineers',
    '/hire-us/hire-front-end-developer',
    '/hire-us/hire-payload-cms-developers',
    '/hire-us/hire-devops-automation-engineers',
    '/hire-us/hire-typescript-developers'
  ];
  
  hirePages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });
  
  // Add company pages
  const companyPages = [
    '/pages',
    '/blog'
  ];
  
  companyPages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;
  });
  
  xml += `</urlset>`;
  
  return xml;
};

// Write sitemap to file
const sitemapXML = generateSitemap();
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

fs.writeFileSync(outputPath, sitemapXML);
console.log(`Sitemap generated successfully at ${outputPath}`);

// Also update the deployed version
const deployedPath = path.join(__dirname, '..', 'WEBSITE-READY-FOR-DEPLOYMENT', 'sitemap.xml');
fs.writeFileSync(deployedPath, sitemapXML);
console.log(`Deployed sitemap generated successfully at ${deployedPath}`);