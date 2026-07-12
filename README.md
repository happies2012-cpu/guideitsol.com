# GuideIT Solutions

A comprehensive AI-powered IT services platform featuring training programs, AI tools marketplace, and enterprise solutions. Built with modern technologies for digital transformation.

## 🚀 Key Features

- **AI Training Programs**: Expert-led courses in Machine Learning, LLM Engineering, MLOps, and Generative AI
- **AI Tools Marketplace**: Curated collection of 24+ production-ready AI tools (GPT-4, Claude, LangChain, Ollama, etc.)
- **Open Source CMS Marketplace**: 24+ self-hostable platforms (Strapi, Supabase, Payload, NocoDB, etc.)
- **Enterprise Solutions**: Custom software development, consulting, and digital transformation
- **Payment Integration**: Secure PayU India payment gateway with UPI support
- **Modern UI/UX**: Responsive design with Framer Motion animations

## 🛠 Tech Stack

- **Frontend**: React 19, Vite 6, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context + TanStack Query
- **Backend**: Express.js with Prisma ORM
- **Database**: SQLite (dev) / PostgreSQL (production)
- **Auth**: JWT with Firebase/Supabase options
- **Payments**: PayU India, PayPal, Razorpay, UPI

## 📦 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── seo/          # SEO components (Meta, StructuredData)
│   ├── ui/           # shadcn/ui components
│   └── navigation/    # Navigation components
├── contexts/          # React contexts (Auth, Theme, Animation)
├── data/             # Application data models
├── hooks/             # Custom React hooks
├── lib/              # Utilities, API helpers, payment utils
├── pages/            # Page components
│   ├── ai-tools/      # AI Tools Marketplace
│   ├── ai-training/  # Training programs
│   ├── open-source/  # OSS CMS Marketplace
│   └── services/     # Service pages
├── services/         # Core services (security, API)
└── types/            # TypeScript definitions
```

## 🛠 Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/happies2012-cpu/guideitsol.com.git
   cd guideitsol.com
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

6. **Build for Production**:
   ```bash
   npm run build
   ```

## 📁 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/ai-training` | AI Training Programs Overview |
| `/ai-tools` | AI Tools Marketplace |
| `/ai-tools/:category` | Filter by AI tool category |
| `/open-source` | Open Source Platforms Hub |
| `/open-source/cms` | CMS & BaaS Marketplace |
| `/services` | Service Offerings |
| `/portfolio` | Project Portfolio |
| `/blog` | Blog Articles |
| `/contact` | Contact Form |
| `/dashboard` | User Dashboard |
| `/login` | User Login |
| `/register` | User Registration |

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker build -t guideitsol .
docker run -p 3000:3000 guideitsol
```

### Dokploy
Import `dokploy.json` from project root.

## 🔒 Security Measures

- JWT-based authentication with secure token handling
- Role-based access control (RBAC)
- Rate limiting on API endpoints
- Helmet.js security headers
- Input validation with express-validator
- CORS configuration

## 📬 Contact & Support

- **Website**: [guideitsol.com](https://guideitsol.com)
- **Support**: support@guideitsol.com
- **Phone**: +91 8500647979

---
© 2024 GuideIT Solutions. All Rights Reserved.