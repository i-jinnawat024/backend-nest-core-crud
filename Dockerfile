# Multi-stage Dockerfile for NestJS (TypeScript) app

# Install dependencies (with dev) for building
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled source
COPY --from=builder /app/dist ./dist

# Expose the service port
EXPOSE 3000

# Start the server
CMD ["node", "dist/main.js"]

