#!/bin/sh
# ============================================
# GuideIT Solutions - Docker Startup Script
# ============================================
# This script runs when the container starts

set -e

echo "🚀 Starting GuideIT Solutions..."

# Wait for database directory to be ready
echo "📁 Checking data directory..."
mkdir -p /app/data
mkdir -p /app/logs

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma migrate deploy || echo "⚠️  No migrations to run or migration failed"

# Generate Prisma Client (in case it's not generated)
echo "🔧 Generating Prisma Client..."
npx prisma generate || echo "⚠️  Prisma Client generation skipped"

# Create default admin user if needed
echo "👤 Checking for admin user..."
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const prisma = new PrismaClient();
  try {
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@guideitsol.com' }
    });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: {
          email: 'admin@guideitsol.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'admin'
        }
      });
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.log('⚠️  Could not create admin user:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
}

createAdmin();
" || echo "⚠️  Admin user creation skipped"

echo "✅ Initialization complete!"
echo "🌐 Starting application server..."

# Start the application
exec node server/index.js
