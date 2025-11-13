# Guidesoft Website - cPanel Deployment

This package contains everything needed to deploy the Guidesoft website to cPanel hosting.

## Contents

- `frontend/` - Built React frontend files
- `backend/` - Node.js backend API files
- `node_modules/` - All required dependencies
- `server.js` - Main server file that serves both frontend and backend
- `package.json` - Project configuration with start script

## Deployment Instructions

1. Upload the entire contents of this folder to your cPanel hosting account
2. Make sure the `start` script is configured in your cPanel Node.js application:
   - Entry Point: `server.js`
   - Application Root: Path to this folder
3. Start the Node.js application in cPanel
4. The website will be available on your domain
5. The API will be accessible at `/api/` routes

## Default Login Credentials

Admin Panel:
- Email: `admin@guideitsol.com`
- Password: `admin123`

## Ports

The application runs on port 3000 by default. If your hosting requires a different port, you can set the PORT environment variable in cPanel.

## Support

For any issues, contact: praveen@guideitsol.com