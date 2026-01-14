#!/bin/bash

# Railway-optimized start script for Todo Application
# This runs the backend service which is the main service for Railway

echo "🚀 Starting Todo Application on Railway..."

# Railway provides PORT environment variable - use it for the backend API
export BACKEND_PORT=${PORT:-8000}

echo "🔧 Configuration:"
echo "   Main port (Railway): $BACKEND_PORT"

# Start the backend service (FastAPI) on the main port
echo "📦 Starting backend service (FastAPI) on port $BACKEND_PORT..."
cd /app/backend

# Activate Python virtual environment if available
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Start the backend server - this will be the main service exposed to Railway
echo "   ✅ Starting FastAPI server..."
exec python -m uvicorn src.main:app --host 0.0.0.0 --port $BACKEND_PORT --reload