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

// CORS Configuration
const corsOptions = {
  origin: isProduction ? [
    'https://guidesoft.com',
    'https://www.guidesoft.com',
    'https://guideitsol.com',
    'https://www.guideitsol.com'
  ] : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

// Middleware
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.guidesoft.com"],
    },
  },
  crossOriginEmbedderPolicy: false
}));
app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server with HTTPS in production
if (isProduction) {
  try {
    const options = {
      key: fs.readFileSync(path.join(process.cwd(), 'certs', 'server.key')),
      cert: fs.readFileSync(path.join(process.cwd(), 'certs', 'server.crt'))
    };
    
    https.createServer(options, app).listen(PORT, () => {
      console.log(`Backend server running on https://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('HTTPS certificates not found, falling back to HTTP');
    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  }
} else {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

export default app;