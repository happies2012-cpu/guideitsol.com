# Deployment Guide

## Overview

This guide covers deploying GuideIT Solutions AI SaaS platform to various environments.

## Table of Contents

1. [Local Development](#local-development)
2. [Docker Deployment](#docker-deployment)
3. [Kubernetes Deployment](#kubernetes-deployment)
4. [Vercel Deployment](#vercel-deployment)
5. [AWS Deployment](#aws-deployment)
6. [Environment Variables](#environment-variables)

## Local Development

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- PostgreSQL 14+ (or SQLite)
- Redis 6+

### Setup

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your local config

# Setup database
pnpm run prisma:migrate

# Seed database (optional)
pnpm run prisma:seed

# Start development server
pnpm run dev
```

## Docker Deployment

### Build Docker Image

```bash
# Build production image
docker build -t guideitsol/saas:latest .

# Tag for registry
docker tag guideitsol/saas:latest your-registry/guideitsol/saas:latest

# Push to registry
docker push your-registry/guideitsol/saas:latest
```

### Run with Docker Compose

```bash
# Development with full stack
docker-compose up -d

# Production
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

## Kubernetes Deployment

### Prerequisites

- kubectl configured
- Kubernetes cluster (1.24+)
- Docker registry access

### Deploy

```bash
# Create namespace
kubectl create namespace production

# Create secrets
kubectl create secret generic guideitsol-secrets \
  --from-literal=database-url='postgresql://...' \
  --from-literal=api-key='...' \
  -n production

# Deploy application
kubectl apply -f k8s/deployment.yaml -n production

# Check deployment status
kubectl rollout status deployment/guideitsol-saas -n production

# View pods
kubectl get pods -n production

# View logs
kubectl logs -f deployment/guideitsol-saas -n production
```

### Scaling

```bash
# Manual scaling
kubectl scale deployment guideitsol-saas --replicas=5 -n production

# HPA (Horizontal Pod Autoscaler) is configured in deployment.yaml
# HPA automatically scales between 3-10 replicas based on CPU/memory
```

## Vercel Deployment

### Prerequisites

- Vercel account
- GitHub repository connected

### Setup

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel project settings
3. Configure build and start commands:
   - Build: `pnpm run build`
   - Start: `node dist/server.js`

### Deploy

```bash
# Deploy via Vercel CLI
vercel deploy --prod

# Or push to GitHub (auto-deploys)
git push origin main
```

## AWS Deployment

### Option 1: ECS (Elastic Container Service)

```bash
# Create ECR repository
aws ecr create-repository --repository-name guideitsol-saas

# Build and push image
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag guideitsol/saas:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/guideitsol-saas:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/guideitsol-saas:latest

# Deploy with CloudFormation or ECS Console
```

### Option 2: Elastic Beanstalk

```bash
# Initialize EB
eb init -p node.js-20 guideitsol-saas

# Create environment
eb create production-env

# Deploy
eb deploy
```

### Option 3: Lambda + API Gateway

```bash
# Build serverless package
pnpm run build:serverless

# Deploy with Serverless Framework
serverless deploy --stage prod
```

## Environment Variables

### Required

- `NODE_ENV`: Set to 'production'
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT signing
- `REDIS_URL`: Redis connection URL

### Optional

- `SMTP_*`: Email configuration
- `PAYU_*`, `RAZORPAY_*`, `PAYPAL_*`: Payment gateway keys
- `OPENAI_API_KEY`: OpenAI API key
- `SENTRY_DSN`: Error tracking

## Monitoring & Logging

### Application Logs

```bash
# View application logs
docker logs <container-id>

# Or with kubectl
kubectl logs deployment/guideitsol-saas -n production
```

### Health Checks

```bash
# Check application health
curl http://localhost:3000/api/health

# Check readiness
curl http://localhost:3000/api/ready
```

### Metrics

- CPU and memory usage
- Request latency
- Error rates
- Database connection pool
- Cache hit rates

## Scaling Strategy

1. **Vertical Scaling**: Increase instance size
2. **Horizontal Scaling**: Add more instances/pods
3. **Database Scaling**: Read replicas, connection pooling
4. **Cache Scaling**: Redis cluster

## Disaster Recovery

### Backup

```bash
# Backup database
pg_dump guideitsol > backup.sql

# Backup to S3
aws s3 cp backup.sql s3://backups/guideitsol/
```

### Restore

```bash
# Restore from backup
psql guideitsol < backup.sql

# From S3
aws s3 cp s3://backups/guideitsol/backup.sql . && psql guideitsol < backup.sql
```

## Performance Optimization

### Caching Strategy

- Cache static assets (30 days)
- Cache API responses (1 hour)
- Use Redis for session storage

### Database Optimization

- Create indexes on frequently queried columns
- Use connection pooling
- Enable query caching

### Code Optimization

- Code splitting
- Tree shaking
- Minification

## Security Checklist

- [ ] All secrets stored in environment variables
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Input validation enabled
- [ ] SQL injection prevention (using parameterized queries)
- [ ] CSRF protection enabled
- [ ] Security headers configured
- [ ] Regular security audits

## Troubleshooting

### Pod keeps restarting

```bash
kubectl logs deployment/guideitsol-saas -n production --previous
kubectl describe pod <pod-name> -n production
```

### Database connection errors

- Check DATABASE_URL format
- Verify network connectivity
- Check database credentials
- Review connection pool settings

### High CPU usage

- Enable profiling
- Review slow queries
- Check for memory leaks
- Consider scaling

## Support

For deployment issues, contact:
- Email: support@guideitsol.com
- Slack: #deployment-help
