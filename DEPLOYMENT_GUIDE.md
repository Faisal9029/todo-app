# Phase 2 Todo App - Docker Deployment Guide

## Overview
This guide provides instructions for deploying the Phase 2 Todo application using Docker. The application consists of:
- Backend: FastAPI application running on port 8000
- Frontend: Next.js application running on port 3000

## Prerequisites
- Docker and Docker Compose installed
- Internet connection for pulling base images
- At least 4GB RAM available for building

## Environment Variables
The application requires the following environment variables in a `.env` file:

```env
DATABASE_URL=postgresql://neondb_owner:npg_w8qfVYWIPH7i@ep-rough-bush-a1ge17cz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET_KEY=Z2ymF9/J/RG8dU38qeqJe1wloVPhnIsIXjCi5kLlOMM=
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Docker Build Instructions

### Standard Build (may fail on systems with memory constraints)
```bash
# Clone the repository
git clone https://github.com/Faisal9029/todo-app.git
cd todo-app

# Ensure you have the .env file with required variables
cp .env.example .env
# Edit .env with your actual values

# Build and start the containers
docker-compose up --build -d
```

### Alternative: Pre-built Images Approach
If the build fails due to memory constraints, you can build individual components:

```bash
# Build backend only
docker build -f Dockerfile.backend -t todo-backend .

# Build frontend only
docker build -f Dockerfile.frontend -t todo-frontend .
```

### Alternative: Cloud-Based Build
If local builds fail, consider using cloud-based build services:
- GitHub Actions
- Docker Hub Automated Builds
- AWS CodeBuild
- Google Cloud Build

## Manual Deployment (Alternative to Docker)

If Docker deployment is not feasible, you can deploy manually:

### Backend Setup
```bash
cd phase 2/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd phase 2/frontend
npm install
npm run dev
```

## Ports
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Backend Health Check: http://localhost:8000/health

## Troubleshooting

### Memory Issues During Build
If you encounter SIGBUS or other memory-related errors:
1. Increase Docker's memory allocation (Preferences → Resources → Memory)
2. Use a machine with more available RAM
3. Build components separately
4. Use cloud-based build services

### Build Context Size
The frontend build context can be large. Consider using `.dockerignore` to exclude unnecessary files:

```
node_modules
.next
.git
*.log
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### Health Checks
The containers have health checks configured:
- Backend: Checks `/health` endpoint
- Frontend: Checks if port 3000 is responsive

## Services Architecture
```
┌─────────────┐    ┌──────────────┐
│   Client    │ ←→ │   Frontend   │
│ (Browser)   │    │ (Next.js 3000)│
└─────────────┘    └──────────────┘
                        ↑
                        │ API Calls
                        ↓
                ┌──────────────┐
                │   Backend    │
                │ (FastAPI 8000)│
                └──────────────┘
                        ↑
                        │ Database
                        ↓
                ┌──────────────┐
                │ PostgreSQL   │
                │ (External)   │
                └──────────────┘
```

## Production Considerations
- Use production-grade PostgreSQL instance
- Configure SSL certificates
- Set up monitoring and logging
- Implement backup strategies
- Use reverse proxy (nginx) for production

## Scaling Options
- Load balancer for multiple frontend instances
- Database read replicas for backend scaling
- CDN for static assets
- Container orchestration (Kubernetes) for advanced deployments