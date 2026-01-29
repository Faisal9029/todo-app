<!-- SYNC IMPACT REPORT:
Version change: 1.0.0 → 2.0.0
Modified principles: All updated for Phase II web full-stack implementation
Added sections: Frontend (Next.js), Backend (FastAPI), Database & SQLModel, REST API, Authentication/JWT, Docker Deployment, Monorepo Navigation, Debugging, Project Review
Removed sections: Phase I in-memory-only storage rules
Templates requiring updates:
- .specify/templates/plan-template.md: ✅ updated to align with Phase II principles
- .specify/templates/spec-template.md: ✅ updated to align with Phase II principles
- .specify/templates/tasks-template.md: ✅ updated to reflect new skill-driven tasks
- .specify/templates/commands/*.md: ✅ reviewed for Phase II compliance
Follow-up TODOs: None
-->

# Phase II — Full-Stack Web Todo Application Constitution

## Core Principles

### I. Spec-Driven Foundation
Phase II extends Phase I by implementing a multi-user full-stack web application. All features MUST be defined in explicit Markdown specifications. The agent (Claude Code) MUST follow specs precisely. Human code writing is prohibited except for specification creation and validation.

### II. AI-Only Implementation
Claude Code is the sole code author. All backend, frontend, database, and API implementations MUST be generated through Claude Code. Manual implementation or changes outside spec are forbidden.

### III. Skill Governance
Phase II introduces the following skills which MUST be used by Claude Code:

1. Spec-Driven Development
2. Claude Code Execution
3. Next.js App Router Frontend
4. FastAPI Backend
5. Authentication & JWT
6. Database & SQLModel
7. REST API Design
8. Monorepo Navigation
9. Debugging & Error Analysis
10. Project Review & Compliance

Each skill defines explicit tasks, folder references, and rules. Every task MUST reference its spec file (`@specs/...`) for context.

### IV. Feature Scope Adherence
Phase II features MUST include:
- Task CRUD operations
- User signup/signin authentication
- Task filtering, sorting, and completion toggle
- Persistent data storage in Neon PostgreSQL
- Responsive frontend pages with Next.js + Tailwind CSS
- API endpoints implemented via FastAPI

No features outside these specifications MAY be implemented in Phase II.

### V. Architectural Separation
Strict separation of concerns MUST be maintained:

- **Frontend:** Next.js App Router pages and components, Tailwind styling
- **Backend:** FastAPI routes, business logic, Pydantic/SQLModel models
- **Database:** Neon PostgreSQL, SQLModel ORM
- **Authentication:** JWT middleware for user isolation
- **Spec-Kit Plus:** Provides authoritative feature definitions

All layers MUST communicate via clearly defined APIs. Direct cross-layer code is prohibited.

---

## System Architecture Principles

### VI. Frontend Interaction Contract
Users MUST interact through responsive web UI only. Server components MUST be used by default. Client components ONLY when interactivity is required. API calls MUST include JWT token in headers. Errors MUST be clearly displayed.

### VII. Backend API Contract
All endpoints MUST:
- Validate requests using Pydantic models
- Return structured JSON responses
- Enforce user-specific filtering via JWT
- Return appropriate HTTP status codes

Endpoints MUST conform to the specification:
- GET /api/{user_id}/tasks
- POST /api/{user_id}/tasks
- PUT /api/{user_id}/tasks/{id}
- DELETE /api/{user_id}/tasks/{id}
- PATCH /api/{user_id}/tasks/{id}/complete

### VIII. Database & Persistence
- SQLModel MUST be used for all database models and queries.
- Neon PostgreSQL MUST be used for persistent storage.
- Foreign key relationships (user ↔ tasks) MUST be enforced.
- Indexes MUST be added for performance where specified.

No other database or in-memory storage MAY be used.

### IX. Authentication & Security
- Better Auth MUST issue JWT tokens for login.
- Backend MUST validate JWT using `BETTER_AUTH_SECRET`.
- All requests without valid token MUST return 401 Unauthorized.
- Each user MUST only access their own tasks.
- Token expiration MUST be enforced (e.g., 7 days).

### X. Monorepo Navigation
- The project MUST maintain a monorepo structure:
  - /frontend → Next.js app
  - /backend → FastAPI app
  - /specs → specifications
  - /.spec-kit → configuration
- CLAUDE.md files MUST exist for root, frontend, and backend.
- Layer references MUST follow `@specs/...` convention.

### XI. Debugging & Error Analysis
Claude Code MUST detect, report, and fix errors across frontend, backend, and database layers.
- All fixes MUST comply with spec.
- Errors MUST be logged, reported, and validated through testing.

### XII. Project Review & Compliance
Before marking Phase II complete:
- All features MUST be implemented according to specs.
- Endpoints, frontend pages, and DB models MUST match spec.
- Authentication MUST be verified.
- Compliance report MUST be documented.

---

## Deployment Principles

### XIII. Environment Variables
- `NEXT_PUBLIC_API_BASE_URL`
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`

### XIV. Docker & Service Rules
- Services: frontend (3000), backend (8000), db (5432)
- Docker Compose MUST define `depends_on` for correct startup order
- Persistent data MUST survive container restarts

### XV. Build & Run Commands
- Frontend: `npm run build && npm run start`
- Backend: `uvicorn main:app --host 0.0.0.0 --port 8000`
- Docker: `docker-compose up --build`

---

## Governance

This Constitution applies ONLY to Phase II.
- Version: 2.0.0
- Ratified: 2026-01-26
- Last Amended: 2026-01-26

**Amendments:**
- Changes MUST maintain spec-driven, skill-enforced, AI-only implementation.
- Any deviation MUST be explicitly approved.
- Future phases require their own separate constitutions.