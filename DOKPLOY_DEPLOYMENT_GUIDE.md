# 🚀 GuideIT Solutions - Dokploy Deployment Guide

## 📋 Overview

This guide provides complete instructions for deploying the GuideIT Solutions application to Dokploy using Docker. The application includes:

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express API
- **Database:** SQLite with Prisma ORM
- **Payment Gateways:** Razorpay, PayPal, PayU, UPI

---

## 🎯 Quick Start (Drag & Drop Deployment)

### Option 1: Direct Dokploy Deployment

1. **Prepare the Repository:**
   ```bash
   # Ensure all files are committed
   git add .
   git commit -m "Ready for Dokploy deployment"
   git push origin main
   ```

2. **Deploy to Dokploy:**
   - Open your Dokploy dashboard
   - Click "New Application"
   - Select "Git Repository"
   - Enter your repository URL
   - Dokploy will automatically detect the Dockerfile
   - Click "Deploy"

### Option 2: Docker Compose Deployment

1. **Upload Project Files:**
   - Compress the entire project: `tar -czf guidesoft.tar.gz .`
   - Upload to your Dokploy server
   - Extract: `tar -xzf guidesoft.tar.gz`

2. **Configure Environment:**
   ```bash
   # Copy environment template
   cp .env.docker .env
   
   # Edit with your credentials
   nano .env
   ```

3. **Deploy:**
   ```bash
   docker-compose up -d
   ```

---

## 🔧 Pre-Deployment Checklist

### ✅ Required Files (Already Included)

- [x] `Dockerfile` - Multi-stage production build
- [x] `docker-compose.yml` - Complete orchestration
- [x] `.dockerignore` - Optimized image size
- [x] `.env.docker` - Environment template
- [x] `package.json` - Dependencies
- [x] `server/` - Backend API
- [x] `src/` - Frontend source
- [x] `prisma/` - Database schema

### ✅ Environment Variables to Configure

**Required:**
- `JWT_SECRET` - Generate with: `openssl rand -base64 32`
- `VITE_SITE_URL` - Your production domain

**Payment Gateways (Already Configured):**
- `PAYU_MERCHANT_KEY=eBVOls`
- `PAYU_MERCHANT_SALT=BHRSfqjp536h47ZXQapuZ2aTpWtR2h5L`
- `UPI=8884162999-4@ybl`

**Optional:**
- `RAZORPAY_KEY_ID` - Razorpay credentials
- `RAZORPAY_KEY_SECRET`
- `PAYPAL_CLIENT_ID` - PayPal credentials
- `PAYPAL_CLIENT_SECRET`

---

## 🏗️ Build Process

The Dockerfile uses a multi-stage build:

### Stage 1: Frontend Build
```dockerfile
- Install dependencies
- Generate Prisma Client
- Build React app with Vite
- Output to /app/dist
```

### Stage 2: Production Runtime
```dockerfile
- Install production dependencies only
- Copy built frontend
- Copy backend server
- Set up non-root user
- Configure health checks
- Expose port 3000
```

---

## 🔐 Security Features

✅ **Non-root User:** Application runs as `nodejs:nodejs` (UID 1001)  
✅ **Health Checks:** Automatic container health monitoring  
✅ **Signal Handling:** Proper shutdown with dumb-init  
✅ **Volume Persistence:** Database and logs stored in named volumes  
✅ **Rate Limiting:** Built-in API rate limiting  
✅ **Helmet.js:** Security headers configured  
✅ **CORS:** Production-ready CORS configuration  

---

## 📦 Docker Image Details

**Base Image:** `node:20-alpine`  
**Image Size:** ~200MB (optimized)  
**Exposed Port:** 3000  
**Health Check:** `/api/health` endpoint  
**Restart Policy:** `unless-stopped`  

---

## 🗄️ Data Persistence

### Volumes Created:
1. **guidesoft-data** - SQLite database storage
2. **guidesoft-logs** - Application logs

### Volume Locations:
- Container: `/app/data/database.db`
- Host: Managed by Docker

### Backup Database:
```bash
# Backup
docker cp guidesoft-app:/app/data/database.db ./backup-$(date +%Y%m%d).db

# Restore
docker cp ./backup.db guidesoft-app:/app/data/database.db
```

---

## 🌐 Networking

**Container Network:** `guidesoft-network` (bridge)  
**Port Mapping:** `3000:3000`  
**Internal DNS:** Container accessible as `app` within network  

---

## 🔍 Health Monitoring

### Health Check Configuration:
- **Endpoint:** `http://localhost:3000/api/health`
- **Interval:** 30 seconds
- **Timeout:** 10 seconds
- **Retries:** 3
- **Start Period:** 40 seconds

### Check Health Status:
```bash
docker ps
docker inspect guidesoft-app | grep -A 10 Health
```

---

## 🚀 Deployment Commands

