from src.services.task_service import TaskService
from typing import Optional


class ConsoleUI:
    """
    Console user interface for the todo application.
    """

    def __init__(self, task_service: TaskService):
        """
        Initialize the console UI with a task service.

        Args:
            task_service (TaskService): The service to use for task operations
        """
        self._task_service = task_service

    def display_menu(self):
        """
        Display the main menu options.
        """
        print("\n--- Todo Application ---")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Update Task")
        print("4. Delete Task")
        print("5. Mark Complete / Incomplete")
        print("6. Exit")
        print("------------------------")

    def get_user_choice(self) -> int:
        """
        Get the user's menu choice.

        Returns:
            int: The selected menu option
        """
        try:
            choice = int(input("Enter your choice (1-6): "))
            return choice
        except ValueError:
            print("Invalid input. Please enter a number between 1 and 6.")
            return -1

    def add_task(self):
        """
        Handle adding a new task.
        """
        try:
            title = input("Enter task title: ").strip()
            if not title:
                print("Task title cannot be empty.")
                return

            description = input("Enter task description (optional): ").strip()

            task = self._task_service.add_task(title, description)
            print(f"Task '{task.title}' added successfully with ID {task.id}.")
        except ValueError as e:
            print(f"Error: {e}")
        except Exception as e:
            print(f"An error occurred while adding the task: {e}")

    def view_tasks(self):
        """
        Handle viewing all tasks.
        """
        try:
            tasks = self._task_service.get_all_tasks()

            if not tasks:
                print("No tasks found.")
                return

            print("\n--- Task List ---")
            for task in tasks:
                status = "[x]" if task.completed else "[ ]"
                print(f"{task.id}. {status} {task.title}")
                if task.description:
                    print(f"    Description: {task.description}")
            print("-----------------")
        except Exception as e:
            print(f"An error occurred while viewing tasks: {e}")

    def update_task(self):
        """
        Handle updating a task.
        """
        try:
            task_id = self._get_task_id_input("Enter the ID of the task to update: ")
            if task_id is None:
                return

            # Check if task exists
            task = self._task_service.get_task_by_id(task_id)
            if not task:
                print(f"Task with ID {task_id} not found.")
                return

            print(f"Current task: {task.title}")
            if task.description:
                print(f"Current description: {task.description}")

            new_title = input("Enter new title (leave blank to keep current): ").strip()
            new_description = input("Enter new description (leave blank to keep current): ").strip()

            # Use current values if user didn't provide new ones
            title = new_title if new_title else task.title
            description = new_description if new_description else task.description

            if self._task_service.update_task(task_id, title, description):
                print(f"Task with ID {task_id} updated successfully.")
            else:
                print(f"Failed to update task with ID {task_id}.")
        except ValueError as e:
            print(f"Error: {e}")
        except Exception as e:
            print(f"An error occurred while updating the task: {e}")

    def delete_task(self):
        """
        Handle deleting a task.
        """
        try:
            task_id = self._get_task_id_input("Enter the ID of the task to delete: ")
            if task_id is None:
                return

            # Check if task exists
            task = self._task_service.get_task_by_id(task_id)
            if not task:
                print(f"Task with ID {task_id} not found.")
                return

            confirm = input(f"Are you sure you want to delete task '{task.title}'? (y/n): ").lower()
            if confirm == 'y' or confirm == 'yes':
                if self._task_service.delete_task(task_id):
                    print(f"Task with ID {task_id} deleted successfully.")
                else:
                    print(f"Failed to delete task with ID {task_id}.")
            else:
                print("Task deletion cancelled.")
        except Exception as e:
            print(f"An error occurred while deleting the task: {e}")

    def toggle_task_completion(self):
        """
        Handle toggling a task's completion status.
        """
        try:
            task_id = self._get_task_id_input("Enter the ID of the task to mark complete/incomplete: ")
            if task_id is None:
                return

            # Check if task exists
            task = self._task_service.get_task_by_id(task_id)
            if not task:
                print(f"Task with ID {task_id} not found.")
                return

            if self._task_service.toggle_task_completion(task_id):
                status = "completed" if task.completed else "incomplete"
                print(f"Task '{task.title}' marked as {status}.")
            else:
                print(f"Failed to update completion status for task with ID {task_id}.")
        except Exception as e:
            print(f"An error occurred while toggling task completion: {e}")

    def _get_task_id_input(self, prompt: str) -> Optional[int]:
        """
        Helper method to get a valid task ID from user input.

        Args:
            prompt (str): The prompt to display to the user

        Returns:
            Optional[int]: The task ID if valid, None if invalid
        """
        try:
            task_id = int(input(prompt))
            if task_id <= 0:
                print("Task ID must be a positive integer.")
                return None
            return task_id
        except ValueError:
            print("Invalid input. Please enter a valid task ID (positive integer).")
            return None

    def run(self):
        """
        Run the main application loop.
        """
        print("Welcome to the Todo Application!")
        while True:
            self.display_menu()
            choice = self.get_user_choice()

            if choice == 1:
                self.add_task()
            elif choice == 2:
                self.view_tasks()
            elif choice == 3:
                self.update_task()
            elif choice == 4:
                self.delete_task()
            elif choice == 5:
                self.toggle_task_completion()
            elif choice == 6:
                print("Thank you for using the Todo Application. Goodbye!")
                break
            else:
                print("Invalid choice. Please enter a number between 1 and 6.")

            # Pause to let user see the result before showing menu again
            input("\nPress Enter to continue...")