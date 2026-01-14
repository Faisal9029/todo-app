#!/bin/bash

# Start script for Todo Application deployment
# This script sets up and starts the application

echo "Starting Todo Application..."

# Check if we're in the correct directory
if [ -d "phase 2" ]; then
    echo "Found phase 2 directory, setting up services..."

    # Set environment variables
    export BACKEND_PORT=${PORT:-8000}
    export FRONTEND_PORT=${FRONTEND_PORT:-3000}

    # Start backend in background
    if [ -d "phase 2/backend" ]; then
        echo "Starting backend service on port $BACKEND_PORT..."
        cd phase 2/backend

        # Activate virtual environment if it exists
        if [ -d "venv" ]; then
            source venv/bin/activate
        fi

        python -m uvicorn src.main:app --host 0.0.0.0 --port $BACKEND_PORT &
        BACKEND_PID=$!
        echo "Backend started with PID $BACKEND_PID"
    fi

    # Give backend a moment to start
    sleep 5

    # Start frontend in background
    if [ -d "../frontend" ]; then
        cd ../frontend
        echo "Starting frontend service on port $FRONTEND_PORT..."

        # Install dependencies if needed
        npm install

        npm run dev &
        FRONTEND_PID=$!
        echo "Frontend started with PID $FRONTEND_PID"
    fi

    # Wait for both processes
    if [ ! -z "$BACKEND_PID" ]; then
        wait $BACKEND_PID
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        wait $FRONTEND_PID
    fi
    else
    echo "Error: phase 2 directory not found"
    exit 1
fi