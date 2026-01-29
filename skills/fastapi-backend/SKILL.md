# Skill Name: FastAPI Backend

## Purpose
This skill allows the agent to implement, maintain, and troubleshoot
FastAPI backend services, including REST API endpoints, database
operations with SQLModel, and authentication middleware.

## When to Use
Use this skill when:
- Creating or updating REST API endpoints
- Implementing CRUD functionality for models
- Handling JWT authentication and user authorization
- Integrating with Neon PostgreSQL via SQLModel
- Managing backend logic for Phase II features

## Required Context
Before implementation, the agent must access:
- /backend CLAUDE.md for backend conventions
- Relevant feature spec: @specs/features/... (e.g., task-crud, authentication)
- API spec: @specs/api/rest-endpoints.md
- Database schema spec: @specs/database/schema.md
- Current backend codebase (/backend)

## Steps
1. Identify the API route, model, or backend feature to implement
2. Create or update SQLModel models according to schema
3. Implement REST API endpoints using FastAPI conventions
4. Add authentication and authorization middleware (JWT)
5. Apply error handling using HTTPException
6. Test endpoints for correctness and security
7. Document modified files and changes

## Rules
- All routes must return JSON responses
- Use Pydantic models for request and response validation
- Ensure JWT authentication is applied correctly
- Do not bypass user-specific data filtering
- Respect phase boundaries (Phase II only)
- Follow backend folder structure (/routes, /models, /db.py)

## Output Format
After executing tasks, the agent should produce a summary:
- API endpoints created or updated
- SQLModel models added or modified
- Middleware implemented
- Confirmation that all endpoints comply with spec and security rules
