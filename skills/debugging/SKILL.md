# Skill Name: Debugging & Error Analysis

## Purpose
This skill allows the agent to detect, analyze, and fix errors
across frontend and backend, ensuring Phase II features function
correctly.

## When to Use
- API calls failing
- JWT authentication issues
- CORS or environment errors
- Next.js rendering issues
- Database query problems

## Required Context
- Full codebase (/frontend, /backend)
- CLAUDE.md files
- Spec files for context

## Steps
1. Identify the error from logs or failed tests
2. Locate source file(s)
3. Determine cause using spec and conventions
4. Propose and implement fix
5. Test to verify the issue is resolved
6. Document changes

## Rules
- Do not change spec behavior to fix errors
- Always maintain phase boundaries
- Test after every fix
- Follow coding and folder conventions

## Output Format
- Error description
- Files modified
- Fix applied
- Confirmation that issue is resolved
