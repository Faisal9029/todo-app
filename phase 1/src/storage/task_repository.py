"""
In-memory task repository for the console todo application.
Stores tasks in memory only (no persistence) as required by Phase I constitution.
"""

from typing import List, Optional
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.task import Task


class TaskRepository:
    """In-memory repository for storing tasks."""

    def __init__(self):
        """Initialize the repository with an empty list of tasks."""
        self._tasks: List[Task] = []
        self._next_id = 1

    def add_task(self, title: str, description: Optional[str] = None) -> Task:
        """
        Add a new task to the repository.

        Args:
            title: Required title of the task
            description: Optional description of the task

        Returns:
            Task: The newly created task with assigned ID
        """
        task = Task(id=self._next_id, title=title, description=description, completed=False)
        self._tasks.append(task)
        self._next_id += 1
        return task

    def get_all_tasks(self) -> List[Task]:
        """
        Get all tasks in the repository.

        Returns:
            List[Task]: List of all tasks
        """
        return self._tasks.copy()

    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        """
        Get a task by its ID.

        Args:
            task_id: ID of the task to retrieve

        Returns:
            Task: The task with the given ID, or None if not found
        """
        for task in self._tasks:
            if task.id == task_id:
                return task
        return None

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Optional[Task]:
        """
        Update a task's title and/or description.

        Args:
            task_id: ID of the task to update
            title: New title (optional)
            description: New description (optional)

        Returns:
            Task: Updated task if found, None otherwise
        """
        task = self.get_task_by_id(task_id)
        if not task:
            return None

        if title is not None:
            if not title.strip():
                raise ValueError("Title cannot be empty")
            task.title = title.strip()

        if description is not None:
            task.description = description.strip() if description else None

        return task

    def toggle_completion(self, task_id: int) -> Optional[Task]:
        """
        Toggle the completion status of a task.

        Args:
            task_id: ID of the task to toggle

        Returns:
            Task: Updated task if found, None otherwise
        """
        task = self.get_task_by_id(task_id)
        if not task:
            return None

        task.completed = not task.completed
        return task

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id: ID of the task to delete

        Returns:
            bool: True if task was deleted, False if not found
        """
        task = self.get_task_by_id(task_id)
        if not task:
            return False

        self._tasks.remove(task)
        return True

    def get_next_id(self) -> int:
        """
        Get the next available ID.

        Returns:
            int: The next ID that will be assigned
        """
        return self._next_id