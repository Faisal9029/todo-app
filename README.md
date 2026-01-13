# TaskFlow - Task Management Application

A modern task management application with a clean, Linear-inspired UI featuring dark/light mode support.

## Features

- User authentication (signup/login)
- Task management (create, read, update, delete)
- Task completion tracking
- Priority levels (low, medium, high)
- Responsive design for desktop and mobile
- Dark/light theme support
- Real-time updates

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Python FastAPI, SQLModel ORM
- **Database**: PostgreSQL
- **Authentication**: JWT-based

## Getting Started

### Prerequisites

- Docker
- Docker Compose

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

The application will be available at http://localhost:3000. Sign up for an account to start managing your tasks.