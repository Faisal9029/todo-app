# Skill Name: Claude Code Execution

## Purpose
This skill allows the agent to execute tasks automatically
using Claude Code while adhering to project specifications
and phase-specific rules.

It ensures that no manual coding is required, and all
implementations follow the structured workflow:
Spec → Plan → Tasks → Implementation → Review.

## When to Use
Always use this skill when:
- A new feature or API endpoint needs implementation
- Any code change is required in frontend or backend
- Iterating on a spec-driven task
- Testing and updating existing implementations

## Required Context
Before execution, the agent must access:
- Root /CLAUDE.md for project overview and conventions
- Layer-specific CLAUDE.md (frontend/backend) for stack rules
- Relevant spec files (@specs/...) for instructions
- Current codebase context (files in /frontend, /backend)

## Steps
1. Read the relevant spec file and understand the task
2. Generate a high-level implementation plan
3. Break plan into smaller tasks
4. Execute each task using Claude Code
5. Reference CLAUDE.md guidelines and spec conventions
6. Test output against spec requirements
7. Iterate if needed to fix discrepancies
8. Document modified files and updates

## Rules
- Never write code outside of the current spec or plan
- Follow phase boundaries strictly (Phase II tasks only)
- Use proper prompts for Claude Code referencing the correct CLAUDE.md
- Respect layer-specific patterns (Next.js, FastAPI, SQLModel)
- Maintain output formatting and file structure conventions

## Output Format
After executing tasks, the agent should produce a summary:
- Implemented feature or API endpoint
- Tasks completed and code files modified
- Confirmation of spec compliance
- Any issues or limitations encountered
