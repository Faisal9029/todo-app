# Skill Name: Monorepo Navigation

## Purpose
This skill enables the agent to navigate and manage a monorepo
structure with frontend, backend, and Spec-Kit folders efficiently.

## When to Use
- Updating multiple layers (frontend/backend) in one task
- Implementing features that touch both frontend and backend
- Referencing spec files across the repo
- Following CLAUDE.md conventions for each layer

## Required Context
- Root CLAUDE.md
- /frontend CLAUDE.md
- /backend CLAUDE.md
- /specs folder structure

## Steps
1. Determine which layer(s) are affected by the task
2. Navigate to the relevant folder
3. Reference spec files properly using @specs/path
4. Follow layer-specific conventions for code
5. Maintain correct folder and file structure

## Rules
- Do not mix layers incorrectly
- Always reference specs from the correct path
- Respect layer CLAUDE.md rules
- Only modify files relevant to current task and phase

## Output Format
- Layers touched
- Files modified
- Specs referenced
- Confirmation of correct structure
