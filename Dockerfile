# Railway-optimized Dockerfile for Todo Application
# This creates a single service focused on the backend API for Railway

# Build stage for backend
FROM python:3.11-slim AS backend-builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Copy the entire phase-2 directory first to ensure all paths are available
COPY ["phase-2/", "./phase-2/"]

WORKDIR /app/phase-2/backend

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Production stage - focused on backend API for Railway
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies needed
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install dumb-init for proper signal handling
RUN curl -L https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 > /usr/bin/dumb-init && \
    chmod +x /usr/bin/dumb-init

# Copy installed Python packages from the builder stage
COPY --from=backend-builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=backend-builder /usr/local/bin /usr/local/bin

# Copy backend files from the builder stage - copy the entire backend directory
COPY --from=backend-builder /app/phase-2/backend ./backend/

# Set PYTHONPATH so Python can find the modules in src/
ENV PYTHONPATH=/app/backend/src:$PYTHONPATH

# Expose port (Railway uses the PORT environment variable)
EXPOSE 8000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the main service (backend) directly
CMD ["sh", "-c", "cd /app/backend && python -m uvicorn src.main:app --host 0.0.0.0 --port ${PORT:-8000}"]