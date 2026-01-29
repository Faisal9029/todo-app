# Skill Name: Database & SQLModel

## Purpose
This skill enables the agent to manage the Neon PostgreSQL database
using SQLModel, including model creation, data queries, filtering,
and indexing for Phase II features.

## When to Use
Use this skill when:
- Creating or updating database models
- Implementing queries for CRUD operations
- Filtering tasks by user or status
- Adding indexes or database optimizations

## Required Context
Before implementation, the agent must access:
- /backend CLAUDE.md
- Database spec: @specs/database/schema.md
- Feature spec: @specs/features/task-crud.md
- Current backend codebase (/backend/models.py, /backend/db.py)

## Steps
1. Create or update SQLModel models according to schema
2. Ensure relationships between tables are correct (user ↔ tasks)
3. Implement queries that filter by user ID
4. Add indexes for performance if specified
5. Test queries for correctness
6. Document any files modified

## Rules
- Follow the database schema exactly
- Never bypass user-specific filtering
- Respect existing code and folder structure
- Only modify database for Phase II features
- Use environment variable DATABASE_URL for connections

## Output Format
After executing tasks, the agent should produce a summary:
- Models created or modified
- Queries implemented or updated
- Indexes added
- Confirmation of spec compliance
