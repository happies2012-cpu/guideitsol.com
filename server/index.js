import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import https from 'https';
import fs from 'fs';
import path from 'path';
import authRoutes from './routes/auth.js';
import pagesRoutes from './routes/pages.js';
import navigationRoutes from './routes/navigation.js';
import aiToolsRoutes from './routes/ai-tools.js';
import aiToolsAdvancedRoutes from './routes/ai-tools-advanced.js';
import aiEnrollmentsRoutes from './routes/ai-enrollments.js';
import settingsRoutes from './routes/settings.js';
import formsRoutes from './routes/forms.js';
import reviewsRoutes from './routes/reviews.js';
import learningPathsRoutes from './routes/learning-paths.js';
import adminRoutes from './routes/admin.js';
import coursesRoutes from './routes/courses.js';
import aiIntegrationsRoutes from './routes/ai-integrations.js';
import userDashboardRoutes from './routes/user-dashboard.js';
import paypalRoutes from './routes/paypal.js';
import payuRoutes from './routes/payu.js';
import payuV2Routes from './routes/payu-v2.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS Configuration - Allow all origins for development, specific for production
const corsOptions = {
  origin: isProduction ? [
    'https://guidesoft.com',
    'https://www.guidesoft.com',
    'https://guideitsol.com',
    'https://www.guideitsol.com',
    'http://guideitsol.com',
    'http://www.guideitsol.com'
  ] : true,  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};
// Middleware
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: isProduction ? {
    directives: {
      defaultSrc: ["'self'", "blob:", "data:", "https:", "http:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "http://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "http://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "https:", "http:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:", "http:"],
      connectSrc: ["'self'", "https://api.guidesoft.com", "https://*.google-analytics.com", "https://*.googletagmanager.com", "https://checkout.razorpay.com", "https://www.paypal.com", "http:", "https:"],
      frameSrc: ["'self'", "https://*.google.com", "https://*.googleapis.com", "https://checkout.razorpay.com", "https://www.paypal.com", "http:", "https:"],
      objectSrc: ["'self'", "blob:", "data:", "https:", "http:"],
      mediaSrc: ["'self'", "https:", "http:"],
      childSrc: ["'self'", "blob:", "https:", "http:"],
    },
  } : false, // Disable CSP in development
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(limiter);
app.use(cors(corsOptions));

// Special route for Razorpay webhook (needs raw body)
app.use('/api/ai-enrollments/razorpay-webhook', express.raw({type: 'application/json'}));

// Special route for PayPal webhook (needs raw body)
app.use('/api/paypal/webhook', express.raw({type: 'application/json'}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(process.cwd(), 'dist')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/ai-tools', aiToolsRoutes);
app.use('/api/ai-tools-advanced', aiToolsAdvancedRoutes);
app.use('/api/ai-enrollments', aiEnrollmentsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/forms', formsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/learning-paths', learningPathsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/ai', aiIntegrationsRoutes);
app.use('/api/dashboard', userDashboardRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/api/payu', payuRoutes);
app.use('/api/payu-v2', payuV2Routes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server with HTTP only
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

export default app;