from src.storage.task_repository import TaskRepository
from src.services.task_service import TaskService
from src.ui.console import ConsoleUI


def main():
    """
    Main entry point for the Todo Application.
    """
    # Initialize the application components
    task_repository = TaskRepository()
    task_service = TaskService(task_repository)
    console_ui = ConsoleUI(task_service)

    # Run the application
    console_ui.run()


if __name__ == "__main__":
    main()