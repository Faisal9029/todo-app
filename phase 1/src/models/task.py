class Task:
    """
    Represents a single todo item with id, title, description, and completion status.
    """

    def __init__(self, id, title, description="", completed=False):
        """
        Initialize a Task instance.

        Args:
            id (int): Unique identifier for the task
            title (str): Title of the task (required)
            description (str): Optional description of the task
            completed (bool): Completion status of the task (default: False)
        """
        if not isinstance(id, int) or id <= 0:
            raise ValueError("ID must be a positive integer")

        if not isinstance(title, str) or not title.strip():
            raise ValueError("Title must be a non-empty string")

        if not isinstance(completed, bool):
            raise ValueError("Completed must be a boolean value")

        self.id = id
        self.title = title.strip()
        self.description = description.strip() if description else ""
        self.completed = completed

    def __str__(self):
        """
        String representation of the task for display purposes.
        """
        status = "[x]" if self.completed else "[ ]"
        return f"{self.id}. {status} {self.title}"

    def to_dict(self):
        """
        Convert the task to a dictionary representation.
        """
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "completed": self.completed
        }

    def update(self, title=None, description=None):
        """
        Update the task's title and/or description.

        Args:
            title (str, optional): New title for the task
            description (str, optional): New description for the task
        """
        if title is not None:
            if not isinstance(title, str) or not title.strip():
                raise ValueError("Title must be a non-empty string")
            self.title = title.strip()

        if description is not None:
            self.description = description.strip() if description else ""