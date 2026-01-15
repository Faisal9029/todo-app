from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from database.database import get_session
from models.task import Task, TaskBase
from models.response import TaskResponse, TaskListResponse
from services.task_service import TaskService
from core.auth import get_current_user, verify_user_id_match, TokenData


router = APIRouter(prefix="/api/{user_id}", tags=["tasks"])


@router.get("/tasks", response_model=TaskListResponse)
def get_tasks(
    user_id: str,
    current_user: TokenData = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get all tasks for the authenticated user.
    """
    # Verify that the user_id in the URL matches the user_id in the JWT token
    if not verify_user_id_match(user_id, current_user.user_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access these tasks"
        )

    # Use TaskService to get tasks
    db_tasks = TaskService.get_tasks(session, user_id)

    # Convert Task objects to TaskResponse objects for the response
    tasks = [TaskResponse(
        id=task.id,
        user_id=task.user_id,
        title=task.title,
        description=task.description,
        completed=task.completed,
        created_at=task.created_at,
        updated_at=task.updated_at
    ) for task in db_tasks]

    # Create response with tasks and total count
    return TaskListResponse(tasks=tasks, total=len(tasks))


@router.post("/tasks", response_model=Task)
def create_task(
    user_id: str,
    task: TaskBase,
    current_user: TokenData = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the authenticated user.
    """
    # Verify that the user_id in the URL matches the user_id in the JWT token
    if not verify_user_id_match(user_id, current_user.user_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create tasks for this user"
        )

    # Use TaskService to create the task
    db_task = TaskService.create_task(session, user_id, task)

    return db_task


@router.get("/tasks/{task_id}", response_model=Task)
def get_task(
    user_id: str,
    task_id: int,
    current_user: TokenData = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID for the authenticated user.
    """
    # Verify that the user_id in the URL matches the user_id in the JWT token
    if not verify_user_id_match(user_id, current_user.user_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this task"
        )

    # Use TaskService to get the task
    db_task = TaskService.get_task(session, task_id, user_id)

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return db_task


@router.put("/tasks/{task_id}", response_model=Task)
def update_task(
    user_id: str,
    task_id: int,
    task: TaskBase,
    current_user: TokenData = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a specific task by ID for the authenticated user.
    """
    # Verify that the user_id in the URL matches the user_id in the JWT token
    if not verify_user_id_match(user_id, current_user.user_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this task"
        )

    # Use TaskService to update the task
    db_task = TaskService.update_task(session, task_id, user_id, task)

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return db_task


@router.delete("/tasks/{task_id}")
def delete_task(
    user_id: str,
    task_id: int,
    current_user: TokenData = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task by ID for the authenticated user.
    """
    # Verify that the user_id in the URL matches the user_id in the JWT token
    if not verify_user_id_match(user_id, current_user.user_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this task"
        )

    # Use TaskService to delete the task
    success = TaskService.delete_task(session, task_id, user_id)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return {"message": "Task deleted successfully"}


@router.patch("/tasks/{task_id}/complete", response_model=Task)
def toggle_task_completion(
    user_id: str,
    task_id: int,
    completed: bool,
    current_user: TokenData = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a specific task for the authenticated user.
    """
    # Verify that the user_id in the URL matches the user_id in the JWT token
    if not verify_user_id_match(user_id, current_user.user_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this task"
        )

    # Use TaskService to toggle task completion
    db_task = TaskService.toggle_task_completion(session, task_id, user_id, completed)

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return db_task