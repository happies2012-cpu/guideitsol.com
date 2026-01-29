# ============================================
# GuideIT Solutions - Production Dockerfile
# ============================================
# Multi-stage build for optimized production deployment
# Includes: Frontend (React/Vite) + Backend (Node.js/Express) + Database (SQLite/Prisma)

# ============================================
# Stage 1: Build Frontend
# ============================================
FROM node:20-alpine AS frontend-builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build frontend for production
RUN npm run build

# ============================================
# Stage 2: Production Runtime
# ============================================
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production && \
  npm cache clean --force

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy built frontend from builder stage
COPY --from=frontend-builder /app/dist ./dist

# Copy server files
COPY server ./server

# Copy public assets
COPY public ./public

# Copy environment template
COPY .env.production.example ./.env.example

# Copy startup script
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Create data directory for SQLite database
RUN mkdir -p /app/data && \
  chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Set environment variables
ENV NODE_ENV=production \
  PORT=3000 \
  DATABASE_URL=file:/app/data/database.db

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application using the startup script
CMD ["sh", "./docker-entrypoint.sh"]
