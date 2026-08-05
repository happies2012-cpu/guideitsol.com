# GS Intelligence Ecosystem

A production-ready React and Express application for a modern AI services website with Stripe Checkout, webhook handling, and Vercel deployment support.

## 🚀 What is included

- Vite + React frontend with Tailwind CSS
- Express backend for API routes and secure Stripe endpoints
- One-time and recurring checkout sessions
- Stripe webhook verification
- Vercel deployment configuration and GitHub Actions workflows
- Security headers, rate limiting, and environment-based configuration

## 🛠 Tech stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Express, Node.js
- Payments: Stripe Checkout + Billing Portal
- Deployment: Vercel

## 📦 Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a local environment file from [.env.example](.env.example).
3. Start the app:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 💳 Stripe setup

See [STRIPE_SETUP.md](STRIPE_SETUP.md) for the full setup flow.

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) and [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md).

## ✅ Production checklist

See [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md).
