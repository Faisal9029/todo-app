# Skill Name: Next.js App Router

## Purpose
This skill enables the agent to implement, maintain, and troubleshoot
Next.js frontend applications using the App Router (`app/` directory).
It ensures proper usage of server and client components, API calls,
layouts, and Tailwind CSS styling.

## When to Use
Use this skill when:
- Creating pages or layouts in Next.js
- Implementing client interactivity (forms, buttons)
- Making API calls from frontend
- Styling components using Tailwind CSS
- Adding or modifying Next.js routes

## Required Context
Before implementation, the agent must access:
- /frontend CLAUDE.md for frontend conventions
- Feature specs: @specs/features/... (e.g., task-crud)
- API specs: @specs/api/rest-endpoints.md
- Component and page specs: @specs/ui/components.md, @specs/ui/pages.md
- Current frontend codebase (/frontend)

## Steps
1. Determine whether the task affects server or client components
2. Create or update pages, layouts, and components in `/app`
3. Apply Tailwind CSS classes according to component guidelines
4. Implement API calls via `/lib/api.ts`
5. Ensure routing follows App Router conventions
6. Test pages for rendering and interactivity
7. Document files modified and components added

## Rules
- Default to server components; use client components only when interactivity is needed
- Do not use Pages Router (`pages/`) for new features
- API calls must go through `/lib/api.ts` only
- Follow existing Tailwind patterns; no inline styles
- Maintain naming consistency for components, pages, and routes
- Phase boundaries must be respected (Phase II features only)

## Output Format
After executing tasks, the agent should produce a summary:
- Pages, layouts, and components created or updated
- API calls implemented
- Tailwind styling applied
- Confirmation that routing and server/client components are correct
