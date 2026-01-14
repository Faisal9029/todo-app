"""
Main entry point for the console todo application.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from storage.task_repository import TaskRepository
from services.task_service import TaskService
from ui.console import ConsoleUI


def main():
    """Main function to run the application."""
    # Initialize the application components
    repository = TaskRepository()
    task_service = TaskService(repository)
    ui = ConsoleUI(task_service)

    # Run the application
    ui.run()


if __name__ == "__main__":
    main()