# Guidesoft IT Solutions - Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [PayU Integration](#payu-integration)
5. [Admin User Creation](#admin-user-creation)
6. [Content Seeding](#content-seeding)
7. [Application Deployment](#application-deployment)
8. [Post-Deployment Tasks](#post-deployment-tasks)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying the application, ensure you have:

- Node.js 18.x or higher
- npm or yarn package manager
- SQLite (for development) or PostgreSQL (for production)
- Git
- OpenSSL (for generating SSL certificates)
- A PayU merchant account

## Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd guidesoft-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure the following environment variables:

### Database Configuration
```env
# Database configuration
DATABASE_URL="file:./dev.db"  # For SQLite
# DATABASE_URL="postgresql://user:password@localhost:5432/guidesoft"  # For PostgreSQL
```

### PayU Configuration
```env
# PayU Configuration
PAYU_MERCHANT_KEY="your-merchant-key"
PAYU_MERCHANT_SALT="your-merchant-salt"
PAYU_AUTH_HEADER="your-auth-header"
PAYU_ENV="test"  # or "production"
```

### Admin Configuration
```env
# Admin credentials (for development only)
GUIDESOFT_SUPERADMIN_EMAIL="admin@example.com"
GUIDESOFT_SUPERADMIN_PASS="secure-password"
```

## Database Configuration

1. Run database migrations:
```bash
npx prisma migrate dev
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. (Optional) Seed the database with sample data:
```bash
node scripts/seed_sample_data.js
```

## PayU Integration

### Test Environment Setup

1. Obtain test credentials from PayU:
   - Merchant Key
   - Merchant Salt
   - Auth Header

2. Update `.env` file with test credentials:
```env
PAYU_MERCHANT_KEY="your-test-merchant-key"
PAYU_MERCHANT_SALT="your-test-merchant-salt"
PAYU_AUTH_HEADER="your-test-auth-header"
PAYU_ENV="test"
```

3. Test endpoints:
   - Sandbox: `https://apitest.payu.in/v2/payments`

### Production Environment Setup

1. Obtain production credentials from PayU:
   - Merchant Key
   - Merchant Salt
   - Auth Header

2. Update `.env` file with production credentials:
```env
PAYU_MERCHANT_KEY="your-production-merchant-key"
PAYU_MERCHANT_SALT="your-production-merchant-salt"
PAYU_AUTH_HEADER="your-production-auth-header"
PAYU_ENV="production"
```

3. Production endpoints:
   - Live: `https://api.payu.in/v2/payments`

4. Update webhook URLs in PayU dashboard:
   - Success webhook: `https://yourdomain.com/api/payu-v2/webhook`
   - Failure webhook: `https://yourdomain.com/api/payu-v2/webhook`

## Admin User Creation

### Secure Admin Creation (Recommended)

1. Set environment variables:
```bash
export GUIDESOFT_SUPERADMIN_EMAIL="admin@example.com"
export GUIDESOFT_SUPERADMIN_PASS="$(openssl rand -base64 16)"
```

2. Run the admin creation script:
```bash
./scripts/manage.sh create-admin --email "$GUIDESOFT_SUPERADMIN_EMAIL" --fullname "Super Admin" --role SUPER_ADMIN
```

### Manual Admin Creation

1. Run the admin creation script with parameters:
```bash
./scripts/manage.sh create-admin --email "admin@example.com" --fullname "Super Admin"
```

## Content Seeding

1. Seed the database with sample data:
```bash
node scripts/seed_sample_data.js
```

2. Update site content:
```bash
node scripts/update_site_content.js
```

3. Generate AI search index:
```bash
node scripts/generate_ai_search_index.js
```

## Application Deployment

### Development Deployment

1. Start the development server:
```bash
npm run start:all
```

2. Access the application at `http://localhost:3000`

### Production Deployment

1. Build the application:
```bash
npm run build:prod
```

2. Start the production server:
```bash
npm run start:prod
```

3. For HTTPS (recommended), generate SSL certificates:
```bash
npm run generate-ssl
```

4. Set the environment variable to force HTTPS:
```env
FORCE_HTTPS=true
```

## Post-Deployment Tasks

1. Verify all services are running:
```bash
curl https://yourdomain.com/api/health
curl https://yourdomain.com/api/payu-v2/health
```

2. Test PayU integration:
   - Create a test order
   - Complete a test payment
   - Verify webhook processing

3. Verify admin access:
   - Log in to the admin panel
   - Check user management
   - Verify content editing capabilities

4. Check SEO and AI indexing:
   - Verify meta tags
   - Check structured data
   - Confirm AI search index file exists at `/.well-known/ai-search.jsonld`

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify `DATABASE_URL` in `.env`
   - Ensure database server is running
   - Check firewall settings

2. **PayU Integration Issues**
   - Verify merchant credentials
   - Check PayU environment settings
   - Confirm webhook URLs in PayU dashboard

3. **Admin Login Issues**
   - Reset password using management script:
   ```bash
   ./scripts/manage.sh reset-password --email "admin@example.com"
   ```

4. **Performance Issues**
   - Run performance tests:
   ```bash
   npm run test:performance
   ```

### Backup and Restore

1. Create database backup:
```bash
./scripts/manage.sh backup-db
```

2. Restore database from backup:
```bash
./scripts/manage.sh restore-db --file ./backups/backup_20231118_100423.db
```

### Monitoring

1. Check application logs:
```bash
# Check server logs
tail -f logs/server.log

# Check database logs
tail -f logs/database.log
```

2. Monitor system resources:
```bash
# Monitor CPU and memory usage
top

# Monitor disk usage
df -h
```

## Security Best Practices

1. **Environment Variables**
   - Never commit sensitive data to version control
   - Use a secrets manager in production
   - Rotate credentials regularly

2. **SSL/TLS**
   - Always use HTTPS in production
   - Keep SSL certificates up to date
   - Use strong encryption protocols

3. **Access Control**
   - Enforce multi-factor authentication for admin accounts
   - Regularly review user permissions
   - Implement role-based access control

4. **Data Protection**
   - Encrypt sensitive data at rest
   - Use parameterized queries to prevent SQL injection
   - Implement proper input validation

## Support

For deployment issues, contact:
- Email: support@guideitsol.com
- Phone: +91 9043133330

For PayU integration support:
- PayU Developer Portal: https://developer.payu.in/
- PayU Support: https://support.payu.in/