# Skill Name: Authentication & JWT

## Purpose
This skill enables the agent to securely implement user authentication
and authorization for the full-stack application, using Better Auth
on the frontend and JWT tokens for backend verification.

It ensures user data isolation, secure API access, and compliance
with phase-specific requirements.

## When to Use
Always use this skill when:
- Implementing user signup/signin
- Verifying JWT tokens in FastAPI backend
- Adding or updating API routes that require authentication
- Handling authorization for user-specific data
- Implementing security-related features for Phase II

## Required Context
Before implementation, the agent must access:
- /frontend CLAUDE.md (Better Auth configuration)
- /backend CLAUDE.md (JWT middleware, security rules)
- Feature spec: @specs/features/authentication.md
- API spec: @specs/api/rest-endpoints.md
- Environment variable: BETTER_AUTH_SECRET

## Steps
1. Configure Better Auth to issue JWT tokens
2. Ensure frontend attaches JWT token to every API request header
3. Implement backend middleware to extract and verify JWT
4. Decode token to retrieve user ID and match with request path
5. Filter database queries by authenticated user
6. Enforce user isolation for all CRUD operations
7. Handle token expiry and unauthorized requests (401)
8. Document any files or changes made

## Rules
- Never bypass JWT verification
- Each user can only access their own data
- Use the shared secret (BETTER_AUTH_SECRET) consistently in frontend and backend
- Return 401 Unauthorized for requests without a valid token
- Maintain compliance with Phase II feature boundaries
- Follow coding standards for frontend and backend components

## Output Format
After executing tasks, the agent should produce a summary:
- Better Auth JWT configuration applied
- Middleware implemented and tested
- API endpoints secured
- Confirmation of user isolation
- Any limitations or issues noted

