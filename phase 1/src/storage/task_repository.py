from src.models.task import Task
from typing import List, Optional


class TaskRepository:
    """
    In-memory repository for managing tasks.
    """

    def __init__(self):
        """
        Initialize the task repository with an empty list and ID counter.
        """
        self._tasks = []
        self._next_id = 1

    def add_task(self, title: str, description: str = "") -> Task:
        """
        Add a new task to the repository.

        Args:
            title (str): Title of the task
            description (str): Optional description of the task

        Returns:
            Task: The newly created task
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
            task_id (int): ID of the task to retrieve

        Returns:
            Optional[Task]: The task if found, None otherwise
        """
        for task in self._tasks:
            if task.id == task_id:
                return task
        return None

    def update_task(self, task_id: int, title: str = None, description: str = None) -> bool:
        """
        Update a task's title and/or description.

        Args:
            task_id (int): ID of the task to update
            title (str, optional): New title for the task
            description (str, optional): New description for the task

        Returns:
            bool: True if task was updated, False if task was not found
        """
        task = self.get_task_by_id(task_id)
        if task:
            task.update(title=title, description=description)
            return True
        return False

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id (int): ID of the task to delete

        Returns:
            bool: True if task was deleted, False if task was not found
        """
        task = self.get_task_by_id(task_id)
        if task:
            self._tasks.remove(task)
            return True
        return False

    def toggle_completion(self, task_id: int) -> bool:
        """
        Toggle the completion status of a task.

        Args:
            task_id (int): ID of the task to toggle

        Returns:
            bool: True if task status was toggled, False if task was not found
        """
        task = self.get_task_by_id(task_id)
        if task:
            task.completed = not task.completed
            return True
        return False