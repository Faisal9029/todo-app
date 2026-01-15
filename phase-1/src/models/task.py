"""
Task model for the console todo application.
Represents a single todo item with id, title, description, and completion status.
"""

from typing import Optional


class Task:
    """Represents a single todo item."""

    def __init__(self, id: int, title: str, description: Optional[str] = None, completed: bool = False):
        """
        Initialize a Task instance.

        Args:
            id: Unique identifier for the task (auto-incremented)
            title: Required title of the task (non-empty string)
            description: Optional description of the task
            completed: Boolean indicating if task is completed (default: False)
        """
        if not title or not title.strip():
            raise ValueError("Title is required and cannot be empty")

        self.id = id
        self.title = title.strip()
        self.description = description.strip() if description else None
        self.completed = completed

    def __repr__(self):
        """String representation of the task."""
        status = "[x]" if self.completed else "[ ]"
        return f"Task(id={self.id}, title='{self.title}', completed={self.completed})"

    def to_dict(self):
        """Convert task to dictionary representation."""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "completed": self.completed
        }