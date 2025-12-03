# Guidesoft IT Solutions - Website Enhancement Task List

## 1. OVERVIEW / GOALS

### Primary Goal
Update existing site content, SEO, and company data to the new Guidesoft copy (replace all old text). Do not rebuild site layout from scratch — update existing pages and components. Create new sections/pages only if they do not exist.

### Secondary Goals
- Fix non-working backend (DB, APIs)
- Restore payment gateway (PayU) real integration
- Seed with production-like test data (10+ items)
- Create super-admin access (securely)
- Ensure all links work
- Add minimal, premium UI improvements and smooth animations
- Optimize for AI-indexing and top-10 search visibility

### Deliverable
Production-ready live site (staging → production) with working payment flow, CMS dashboards, functioning SQL tables, admin access, SEO meta + schema, and QA checklist passed.

---

## 2. HIGH-PRIORITY ACTIONS (must be completed first)

- [ ] Backup current site & DB
  - [ ] Create full snapshot of files
  - [ ] Create DB backup
  - [ ] Store server images securely
- [ ] Deploy staging environment
  - [ ] Exact copy of production
  - [ ] Test all changes in staging
- [ ] Content replacement
  - [ ] Replace old company copy with new Guidesoft content
  - [ ] Update: Home, About, Services, Contact, Footer
  - [ ] Update: Meta tags, alt-texts, blog headers
  - [ ] Update: Canonical tags, robots, sitemap
- [ ] Fix backend connectivity
  - [ ] Restore DB connection strings
  - [ ] Ensure API endpoints are functional
  - [ ] Verify admin dashboards work
- [ ] PayU integration
  - [ ] Implement PayU v2 integration
  - [ ] Test endpoints: https://apitest.payu.in/v2/payments
  - [ ] Production endpoints: https://api.payu.in/v2/payments
- [ ] Create administrative user
  - [ ] Secure method (no plaintext credentials)
- [ ] Seed DB with 10+ realistic items
  - [ ] Verify UI lists, cards, product pages
- [ ] Full QA / acceptance
  - [ ] Link checks
  - [ ] Form submissions
  - [ ] Payment flow
  - [ ] SEO checks

---

## 3. DETAILED TASK BREAKDOWN

### Content Replacement Tasks
- [ ] Update hero text on Home page
- [ ] Replace service descriptions
- [ ] Update footer content
- [ ] Replace meta titles and descriptions
- [ ] Update image alt text
- [ ] Update schema markup (Organization, WebSite, BreadcrumbList, FAQ, Product)
- [ ] Create missing pages/components if needed
- [ ] Maintain existing design system/CSS components

### SEO & AI-indexing Tasks
- [ ] Add/overwrite meta title & meta description per page
- [ ] Add open graph tags and Twitter cards
- [ ] Add structured data:
  - [ ] Organization schema
  - [ ] WebSite schema (with searchAction)
  - [ ] Breadcrumb schema
  - [ ] Product schema (where relevant)
  - [ ] FAQ schema for FAQs page
- [ ] Ensure accessible headings (one H1 per page)
- [ ] Use semantic HTML
- [ ] Correct use of H2/H3
- [ ] Descriptive link text
- [ ] Image alt text with long-tail keywords
- [ ] Create /.well-known/ai-search.jsonld with company topic keywords

### Backend & DB Tasks
- [ ] Restore/fix DB connection strings
  - [ ] Use secrets manager or env vars
- [ ] Run DB migrations or create missing tables
  - [ ] Ensure migrations are idempotent
- [ ] Create API health endpoints
  - [ ] /api/health
  - [ ] /api/v1/status
  - [ ] Check DB, cache, payment gateway connectivity
- [ ] Implement role-based access control
  - [ ] Roles: superadmin, admin, editor, support
- [ ] Create missing tables:
  - [ ] users (id, name, email, password_hash, role, mfa_enabled, created_at, updated_at)
  - [ ] clients (id, name, industry, country, logo_url, short_desc, created_at)
  - [ ] projects (id, client_id, title, summary, tags, status, start_date, end_date, demo_url, created_at)
  - [ ] services (id, slug, title, description, seo_title, seo_description, created_at)
  - [ ] payments (id, order_id, user_id, amount, currency, status, payu_txn_id, gateway_response, created_at)
  - [ ] case_studies (id, title, summary, metrics_json, hero_image, created_at)
  - [ ] blog_posts (id, slug, title, content, author_id, published_at, seo_meta)
  - [ ] site_settings (id, key, value_json)

### Payment Integration Tasks
- [ ] Re-implement PayU v2 payment flow
  - [ ] Server-to-server REST calls
  - [ ] Sandbox endpoints for staging
  - [ ] Switch to production upon QA sign-off
- [ ] Implement verification webhooks
  - [ ] Server-side verification for every transaction
- [ ] Test flows:
  - [ ] Card payments
  - [ ] Netbanking
  - [ ] UPI (if enabled)
  - [ ] Recurring/subscription (if applicable)
- [ ] Security measures:
  - [ ] Never store raw card data
  - [ ] Use PayU tokenization or vault models
  - [ ] Use HTTPS, signed payloads
  - [ ] Verify webhooks via signature/HMAC

### Super Admin Account Tasks
- [ ] Create secure admin via CLI script
  - [ ] Script reads password from env var
  - [ ] Example: ./manage.sh create-admin --email admin@example.com --fullname "Super Admin"
- [ ] If temporary credential needed:
  - [ ] Create expiring credential
  - [ ] Rotate immediately after launch
  - [ ] Enforce MFA for superadmin accounts
- [ ] Store password only in secure vault