### Build and Run Locally:
```bash
# Build image
docker build -t guidesoft:latest .

# Run container
docker run -d \
  --name guidesoft-app \
  -p 3000:3000 \
  -v guidesoft-data:/app/data \
  -e JWT_SECRET=your-secret-here \
  guidesoft:latest
```

### Using Docker Compose:
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

---

## 📊 Monitoring & Logs

### View Logs:
```bash
# Real-time logs
docker logs -f guidesoft-app

# Last 100 lines
docker logs --tail 100 guidesoft-app

# With timestamps
docker logs -t guidesoft-app
```

### Container Stats:
```bash
# Resource usage
docker stats guidesoft-app

# Detailed info
docker inspect guidesoft-app
```

---

## 🔄 Updates & Maintenance

### Update Application:
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Or manually
docker build -t guidesoft:latest .
docker stop guidesoft-app
docker rm guidesoft-app
docker run -d --name guidesoft-app -p 3000:3000 guidesoft:latest
```

### Database Migrations:
```bash
# Run migrations
docker exec guidesoft-app npx prisma migrate deploy

# Generate Prisma Client
docker exec guidesoft-app npx prisma generate
```

---

## 🐛 Troubleshooting

### Container Won't Start:
```bash
# Check logs
docker logs guidesoft-app

# Inspect container
docker inspect guidesoft-app

# Check environment
docker exec guidesoft-app env
```

### Database Issues:
```bash
# Access container shell
docker exec -it guidesoft-app sh

# Check database file
ls -la /app/data/

# Run Prisma Studio
docker exec -it guidesoft-app npx prisma studio
```

### Port Already in Use:
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "3001:3000"
```

### Permission Issues:
```bash
# Fix volume permissions
docker exec -u root guidesoft-app chown -R nodejs:nodejs /app/data
```

---

## 🌍 Production Deployment Checklist

- [ ] Update `VITE_SITE_URL` to production domain
- [ ] Generate strong `JWT_SECRET`
- [ ] Configure SSL/TLS certificates (via Dokploy/Nginx)
- [ ] Set up domain DNS records
- [ ] Configure payment gateway credentials
- [ ] Enable production CORS origins
- [ ] Set up backup strategy for database
- [ ] Configure monitoring/alerting
- [ ] Test health check endpoint
- [ ] Verify all API routes working
- [ ] Test payment flows
- [ ] Review security headers
- [ ] Set up log rotation
- [ ] Configure rate limiting
- [ ] Test error handling

---

## 📞 Support & Resources

### Application URLs:
- **Frontend:** `http://localhost:3000`
- **API Health:** `http://localhost:3000/api/health`
- **Admin Panel:** `http://localhost:3000/admin`

### Default Credentials:
- **Email:** admin@guideitsol.com
- **Password:** admin123
- ⚠️ **Change immediately in production!**

### Documentation:
- `README.md` - Project overview
- `DEPLOYMENT_GUIDE.md` - General deployment
- `PAYMENT_GATEWAY_SETUP.md` - Payment configuration
- `SECURITY_IMPLEMENTATION.md` - Security features

### Contact:
- **Email:** support@guideitsol.com
- **Website:** https://guideitsol.com
- **Phone:** +91 93916 19158

---

## 🎉 Success Indicators

After deployment, verify:

✅ Container is running: `docker ps | grep guidesoft`  
✅ Health check passing: `docker inspect guidesoft-app | grep Health`  
✅ Application accessible: `curl http://localhost:3000/api/health`  
✅ Frontend loading: Open `http://localhost:3000` in browser  
✅ Database initialized: Check `/app/data/database.db` exists  
✅ Logs clean: `docker logs guidesoft-app` shows no errors  

---

## 🚀 Dokploy-Specific Instructions

### Method 1: Git Repository
1. Push code to GitHub/GitLab
2. In Dokploy: New Application → Git Repository
3. Enter repository URL
4. Set environment variables in Dokploy UI
5. Deploy

### Method 2: Docker Image
1. Build image: `docker build -t guidesoft:latest .`
2. Push to registry: `docker push your-registry/guidesoft:latest`
3. In Dokploy: New Application → Docker Image
4. Enter image name
5. Deploy

### Method 3: Docker Compose
1. Upload project to server
2. In Dokploy: New Application → Docker Compose
3. Paste `docker-compose.yml` content
4. Set environment variables
5. Deploy

---

## 📝 Notes

- **Database:** SQLite is used for simplicity. For production scale, consider PostgreSQL
- **File Storage:** Uploaded files stored in container. Consider S3/Cloud Storage for production
- **Scaling:** For horizontal scaling, migrate to external database
- **Backups:** Automated backup script recommended for production
- **SSL:** Configure via Dokploy's built-in SSL/Let's Encrypt

---

**Last Updated:** 2026-01-29  
**Version:** 1.0.0  
**Status:** Production Ready ✅
