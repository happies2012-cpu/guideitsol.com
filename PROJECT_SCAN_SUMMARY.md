# Project Scan Summary - GuideIT Solutions

**Date:** 2026-01-29  
**Status:** ✅ Successfully Built and Running

---

## 🎯 Project Overview

**GuideIT Solutions** is a comprehensive full-stack web application built with modern technologies, offering IT solutions, travel technology, AI integration, and custom software development services.

### Technology Stack

- **Frontend:** React 18.3.1 + TypeScript + Vite 7.2.6
- **UI Framework:** Tailwind CSS + Radix UI Components
- **Backend:** Node.js + Express 5.1.0
- **Database:** SQLite (Development) with Prisma ORM 6.17.1
- **Authentication:** JWT + bcryptjs
- **Payment Gateways:** Razorpay, PayPal, PayU, UPI
- **Desktop App:** Electron 39.1.2
- **Animation:** Framer Motion 11.18.2
- **State Management:** TanStack Query 5.83.0

---

## 📁 Project Structure

```
/Users/mac/guideitsol.com/
├── src/                          # Frontend source code
│   ├── components/               # React components (51 files)
│   ├── pages/                    # Page components (30 directories)
│   ├── hooks/                    # Custom React hooks (10 files)
│   ├── lib/                      # Utility functions (13 files)
│   ├── contexts/                 # React contexts
│   ├── services/                 # API services
│   ├── assets/                   # Images, icons, etc (40 files)
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
│
├── server/                       # Backend Express server
│   ├── routes/                   # API routes (17 files)
│   ├── middleware/               # Express middleware
│   ├── db/                       # Database configuration
│   ├── views/                    # Server-side views
│   └── index.js                  # Server entry point
│
├── scripts/                      # Build & deployment scripts (33 files)
│   ├── build-production.js       # Production build script
│   ├── deploy-dokploy.js         # Dokploy deployment
│   ├── auto-generate-sitemap.js  # SEO sitemap generator
│   ├── create-super-admin.js     # Admin user creation
│   └── [28+ more scripts]
│
├── prisma/                       # Database schema & migrations
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Database migrations
│   └── data/                     # Seed data
│
├── electron/                     # Electron desktop app
│   ├── main.js                   # Electron main process
│   └── preload.js                # Preload scripts
│
├── public/                       # Static assets
│   ├── favicon.png               # Site favicon
│   └── .well-known/              # AI search index
│
├── cpanel-deployment/            # cPanel deployment package
│   ├── frontend/                 # Built frontend files
│   ├── backend/                  # Backend API files
│   └── server.js                 # Combined server
│
├── WEBSITE-READY-FOR-DEPLOYMENT/ # Production build output
│   ├── assets/                   # Compiled assets (96 files)
│   ├── server/                   # Server files
│   └── index.html                # Entry HTML
│
├── marketing_assets/             # Marketing materials (10 files)
├── data/                         # Application data
└── dist/                         # Vite build output

```

---

## 🚀 Current Running Status

### ✅ Applications Running

1. **Frontend (Vite Dev Server)**
   - URL: http://localhost:8080/
   - Network: http://192.168.1.102:8080/
   - Status: ✅ Running
   - Hot Module Replacement: Enabled

2. **Backend API Server**
   - URL: http://localhost:3001
   - Status: ✅ Running
   - Auto-restart: Enabled (nodemon)
   - Static files: Serving from `/dist`

---

## 📊 Build Statistics

### Production Build Summary
- **Total Build Time:** 7.71 seconds
- **Total Assets:** 200+ files
- **Largest Bundle:** 442.63 kB (index-PfXzqjOc.js)
- **Vendor Bundle:** 312.65 kB (gzipped: 96.16 kB)
- **Home Page:** 242.90 kB (gzipped: 49.82 kB)

### Key Features Built
- ✅ 150+ pages and components
- ✅ Multiple service pages (web dev, app dev, travel tech, etc.)
- ✅ Portfolio showcase
- ✅ Blog system
- ✅ Admin dashboard
- ✅ Payment integration (4 gateways)
- ✅ AI learning modules
- ✅ Career portal
- ✅ Contact forms
- ✅ SEO optimized pages

---

## 🔧 Available NPM Scripts

### Development
```bash
npm run dev              # Start Vite dev server
npm run server:dev       # Start backend with nodemon
npm run start:all        # Start both frontend & backend (Currently Running)
```

### Building
```bash
npm run build            # Production build
npm run build:dev        # Development build
npm run build:prod       # Production build with script
npm run build:docker     # Docker build
```

### Database
```bash
npm run prisma:migrate   # Run database migrations
npm run prisma:generate  # Generate Prisma client
npm run prisma:studio    # Open Prisma Studio
```

### Deployment
```bash
npm run deploy:dokploy   # Deploy to Dokploy
npm run deploy:direct    # Direct deployment
npm run deploy:payments  # Deploy payment features
```

### Electron
```bash
npm run electron:dev     # Run Electron app
npm run electron:build   # Build Electron app
npm run electron:dist    # Create distribution
```

