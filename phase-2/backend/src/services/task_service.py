from sqlmodel import Session, select
from typing import List, Optional
from models.task import Task, TaskBase
from models.user import User


class TaskService:
    @staticmethod
    def create_task(session: Session, user_id: str, task_create: TaskBase) -> Task:
        """Create a new task for a user."""
        # Create the task with the user's ID
        db_task = Task(**task_create.dict(), user_id=user_id)

        session.add(db_task)
        session.commit()
        session.refresh(db_task)

        return db_task

    @staticmethod
    def get_tasks(session: Session, user_id: str) -> List[Task]:
        """Get all tasks for a user."""
        statement = select(Task).where(Task.user_id == user_id)
        tasks = session.exec(statement).all()
        return tasks

    @staticmethod
    def get_task(session: Session, task_id: int, user_id: str) -> Optional[Task]:
        """Get a specific task by ID for a user."""
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        task = session.exec(statement).first()
        return task

    @staticmethod
    def update_task(session: Session, task_id: int, user_id: str, task_update: TaskBase) -> Optional[Task]:
        """Update a specific task for a user."""
        # Get the existing task
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        db_task = session.exec(statement).first()

        if not db_task:
            return None

        # Update the task with new values
        for key, value in task_update.dict(exclude_unset=True).items():
            setattr(db_task, key, value)

        session.add(db_task)
        session.commit()
        session.refresh(db_task)

        return db_task

    @staticmethod
    def delete_task(session: Session, task_id: int, user_id: str) -> bool:
        """Delete a specific task for a user."""
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        db_task = session.exec(statement).first()

        if not db_task:
            return False

        session.delete(db_task)
        session.commit()

        return True

    @staticmethod
    def toggle_task_completion(session: Session, task_id: int, user_id: str, completed: bool) -> Optional[Task]:
        """Toggle the completion status of a task."""
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        db_task = session.exec(statement).first()

        if not db_task:
            return None

        # Update the completion status
        db_task.completed = completed

        session.add(db_task)
        session.commit()
        session.refresh(db_task)

        return db_task