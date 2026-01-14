# Evolution of Todo - Spec-Driven Development Project

## Overview

This project demonstrates the "Evolution of Todo" through spec-driven development with two phases:

### Phase 1: Console Todo Application
- Python console-based application
- In-memory storage only
- Constitutionally compliant implementation
- Located in `phase 1/` directory

### Phase 2: Full-Stack Web Application
- Next.js frontend (port 3000)
- FastAPI backend (port 8000)
- PostgreSQL database
- Authentication and user management
- Located in `phase 2/` directory

## Features

- User authentication (signup/login)
- Task management (create, read, update, delete)
- Task completion tracking
- Priority levels (low, medium, high)
- Due dates for tasks
- Responsive design for desktop and mobile
- Dark/light theme support
- Real-time updates

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Python FastAPI, SQLModel ORM
- **Database**: PostgreSQL
- **Authentication**: JWT-based

## Getting Started

### Phase 1 (Console App)
```bash
cd phase 1
python src/main.py
```

### Phase 2 (Web App)
```bash
# With Docker (requires significant memory)
docker-compose up --build

# Alternative manual deployment
# Backend: cd phase 2/backend && uvicorn src.main:app --reload
# Frontend: cd phase 2/frontend && npm run dev
```

### Prerequisites for Docker Deployment

- Docker
- Docker Compose
- At least 4GB RAM (recommended) for building

### Installation

1. Clone the repository
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Update the environment variables with your database credentials
4. Start the application:
   ```bash
   docker-compose up --build
   ```

### Usage

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

The application will be available at http://localhost:3000. Sign up for an account to start managing your tasks.

## Deployment

For detailed deployment instructions, troubleshooting, and alternative deployment methods, see `DEPLOYMENT_GUIDE.md`.