### Utilities
```bash
npm run generate:sitemap # Generate SEO sitemap
npm run create:super-admin # Create admin user
npm run create:test-user # Create test user
npm run test:payments    # Test payment integration
```

---

## 🔐 Environment Configuration

### Current Environment Variables (.env)
```env
NODE_ENV=development
DATABASE_URL=file:./data/database.db
JWT_SECRET=development-jwt-secret-key
PAYU_MERCHANT_KEY=test_merchant_key
PAYU_MERCHANT_SALT=test_merchant_salt
PAYU_BASE_URL=https://sandboxsecure.payu.in/_payment
```

### Required for Production
- PAYU_MERCHANT_KEY (Production key)
- PAYU_MERCHANT_SALT (Production salt)
- RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET
- Database connection string
- JWT secret

---

## 📦 Key Dependencies

### Frontend Core
- react: ^18.3.1
- react-dom: ^18.3.1
- react-router-dom: ^6.30.1
- vite: ^7.2.6
- typescript: ^5.9.3

### UI & Styling
- tailwindcss: ^3.4.17
- framer-motion: ^11.18.2
- lucide-react: ^0.462.0
- @radix-ui/* (20+ components)

### Backend
- express: ^5.1.0
- prisma: ^6.17.1
- @prisma/client: ^6.17.1
- bcryptjs: ^3.0.3
- jsonwebtoken: ^9.0.2

### Payment Integration
- @paypal/react-paypal-js: ^8.9.2
- react-razorpay: ^3.0.1
- axios: ^1.12.2

### Desktop
- electron: ^39.1.2
- electron-builder: ^26.0.12

---

## 🎨 Key Features

### 1. **Multi-Service Platform**
- Web Development Services
- Mobile App Development
- Travel Technology Solutions
- AI & ML Integration
- IT Consulting
- Data Engineering
- E-commerce Solutions

### 2. **Payment Integration**
- ✅ Razorpay (Cards, Wallets, NetBanking)
- ✅ PayPal (International Payments)
- ✅ PayU (India's Leading Gateway)
- ✅ UPI Direct Payments

### 3. **Admin Features**
- User Management
- Content Management
- Analytics Dashboard
- Payment Tracking
- Blog Management

### 4. **SEO Optimized**
- Dynamic sitemap generation
- Meta tags optimization
- Schema.org markup
- AI search index
- Canonical URLs

### 5. **Security Features**
- JWT Authentication
- Password encryption (bcrypt)
- Rate limiting
- CORS protection
- Helmet.js security headers
- Right-click protection
- DevTools detection

---

## 📱 Deployment Options

### Available Deployment Targets
1. **Docker** - Dockerfile & docker-compose.yml included
2. **Dokploy** - Configuration in dokploy.json
3. **Coolify** - Configuration in coolify.json
4. **cPanel** - Package in cpanel-deployment/
5. **Vercel** - Configuration in .vercel/
6. **GitHub Pages** - Setup guide available

---

## ⚠️ Warnings & Issues

### Build Warnings
1. **Duplicate Script Key:** `deploy:dokploy` appears twice in package.json (lines 16 & 38)
2. **Deprecated Packages:** Several npm packages need updates
3. **Security Vulnerabilities:** 17 vulnerabilities (1 moderate, 16 high)
   - Run `npm audit fix` to address

### Recommendations
1. Update Prisma to latest version (7.3.0)
2. Fix duplicate script keys in package.json
3. Run `npm audit fix` for security patches
4. Update baseline-browser-mapping package

---

## 🎯 Default Credentials

### Admin Panel
- **Email:** admin@guideitsol.com
- **Password:** admin123

### Test Users
See `TEST_USERS.md` for complete list

---

## 📞 Contact Information

- **Email:** support@guideitsol.com
- **Website:** https://guideitsol.com
- **Phone:** +91 93916 19158
- **Developer:** praveen@guideitsol.com

---

## 🔄 Git Status

- **Current Branch:** main
- **Last Commit:** 061d82d - "chore: make canonical dynamic via VITE_SITE_URL and add marketing subdomain to CORS"
- **Remote:** origin/main (synced)

---

## ✅ Next Steps

1. **Access the Application:**
   - Frontend: http://localhost:8080/
   - Backend API: http://localhost:3001

2. **Fix Package.json:**
   - Remove duplicate `deploy:dokploy` script

3. **Security Updates:**
   - Run `npm audit fix`
   - Update vulnerable dependencies

4. **Production Deployment:**
   - Update environment variables
   - Run production build
   - Deploy to chosen platform

5. **Database Setup:**
   - Run migrations: `npm run prisma:migrate`
   - Create admin user: `npm run create:super-admin`

---

## 📚 Documentation Files

- `README.md` - Main project documentation
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `PAYMENT_GATEWAY_SETUP.md` - Payment integration guide
- `SECURITY_IMPLEMENTATION.md` - Security features
- `SEO_MAINTENANCE_GUIDE.md` - SEO best practices
- `TASK_LIST.md` - Pending tasks
- `TODO.md` - Todo items
- `QA_CHECKLIST.md` - Quality assurance checklist

---

**Generated on:** 2026-01-29 at 15:17 IST  
**Scan completed successfully!** ✅
