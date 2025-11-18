# Guidesoft - AI-Powered Business Solutions

Welcome to Guidesoft, an advanced AI-powered platform offering cutting-edge business solutions, educational tools, and development services.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Payment Integration](#payment-integration)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

Guidesoft is a comprehensive platform that combines artificial intelligence with modern web technologies to deliver innovative solutions for businesses and learners. Our platform offers:

- AI-powered tools and services
- Educational content and courses
- Development services and consulting
- Secure payment processing

## Features

- **AI Tools**: Advanced AI-powered applications for various business needs
- **Educational Content**: Comprehensive learning paths and courses
- **Responsive Design**: Mobile-first, responsive UI components
- **Secure Payments**: Multiple payment options including Razorpay, PayPal, and PayU
- **User Management**: Authentication and authorization system
- **Admin Dashboard**: Comprehensive admin panel for managing content

## Payment Integration

### Current Payment Providers

1. **Razorpay**: Primary payment gateway for card and wallet payments
2. **PayPal**: International payment processing
3. **UPI**: Direct UPI payments
4. **PayU**: Comprehensive payment solution for Indian businesses

### PayU Integration

This project includes full integration with PayU, India's leading payment gateway provider.

#### Features Implemented:
- PayU payment processing
- Mobile SDK downloads for Android and iOS
- Production setup documentation
- Security-compliant implementation

#### PayU Setup:
1. Configure environment variables in `.env`:
   ```env
   PAYU_MERCHANT_KEY="your-merchant-key"
   PAYU_MERCHANT_SALT="your-merchant-salt"
   ```

2. For production deployment, follow the detailed guide in [PAYU_PRODUCTION_SETUP.md](PAYU_PRODUCTION_SETUP.md)

3. Access SDK downloads at `/company/payu-mobile-sdk`

#### Documentation:
- [PayU Merchant Terms and Conditions](/company/merchant-terms-service-fee)
- [PayU Protection Fund Claims Procedure](/company/merchant-customer-protection-fund)
- [PayU Banned & Restricted Businesses](/company/banned-restricted-businesses)
- [PayU List of Issuers](/company/list-issuers-payment-mechanisms)
- [PayU Split Pay Terms](/company/terms-conditions-split-pay)
- [PayU Merchant Terms (IHC)](/company/merchant-terms-internet-handling-charge)
- [PayU UPI Technology Components](/company/components-optional-technology-services-upi)
- [PayU Bundled Packages Terms](/company/terms-conditions-bundled-packages)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- SQLite (for development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/guideitsol.com.git
   cd guideitsol.com
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

5. Start the development server:
   ```bash
   npm run start:all
   ```

## Project Structure

```
guideitsol.com/
├── server/              # Backend Express application
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   └── db/              # Database configuration
├── src/                 # Frontend React application
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── lib/             # Utility functions
│   └── hooks/           # Custom React hooks
├── prisma/              # Database schema and migrations
├── public/              # Static assets
└── scripts/             # Utility scripts
```

## Deployment

### Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables in `.env.production`

3. Start the production server:
   ```bash
   NODE_ENV=production npm run server
   ```

### Deployment Options

- [Coolify Deployment](COOLIFY_DEPLOYMENT.md)
- [GitHub Pages Setup](GITHUB_PAGES_SETUP.md)
- [CPanel Deployment](cpanel-deployment/README.md)

## Contributing

We welcome contributions to Guidesoft! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact:
- Email: support@guideitsol.com
- Website: https://guideitsol.com