# Data Model: Console Todo Application

**Feature**: Console Todo Application
**Date**: 2026-01-04
**Branch**: 001-console-todo-app

## Task Entity

### Attributes
- **id**: integer
  - Type: int
  - Constraints: unique, auto-incrementing, positive
  - Required: yes
  - Description: Unique identifier for each task

- **title**: string
  - Type: str
  - Constraints: non-empty, required
  - Required: yes
  - Description: Title of the task

- **description**: string
  - Type: str
  - Constraints: optional, nullable
  - Required: no
  - Description: Optional description of the task

- **completed**: boolean
  - Type: bool
  - Default: False
  - Required: yes
  - Description: Completion status of the task

### Validation Rules
1. **Title Required**: Task title must not be empty or null
2. **ID Uniqueness**: Each task must have a unique ID
3. **ID Auto-Increment**: New tasks receive the next available ID number
4. **Boolean Status**: Completed field must be a boolean value

### State Transitions
- **New Task**: id = auto-increment, title = required, description = optional, completed = False
- **Completed**: completed = True (from any state)
- **Incomplete**: completed = False (from any state)

## Relationships
- No relationships defined (standalone entity)

## Business Rules
1. Tasks must have a title to be created
2. Task IDs are assigned automatically and sequentially
3. Task completion status can be toggled
4. Task details can be updated after creation
5. Tasks can be deleted by ID