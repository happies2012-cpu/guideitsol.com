# Guidesoft Website - Production Ready Build

This document describes the production-ready build of the Guidesoft website with cross-platform Electron support.

## Build Features

1. **Cross-Browser Compatibility**: Works across all modern browsers (Chrome, Firefox, Safari, Edge)
2. **Electron Desktop Application**: Native desktop app for Windows, macOS, and Linux
3. **Progressive Web App**: Installable web application with offline support
4. **Responsive Design**: Works on mobile, tablet, and desktop devices
5. **Performance Optimized**: Minified and compressed assets for fast loading
6. **Security Configured**: Proper CSP and security headers (with permissive settings as requested)

## Build Output

The production build generates multiple deployment options:

### Web Deployment
- **Directory**: `dist/`
- **Contents**: All static assets ready for web hosting
- **Features**: 
  - HTTPS-ready
  - Cross-browser compatible
  - Mobile-responsive
  - SEO-optimized

### Electron Desktop Application
- **Directory**: `dist/mac/` (macOS), `dist/win/` (Windows), `dist/linux/` (Linux)
- **Installers**: 
  - macOS: `dist/guidesoftwebsite-0.0.0.dmg`
  - Windows: `dist/guidesoftwebsite-0.0.0.exe` (when built on Windows)
  - Linux: `dist/guidesoftwebsite-0.0.0.AppImage`

## Build Commands

### Development
```bash
# Start development servers (frontend and backend)
npm run start:all

# Start Electron app in development mode
npm run electron:dev
```

### Production
```bash
# Build production web app
npm run build

# Build production web app with integrated backend
npm run build:prod

# Build Electron desktop app
npm run electron:build

# Build Electron desktop app (without packaging)
npm run electron:dist
```

## Deployment Options

### Web Hosting
1. Upload contents of `dist/` directory to your web server
2. Configure your server to serve `index.html` for all routes (SPA routing)
3. Ensure HTTPS is enabled
4. Set proper MIME types for all file extensions

### Desktop Application
1. Distribute the platform-specific installers:
   - macOS: `.dmg` file
   - Windows: `.exe` or `.msi` file
   - Linux: `.AppImage`, `.deb`, or `.rpm` file

### Self-Hosted Server
1. Deploy the `dist/` directory to your server
2. Run the backend server with `npm run server`
3. Configure reverse proxy to serve frontend assets and backend API

## Cross-Platform Compatibility

### Browsers
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Android Chrome)

### Operating Systems
- Windows 10+
- macOS 10.14+
- Linux (Ubuntu 18.04+, Fedora 32+, Debian 10+)

### Devices
- Desktop computers
- Laptops
- Tablets
- Smartphones

## Security Configuration

As requested, the application has been configured to:
- Allow insecure content (HTTP) alongside secure content (HTTPS)
- Prevent ad blocker blocking
- Permit all browser features
- Disable restrictive security policies

## Features Included

1. **Payment Integration**:
   - PayPal Smart Payment Button
   - Razorpay integration
   - UPI payment options

2. **User Management**:
   - Registration and authentication
   - Profile management
   - Enrollment system

3. **Content Management**:
   - Dynamic pages
   - Blog system
   - Portfolio showcase

4. **Business Services**:
   - Software development
   - UI/UX design
   - Digital marketing
   - IT consulting

5. **Contact System**:
   - Contact form
   - Location information
   - Direct communication channels

## Customization

To customize the application:
1. Update content in `src/` directory
2. Modify styles in `src/styles/`
3. Update environment variables in `.env`
4. Rebuild with `npm run build:prod`
5. Rebuild Electron app with `npm run electron:build`

## Troubleshooting

### Common Issues
1. **Port conflicts**: Change ports in `.env` file
2. **SSL certificate errors**: Ensure certificates are in `certs/` directory
3. **Database issues**: Run `npm run prisma:migrate` to update database schema
4. **Build errors**: Check Node.js version compatibility

### Support
For issues with the production build, please:
1. Check the console for error messages
2. Verify all dependencies are installed with `npm install`
3. Ensure environment variables are properly configured
4. Contact support with detailed error information

## Maintenance

### Updates
1. Pull latest changes from repository
2. Run `npm install` to update dependencies
3. Run `npm run build:prod` to rebuild application
4. Run `npm run electron:build` to rebuild desktop app

### Backups
1. Backup `dist/` directory
2. Backup `.env` file (contains sensitive configuration)
3. Backup database files in `prisma/dev.db`
4. Backup SSL certificates in `certs/` directory

## License

This application is proprietary software developed for Guidesoft. All rights reserved.