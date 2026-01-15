# Phase I Console Todo Application

This is a console-based Todo application built in Python with in-memory storage as required by the Phase I Constitution.

## Architecture

The application follows a clean separation of concerns:

- **Models** (`src/models/`): Contains the Task model with validation
- **Storage** (`src/storage/`): In-memory repository for tasks (no persistence)
- **Services** (`src/services/`): Business logic layer
- **UI** (`src/ui/`): Console interface
- **Main**: Entry point of the application

## Constitutional Compliance

✅ **In-memory storage only** - No file persistence, all data lost on exit
✅ **Console interface only** - No web frameworks or GUI
✅ **Standard library only** - No external dependencies
✅ **Separation of concerns** - Clear architecture layers
✅ **Graceful error handling** - No crashes on invalid input

## Usage

Run the application:
```bash
python src/main.py
```

## Data Model

Each task has:
- `id`: Integer, auto-incremented, unique
- `title`: String, required, non-empty
- `description`: String, optional
- `completed`: Boolean, default False