# Skill Name: Spec-Driven Development

## Purpose
The purpose of this skill is to ensure the agent strictly follows
project specifications (Spec-Kit) without making assumptions or
adding extra features.

## When to Use
Always use this skill when:
- Implementing any feature
- Writing frontend or backend code
- Making changes to API, database, or UI
- Working on Phase II or any project phase

## Required Specs to Read
Before implementation, the agent must read:
- @specs/overview.md
- Relevant feature spec (e.g., @specs/features/task-crud.md)
- Relevant API spec (@specs/api/rest-endpoints.md)
- Relevant database spec (@specs/database/schema.md)
- Root /CLAUDE.md
- Layer-specific CLAUDE.md (frontend or backend)

## Steps
1. Identify which spec is being implemented
2. Understand the spec fully (requirements + acceptance criteria)
3. If spec is incomplete, request clarification first
4. Do not add any functionality outside the spec
5. Match implementation strictly to the spec
6. After completion, perform a self-check against the spec

## Rules
- Never implement code without a spec
- Do not add assumptions or “best guess” behavior
- If there is a conflict between spec and implementation, treat the spec as the source of truth
- Suggest spec updates before making changes if needed
- Do not cross phase boundaries (e.g., Phase II agent should not implement Phase III features)

## Output Format
After each implementation, the agent should report:
- Which spec was implemented
- Which files were modified
- Confirmation that implementation matches the spec
- Any limitations or constraints based on the spec
