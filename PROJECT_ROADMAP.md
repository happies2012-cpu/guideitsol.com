# GS AI Platform - Project Roadmap

## Overview
Complete redesign of guideitsol.com into a modern AI platform showcasing AI tools, skills, trainings, and projects. Inspired by atom.com's clean design aesthetic.

## Key Requirements
- ✅ Dark/Light mode toggle
- ✅ Headerless CMS for dynamic content
- ✅ Cashfree + UPI payment gateway
- ✅ Firebase Auth system
- ✅ NO SQL Database (using Firebase Firestore)
- ✅ Ad posting/advertising system
- ✅ WebUI-style dashboard
- ✅ Modern AI platform design
- ❌ REMOVE: All travel-related content

## Architecture

### Tech Stack
- **Frontend**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS 3.4 + shadcn/ui
- **Database**: Firebase Firestore (No SQL)
- **Auth**: Firebase Authentication
- **Payments**: Cashfree + UPI (Razorpay alternative)
- **CMS**: Firebase + Dynamic JSON loading
- **Deployment**: Vercel/Coolify ready

### Design System

#### Colors (HSL)
- Primary: Purple/Violet (#8B5CF6)
- Secondary: Cyan (#06B6D4)
- Accent: Pink (#EC4899)
- Background Dark: #0F0F14
- Background Light: #FFFFFF
- Surface Dark: #1A1A24
- Surface Light: #F8FAFC

#### Typography
- Font: Inter + System fonts
- Headings: Bold, tight tracking
- Body: Regular weight, comfortable reading

### Pages Structure

1. **Home** - Hero, AI Tools showcase, Stats, Testimonials, CTA
2. **AI Tools** - Browse all AI tools with filters
3. **Skills** - Technical skills showcase
4. **Trainings** - Learning paths & courses
5. **Projects** - Portfolio with categories
6. **Dashboard** - WebUI-style user dashboard
7. **Auth Pages** - Login, Register, Forgot Password
8. **Ad Post** - Create & manage advertisements

### Sections

#### AI Tools Section
- Tool cards with icons, descriptions, categories
- Search and filter functionality
- Integration status indicators
- "Try Now" / "Learn More" CTAs

#### Skills Section  
- Categorized skill cards (Frontend, Backend, AI/ML, Cloud, etc.)
- Proficiency indicators
- Related tools & projects

#### Trainings Section
- Course cards with pricing
- Learning paths
- Progress tracking
- Certificate generation

#### Projects Section
- Filterable project gallery
- Category tabs (Web, Mobile, AI, Enterprise)
- Tech stack badges
- Live demo links

#### Ad Posting System
- Create ad with title, description, budget
- Target audience selection
- Payment via Cashfree/UPI
- Analytics dashboard

### Payment Integration

#### Cashfree Setup
- API keys configuration
- Payment gateway integration
- Webhook handling

#### UPI Integration
- QR code generation
- UPI deep links
- Transaction verification

### Auth Flow
- Email/Password
- Google OAuth
- Password reset
- Session management

## File Structure

```
src/
├── components/
│   ├── sections/          # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AIToolsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── TrainingsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   ├── dashboard/         # Dashboard components
│   ├── payments/          # Payment components
│   └── ads/               # Ad management
├── pages/
│   ├── Home.tsx
│   ├── AITools.tsx
│   ├── Skills.tsx
│   ├── Trainings.tsx
│   ├── Projects.tsx
│   ├── Dashboard.tsx
│   └── auth/              # Auth pages
├── lib/
│   ├── firebase.ts        # Firebase config
│   ├── cashfree.ts        # Cashfree integration
│   ├── cms.ts             # CMS utilities
│   └── data/              # Dynamic content JSON
├── hooks/
│   ├── useAuth.ts
│   ├── usePayments.ts
│   └── useCMS.ts
└── types/
    └── index.ts           # TypeScript types
```

## Implementation Phases

### Phase 1: Foundation
- [x] Design system update
- [ ] Firebase configuration
- [ ] Auth context setup
- [ ] Dark/Light theme toggle

### Phase 2: Core Pages
- [ ] New Home page
- [ ] AI Tools page
- [ ] Skills page
- [ ] Trainings page
- [ ] Projects page

### Phase 3: Dashboard & Auth
- [ ] Login/Register pages
- [ ] Dashboard layout
- [ ] User profile
- [ ] Ad management

### Phase 4: Payments
- [ ] Cashfree integration
- [ ] UPI QR payments
- [ ] Transaction history

### Phase 5: Polish
- [ ] Animations & transitions
- [ ] Responsive design
- [ ] Performance optimization
- [ ] SEO improvements

## Migration Notes

### Removed Content
- All travel-related pages (23 files)
- Travel solutions
- Travel navigation items
- Travel-specific components

### Retained & Updated
- AI Employees section → AI Tools section
- Core UI components
- Firebase auth infrastructure
- Payment components (updated for Cashfree/UPI)