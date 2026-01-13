from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from models.task import Task


class TaskResponse(BaseModel):
    id: Optional[int]
    user_id: str
    title: str
    description: Optional[str] = None
    completed: bool
    created_at: datetime
    updated_at: datetime


class TaskListResponse(BaseModel):
    tasks: List[TaskResponse]
    total: int


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    created_at: datetime
    updated_at: datetime


class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None