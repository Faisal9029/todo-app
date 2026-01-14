#!/bin/bash

# Deployment script for Phase 2 Todo Application

set -e  # Exit on any error

echo "🚀 Phase 2 Todo App Deployment Script"
echo "====================================="

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed or not in PATH"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  Docker Compose not found, checking for newer version..."
    if ! command -v docker compose &> /dev/null; then
        echo "❌ Neither docker-compose nor docker compose found"
        exit 1
    fi
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

echo "✅ Docker Compose found: $COMPOSE_CMD"

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found"
    echo "Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "Please edit .env with your actual values before continuing"
        echo "For now, we'll try to proceed with example values"
    else
        echo "❌ No .env.example file found"
        exit 1
    fi
fi

# Display current environment
echo ""
echo "📋 Current environment:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8000"
echo "   Health:   http://localhost:8000/health"
echo ""

# Try to build and run
echo "🏗️  Building and starting containers..."
echo "⚠️  Note: This may take several minutes and require significant memory"
echo ""

# Attempt to build and run
if $COMPOSE_CMD up --build -d; then
    echo "✅ Containers started successfully!"
    echo ""
    echo "📊 Container status:"
    $COMPOSE_CMD ps
    echo ""
    echo "🔗 Access the application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend:  http://localhost:8000"
    echo "   Health:   http://localhost:8000/health"
    echo ""
    echo "📝 Monitor logs with: $COMPOSE_CMD logs -f"
    echo "🔄 Stop with: $COMPOSE_CMD down"
else
    echo "❌ Build failed - likely due to memory constraints"
    echo ""
    echo "💡 Alternative approaches:"
    echo "   1. Increase Docker memory allocation (recommended: 4GB+)"
    echo "   2. Build components separately:"
    echo "      docker build -f Dockerfile.backend -t todo-backend ."
    echo "      docker build -f Dockerfile.frontend -t todo-frontend ."
    echo "   3. Use cloud-based build services"
    echo "   4. Deploy manually using the instructions in DEPLOYMENT_GUIDE.md"
    echo ""
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"