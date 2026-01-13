from src.models.task import Task
from src.storage.task_repository import TaskRepository
from typing import List, Optional


class TaskService:
    """
    Service layer for task operations.
    """

    def __init__(self, task_repository: TaskRepository):
        """
        Initialize the task service with a task repository.

        Args:
            task_repository (TaskRepository): The repository to use for data operations
        """
        self._task_repository = task_repository

    def add_task(self, title: str, description: str = "") -> Task:
        """
        Add a new task with validation.

        Args:
            title (str): Title of the task (required)
            description (str): Optional description of the task

        Returns:
            Task: The newly created task

        Raises:
            ValueError: If the title is empty or invalid
        """
        if not isinstance(title, str) or not title.strip():
            raise ValueError("Task title must be a non-empty string")
        return self._task_repository.add_task(title, description)

    def get_all_tasks(self) -> List[Task]:
        """
        Get all tasks.

        Returns:
            List[Task]: List of all tasks
        """
        return self._task_repository.get_all_tasks()

    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        """
        Get a task by its ID.

        Args:
            task_id (int): ID of the task to retrieve

        Returns:
            Optional[Task]: The task if found, None otherwise
        """
        return self._task_repository.get_task_by_id(task_id)

    def update_task(self, task_id: int, title: str = None, description: str = None) -> bool:
        """
        Update a task with validation.

        Args:
            task_id (int): ID of the task to update
            title (str, optional): New title for the task
            description (str, optional): New description for the task

        Returns:
            bool: True if task was updated, False if task was not found
        """
        # Validate title if provided
        if title is not None:
            if not isinstance(title, str) or not title.strip():
                raise ValueError("Task title must be a non-empty string")
        return self._task_repository.update_task(task_id, title, description)

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task.

        Args:
            task_id (int): ID of the task to delete

        Returns:
            bool: True if task was deleted, False if task was not found
        """
        return self._task_repository.delete_task(task_id)

    def toggle_task_completion(self, task_id: int) -> bool:
        """
        Toggle the completion status of a task.

        Args:
            task_id (int): ID of the task to toggle

        Returns:
            bool: True if task status was toggled, False if task was not found
        """
        return self._task_repository.toggle_completion(task_id)

    def validate_task_id(self, task_id: int) -> bool:
        """
        Validate if a task ID is valid (exists in the repository).

        Args:
            task_id (int): ID to validate

        Returns:
            bool: True if the task exists, False otherwise
        """
        return self.get_task_by_id(task_id) is not None