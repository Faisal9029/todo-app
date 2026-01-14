# Multi-stage Dockerfile for Todo Application
# This handles both backend and frontend services

# Build stage for backend
FROM python:3.11-slim AS backend-builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Copy backend requirements and install dependencies
COPY phase 2/backend/requirements.txt .
COPY phase 2/backend/alembic.ini .

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY phase 2/backend/src/ ./src/
COPY phase 2/backend/alembic/ ./alembic/

# Build stage for frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy frontend package files
COPY phase 2/frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend application code
COPY phase 2/frontend/ .

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy frontend production files
COPY --from=frontend-builder /app/.next/standalone ./
COPY --from=frontend-builder /app/.next/static ./.next/static
COPY --from=frontend-builder /app/package*.json ./

# Install only production dependencies for frontend
RUN npm install --production

# Copy backend files
COPY --from=backend-builder /app ./backend/

# Copy start script
COPY start.sh .
RUN chmod +x start.sh

# Expose ports
EXPOSE 3000 8000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start both services
CMD ["sh", "-c", "./start.sh"]