### Dummy & Real-like Seed Data Tasks
- [ ] Seed DB with 10+ realistic items
  - [ ] Clients
  - [ ] Case studies
  - [ ] Products
  - [ ] Blog posts
- [ ] Use open-source public datasets
- [ ] Create script: scripts/seed_sample_data.sh
- [ ] Ensure no copyrighted full text (summaries OK)

### UI & Animations Tasks
- [ ] Add subtle micro-animations
  - [ ] Lottie for hero illustration
  - [ ] Framer Motion/GSAP for card hover reveals
  - [ ] Section transitions
  - [ ] Skeleton loaders for slow APIs
  - [ ] Smooth pagination transitions
- [ ] Provide CSS classes and accessibility fallback
  - [ ] Reduced-motion users support

### Testing & QA Tasks
- [ ] Unit tests for payment verification logic
- [ ] Integration test for webhook handling
- [ ] E2E test for checkout flow
- [ ] Link check: CSV of all links, confirm 100% status 200 in staging
- [ ] SEO check: generate page-perf report (Lighthouse)
- [ ] Coverage for meta and schema

---

## 4. DELIVERABLES

- [ ] Staging URL with changes applied
- [ ] Migration scripts & seed scripts
- [ ] Admin creation script & README for deployment
- [ ] QA report checklist and sign-off
- [ ] Deployment guide to production
  - [ ] How to rotate PayU credentials
  - [ ] How to switch endpoints
- [ ] Acceptance Criteria verification:
  - [ ] All items in "Testing & QA" pass
  - [ ] Staging demo with working transactions
  - [ ] Admin access created securely
  - [ ] All pages replaced/updated
  - [ ] Sitemap and robots updated
  - [ ] Performance score ≥ 90 on mobile and desktop (Lighthouse)

---

## 5. PAYU INTEGRATION - KEY TECH STEPS

### Merchant Setup
- [ ] Obtain merchantKey/merchantSalt from PayU merchant panel
- [ ] Obtain OAuth Client ID/Secret from PayU merchant panel

### Server-to-server Flow
- [ ] POST to https://apitest.payu.in/v2/payments (staging)
- [ ] POST to https://api.payu.in/v2/payments (production)
- [ ] Include order/payer details
- [ ] Parse response
- [ ] Redirect to PayU hosted checkout or render payment form

### Verification
- [ ] Use verification APIs/webhook to confirm payment status
- [ ] Server-side verification to avoid client spoofing

### UPI & Non-seamless Flows
- [ ] Follow PayU UPI server-to-server guide for S2S UPI
- [ ] Test via v2 docs

### Security
- [ ] Never store raw card data
- [ ] Use PayU tokenization or vault models
- [ ] Use HTTPS, signed payloads
- [ ] Verify webhooks via signature/HMAC

### Test Cases
- [ ] Success
- [ ] Failure
- [ ] Network timeout
- [ ] Duplicate callback
- [ ] Partial capture/refund
- [ ] Subscription renewals (if applicable)

### Production Deployment
- [ ] Change endpoints to production URLs
- [ ] Rotate credentials
- [ ] Run smoke tests

---

## 6. SECURE SUPER-ADMIN CREATION

### Recommended Approach (Option A)
- [ ] Create admin via CLI script that reads password from env var
- [ ] Set on server env (not in repo):
  ```bash
  export GUIDESOFT_SUPERADMIN_EMAIL="pranu21m@gmail.com"
  export GUIDESOFT_SUPERADMIN_PASS="$(openssl rand -base64 16)"
  ```
- [ ] Run script:
  ```bash
  ./manage.sh create-admin --email "$GUIDESOFT_SUPERADMIN_EMAIL" --password "$GUIDESOFT_SUPERADMIN_PASS" --role superadmin
  ```

### Alternative Approach (Option B)
- [ ] If dev must set temp password, mark it temporary
- [ ] Rotate immediately after launch
- [ ] Enforce MFA
- [ ] Save password only in secure vault

---

## 7. DATABASE SCHEMA REQUIREMENTS

### Required Tables
- [ ] users
- [ ] clients
- [ ] projects
- [ ] services
- [ ] payments
- [ ] case_studies
- [ ] blog_posts
- [ ] site_settings

### Indexes
- [ ] Email indexes
- [ ] Slug indexes
- [ ] Foreign key indexes

### Constraints
- [ ] Use transactions
- [ ] Use FK constraints

---

## 8. SAMPLE SEED DATA

### Clients (10 items)
- [ ] Acme Retail Ltd
- [ ] Orbit Health
- [ ] Finova Pay
- [ ] GreenGrid Energy
- [ ] EduNext
- [ ] MarketPulse
- [ ] LogiShip
- [ ] FarmSense
- [ ] TravelMate
- [ ] CareBridge

### Projects (10 items)
- [ ] AI Personalization Engine
- [ ] Teleconsult Mobile App
- [ ] [Additional 8 projects to be defined]

---

## 9. UI/ANIMATION & UX SUGGESTIONS

### Hero Section
- [ ] Dark-mode optional
- [ ] Subtle Lottie animation
- [ ] Strong H1
- [ ] Two CTAs

### Cards
- [ ] 2-column grid on desktop for services
- [ ] Hover elevation
- [ ] Soft slide-up (Framer Motion/CSS transform)

### Navigation
- [ ] Sticky header
- [ ] Simple dropdowns
- [ ] Quick "Book Demo" CTA highlighted

### Micro-interactions
- [ ] Button hover
- [ ] Skeleton loaders
- [ ] Focus outlines for accessibility

### Animations
- [ ] Framer Motion (React) or GSAP for section transitions
- [ ] Lottie for illustrations
- [ ] Respect prefers-reduced-motion
