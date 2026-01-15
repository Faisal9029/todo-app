from sqlmodel import SQLModel, Field
from sqlalchemy import Column, String, text
from datetime import datetime
from typing import Optional
import bcrypt
import uuid


class UserBase(SQLModel):
    username: str = Field(min_length=3, max_length=50, regex="^[a-zA-Z0-9_]+$")
    email: str = Field(regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')


class User(UserBase, table=True):
    id: str = Field(
        sa_column=Column(String, primary_key=True, index=True)
    )
    hashed_password: str = Field(min_length=1)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class UserCreate(UserBase):
    password: str = Field(min_length=8)


class UserRead(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime


class UserUpdate(SQLModel):
    username: Optional[str] = Field(default=None, min_length=3, max_length=50, regex="^[a-zA-Z0-9_]+$")
    email: Optional[str] = Field(default=None, regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    password: Optional[str] = Field(default=None, min_length=8)


def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password."""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))