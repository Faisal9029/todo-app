"""
Task service for the console todo application.
Contains business logic for task operations.
"""

from typing import List, Optional
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.task import Task
from storage.task_repository import TaskRepository


class TaskService:
    """Business logic layer for task operations."""

    def __init__(self, repository: TaskRepository):
        """
        Initialize the service with a task repository.

        Args:
            repository: TaskRepository instance to use for data operations
        """
        self.repository = repository

    def add_task(self, title: str, description: Optional[str] = None) -> Task:
        """
        Add a new task with validation.

        Args:
            title: Required title of the task
            description: Optional description of the task

        Returns:
            Task: The newly created task

        Raises:
            ValueError: If title is empty or invalid
        """
        if not title or not title.strip():
            raise ValueError("Task title is required and cannot be empty")

        return self.repository.add_task(title, description)

    def get_all_tasks(self) -> List[Task]:
        """
        Get all tasks.

        Returns:
            List[Task]: List of all tasks
        """
        return self.repository.get_all_tasks()

    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        """
        Get a task by its ID.

        Args:
            task_id: ID of the task to retrieve

        Returns:
            Task: The task with the given ID, or None if not found
        """
        return self.repository.get_task_by_id(task_id)

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Optional[Task]:
        """
        Update a task's title and/or description with validation.

        Args:
            task_id: ID of the task to update
            title: New title (optional)
            description: New description (optional)

        Returns:
            Task: Updated task if found, None if task doesn't exist

        Raises:
            ValueError: If new title is empty
        """
        if title is not None and not title.strip():
            raise ValueError("Task title cannot be empty")

        return self.repository.update_task(task_id, title, description)

    def toggle_task_completion(self, task_id: int) -> Optional[Task]:
        """
        Toggle the completion status of a task.

        Args:
            task_id: ID of the task to toggle

        Returns:
            Task: Updated task if found, None if task doesn't exist
        """
        return self.repository.toggle_completion(task_id)

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id: ID of the task to delete

        Returns:
            bool: True if task was deleted, False if task doesn't exist
        """
        return self.repository.delete_task(task_id)

    def validate_task_id(self, task_id: int) -> bool:
        """
        Validate if a task ID exists.

        Args:
            task_id: ID to validate

        Returns:
            bool: True if task exists, False otherwise
        """
        return self.repository.get_task_by_id(task_id) is not None