# Skill Name: REST API Design

## Purpose
This skill ensures that the agent designs and implements RESTful
API endpoints following conventions, proper request/response models,
status codes, and filtering logic.

## When to Use
Use this skill when:
- Creating new API endpoints
- Updating existing endpoints
- Adding filtering, sorting, or pagination
- Handling request validation and response formatting

## Required Context
- /backend CLAUDE.md
- API spec: @specs/api/rest-endpoints.md
- Feature spec: @specs/features/task-crud.md
- Backend codebase: /backend/routes, /backend/models.py

## Steps
1. Identify endpoint and HTTP method
2. Implement endpoint using FastAPI
3. Validate requests using Pydantic models
4. Return structured JSON responses
5. Apply filters and sorting as per spec
6. Test endpoints for correctness and spec compliance

## Rules
- Follow REST conventions strictly
- Return appropriate HTTP status codes
- Ensure user-specific data is enforced
- Do not bypass JWT authentication
- Phase II features only

## Output Format
- Endpoints created or updated
- Request/response models implemented
- Filters and validation applied
- Confirmation of spec compliance
