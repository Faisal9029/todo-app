"""
Console UI for the todo application.
Provides the menu interface and handles user input/output.
"""

from typing import Optional
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from services.task_service import TaskService


class ConsoleUI:
    """Console user interface for the todo application."""

    def __init__(self, task_service: TaskService):
        """
        Initialize the console UI with a task service.

        Args:
            task_service: TaskService instance to interact with
        """
        self.task_service = task_service

    def display_menu(self):
        """Display the main menu options."""
        print("\n=== Todo Application ===")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Update Task")
        print("4. Delete Task")
        print("5. Mark Complete/Incomplete")
        print("6. Exit")
        print("========================")

    def get_user_choice(self) -> int:
        """
        Get the user's menu choice.

        Returns:
            int: The user's menu choice (1-6)
        """
        while True:
            try:
                choice = int(input("Enter your choice (1-6): "))
                if 1 <= choice <= 6:
                    return choice
                else:
                    print("Please enter a number between 1 and 6.")
            except ValueError:
                print("Please enter a valid number.")

    def add_task(self):
        """Handle adding a new task."""
        print("\n--- Add Task ---")
        title = input("Enter task title: ").strip()

        if not title:
            print("Error: Title cannot be empty.")
            return

        description_input = input("Enter task description (optional, press Enter to skip): ").strip()
        description = description_input if description_input else None

        try:
            task = self.task_service.add_task(title, description)
            print(f"Task added successfully! ID: {task.id}")
        except ValueError as e:
            print(f"Error: {e}")

    def view_tasks(self):
        """Handle viewing all tasks."""
        print("\n--- Task List ---")
        tasks = self.task_service.get_all_tasks()

        if not tasks:
            print("No tasks found.")
            return

        for task in tasks:
            status = "[x]" if task.completed else "[ ]"
            print(f"{task.id}. {status} {task.title}")
            if task.description:
                print(f"    Description: {task.description}")

    def update_task(self):
        """Handle updating a task."""
        print("\n--- Update Task ---")
        try:
            task_id = int(input("Enter task ID to update: "))
        except ValueError:
            print("Error: Please enter a valid task ID (number).")
            return

        # Check if task exists
        existing_task = self.task_service.get_task_by_id(task_id)
        if not existing_task:
            print(f"Error: Task with ID {task_id} not found.")
            return

        print(f"Current task: {existing_task.title}")
        if existing_task.description:
            print(f"Current description: {existing_task.description}")

        new_title = input("Enter new title (press Enter to keep current): ").strip()
        new_title = new_title if new_title else None

        new_description = input("Enter new description (press Enter to keep current): ").strip()
        new_description = new_description if new_description else None

        try:
            updated_task = self.task_service.update_task(task_id, new_title, new_description)
            if updated_task:
                print(f"Task {task_id} updated successfully!")
            else:
                print(f"Error: Could not update task {task_id}.")
        except ValueError as e:
            print(f"Error: {e}")

    def delete_task(self):
        """Handle deleting a task."""
        print("\n--- Delete Task ---")
        try:
            task_id = int(input("Enter task ID to delete: "))
        except ValueError:
            print("Error: Please enter a valid task ID (number).")
            return

        success = self.task_service.delete_task(task_id)
        if success:
            print(f"Task {task_id} deleted successfully!")
        else:
            print(f"Error: Task with ID {task_id} not found.")

    def toggle_completion(self):
        """Handle toggling task completion status."""
        print("\n--- Mark Complete/Incomplete ---")
        try:
            task_id = int(input("Enter task ID to toggle: "))
        except ValueError:
            print("Error: Please enter a valid task ID (number).")
            return

        task = self.task_service.toggle_task_completion(task_id)
        if task:
            status = "completed" if task.completed else "incomplete"
            print(f"Task {task_id} marked as {status}!")
        else:
            print(f"Error: Task with ID {task_id} not found.")

    def run(self):
        """Run the main application loop."""
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
                self.toggle_completion()
            elif choice == 6:
                print("Thank you for using the Todo Application. Goodbye!")
                break

            # Pause to let user see results before showing menu again
            input("\nPress Enter to continue...")