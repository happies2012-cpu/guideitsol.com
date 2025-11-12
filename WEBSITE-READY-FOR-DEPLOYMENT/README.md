# Guidesoft Website - Ready for Deployment

This directory contains the built and optimized version of the Guidesoft website, ready for deployment to production servers.

## Recent Accessibility Fixes

The website has been updated to resolve issues with ad blockers and browser compatibility:

1. **Simplified robots.txt** - Changed to a universally accepted format
2. **Updated Content Security Policy** - Balanced security with functionality
3. **Cleaned HTML meta tags** - Removed potentially problematic identifiers

## Deployment Instructions

1. Copy all files in this directory to your web server's public directory
2. Ensure proper file permissions (755 for directories, 644 for files)
3. Configure your web server to serve index.html for all routes (SPA routing)

## Server Configuration

If using the backend server:
1. Ensure the server is running on the correct port
2. Configure SSL certificates for HTTPS in production
3. Set appropriate CORS headers for cross-origin requests

## Testing

After deployment, verify:
- Site loads correctly in all major browsers
- No content is blocked by ad blockers
- All interactive elements work properly
- Mobile responsiveness is maintained

## Support

For deployment issues or questions, please refer to:
- [SITE_ACCESSIBILITY_FIXES.md](file:///Users/mac/Desktop/guideitsol.com/SITE_ACCESSIBILITY_FIXES.md) for detailed fix information
- [WEBSITE_ACCESSIBILITY_README.md](file:///Users/mac/Desktop/guideitsol.com/WEBSITE_ACCESSIBILITY_README.md) for comprehensive documentation