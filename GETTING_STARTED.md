# Getting Started - GuideIT Solutions AI SaaS Platform

## Quick Setup (5 minutes)

### 1. Prerequisites
- Node.js 18+ and pnpm (or npm/yarn)
- PostgreSQL 14+ (or use SQLite for development)
- Redis 6+ (optional, for caching)
- Docker Desktop (optional, for containerized setup)

### 2. Local Development Setup

```bash
# Clone the repository
git clone https://github.com/happies2012-cpu/guideitsol.com.git
cd guideitsol.com

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Setup database
pnpm run prisma:migrate
pnpm run prisma:seed

# Start dev server
pnpm run dev
```

Open http://localhost:3000 in your browser.

### 3. Docker Setup (Recommended)

```bash
# Start all services with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f app

# Access the app
open http://localhost:3000

# Stop services
docker-compose down
```

Services available:
- App: http://localhost:3000
- Redis: localhost:6379
- Adminer (DB UI): http://localhost:8080

## Project Structure Guide

```
src/
├── components/
│   ├── hero/           # Hero section with animations
│   ├── sliders/        # 8 animated background sliders
│   ├── chat/           # Chat interface
│   ├── dashboard/      # Dashboard components
│   ├── auth/           # Auth components
│   └── responsive/     # Responsive layouts
├── pages/              # Page components
├── hooks/              # Custom hooks (useResponsive, usePerformance, etc)
├── contexts/           # React contexts (AuthContext)
├── utils/              # Utilities (api.ts, validation.ts, storage.ts)
└── data/               # Mock data
```

## Key Components

### Hero Section
- Location: `src/components/hero/HeroSection.tsx`
- Features: Animated gradients, particle effects, floating elements
- Customization: Edit colors in `src/index.css` design tokens

### Animated Sliders (8 Slides)
- Location: `src/components/sliders/`
- Features: Auto-play, manual controls, progress indicators
- Slides:
  1. Neural Network - AI visualization
  2. Global Network - Enterprise connectivity
  3. Workspace - AI workspace design
  4. Cloud Infrastructure - Docker/cloud diagram
  5. Analytics - Dashboard visualization
  6. Automation - Workflow processes
  7. Ecosystem - Tech stack
  8. Future City - Futuristic design

### Chat Interface
- Location: `src/components/chat/`
- Features: Message history, streaming support, conversation management
- API: `api/conversations/` and `api/chat/message.ts`

### Dashboard
- Location: `src/components/dashboard/`
- Features: Stats cards, billing section, responsive layout
- Data: Connected to Prisma models

## API Endpoints Reference

### Authentication
```
POST   /api/auth/login          - User login
POST   /api/auth/signup         - User registration
POST   /api/auth/refresh        - Refresh JWT token
POST   /api/auth/logout         - User logout
```

### Conversations
```
GET    /api/conversations       - List conversations
POST   /api/conversations       - Create conversation
GET    /api/conversations/:id   - Get conversation
PUT    /api/conversations/:id   - Update conversation
DELETE /api/conversations/:id   - Delete conversation
```

### Messages
```
POST   /api/chat/message        - Send message
GET    /api/chat/message/:id    - Get message
DELETE /api/chat/message/:id    - Delete message
```

See `API.md` for complete endpoint documentation.

## Customization Guide

### Colors & Branding
Edit `src/index.css` to modify the design tokens:
```css
@theme {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --color-accent: #your-color;
}
```

### Database Models
Edit `prisma/schema.prisma` to add new models:
```prisma
model YourModel {
  id    String  @id @default(uuid())
  // Add fields here
}
```

Then run: `pnpm run prisma:migrate`

### API Endpoints
Add new endpoints in `api/` directory:
```typescript
export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request
  }
}
```

## Testing

```bash
# Run all tests
pnpm run test

# Watch mode
pnpm run test:watch

# Coverage
pnpm run test:coverage

# E2E tests
pnpm run test:e2e
```

## Performance Optimization

### Lighthouse Targets
- LCP (Largest Contentful Paint): < 2.5s ✓
- INP (Interaction to Next Paint): < 200ms ✓
- CLS (Cumulative Layout Shift): < 0.1 ✓

### Optimization Tips
1. Use React DevTools Profiler to identify slow components
2. Run `pnpm run analyze-bundle` to check bundle size
3. Enable Redis caching for API responses
4. Lazy load heavy components with dynamic imports

## Deployment

### Quick Deploy to Vercel
```bash
vercel deploy
```

### Deploy with Docker
```bash
docker build -t guideitsol:latest .
docker run -p 3000:3000 guideitsol:latest
```

### Deploy to Kubernetes
```bash
kubectl apply -f k8s/deployment.yaml
kubectl rollout status deployment/guideitsol-saas
```

See `DEPLOYMENT.md` for detailed strategies.

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Database Connection Issues
```bash
# Reset database
rm dev.db  # for SQLite
pnpm run prisma:migrate
```

### Node Modules Issues
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Docker Issues
```bash
# Clear Docker cache
docker system prune -a

# Rebuild
docker-compose build --no-cache
docker-compose up
```

## Environment Variables

Key variables to configure in `.env.local`:

```
# Server
NODE_ENV=development
PORT=3000
VITE_SITE_URL=http://localhost:3000

# Database
DATABASE_URL="file:./dev.db"  # SQLite
REDIS_URL="redis://localhost:6379"

# Auth
JWT_SECRET="your-secret-key-32-chars-min"
JWT_EXPIRES_IN=7d

# AI Services (Optional)
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."

# Payment (Optional)
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

See `.env.example` for all available options.

## Next Steps

1. **Setup:** Follow Quick Setup above
2. **Explore:** Check out the components in `src/components/`
3. **Customize:** Modify colors, content, and features
4. **Test:** Run the test suite with `pnpm run test`
5. **Deploy:** Use `DEPLOYMENT.md` for your hosting choice
6. **Monitor:** Check `TESTING.md` for performance testing

## Need Help?

- **Documentation:** See `README.md`, `API.md`, `DEPLOYMENT.md`
- **Issues:** Check GitHub Issues or create a new one
- **Email:** support@guideitsol.com

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

---

**Happy coding! 🚀**
