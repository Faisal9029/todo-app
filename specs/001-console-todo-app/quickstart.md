# Quickstart: Console Todo Application

**Feature**: Console Todo Application
**Date**: 2026-01-04
**Branch**: 001-console-todo-app

## Getting Started

### Prerequisites
- Python 3.13+ installed on your system

### Running the Application
1. Navigate to the project root directory
2. Ensure you have the `/src` directory with the application files
3. Run the application:
   ```bash
   python src/main.py
   ```

### Using the Application
1. The application will display a numbered menu:
   ```
   1. Add Task
   2. View Tasks
   3. Update Task
   4. Delete Task
   5. Mark Complete / Incomplete
   6. Exit
   ```
2. Select an option by entering the corresponding number
3. Follow the prompts to complete your desired action
4. The application will return to the main menu after each operation

### Core Features
- **Add Task**: Enter a title and optional description to create a new task
- **View Tasks**: See all tasks with their ID, title, and completion status
- **Update Task**: Modify the title or description of an existing task by ID
- **Delete Task**: Remove a task by its ID
- **Mark Complete/Incomplete**: Toggle the completion status of a task by ID
- **Exit**: Close the application

### Error Handling
- Invalid inputs will display user-friendly error messages
- The application will not crash on invalid input
- All errors are handled gracefully and return to the main menu