from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import Optional
from datetime import timedelta

from database.database import get_session
from models.user import User, UserCreate
from models.response import TokenResponse
from core.auth import create_access_token, TokenData, verify_user_id_match, get_current_user
from services.user_service import UserService
from pydantic import BaseModel


router = APIRouter(tags=["auth"])


class UserCreate(BaseModel):
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


@router.post("/auth/signup", response_model=TokenResponse)
def signup(user_data: UserCreate, session: Session = Depends(get_session)):
    """
    Create a new user account and return an access token.
    """
    try:
        # Use the User service to create the user
        db_user = UserService.create_user(session, user_data)

        # Create token data
        token_data = {"user_id": str(db_user.id), "username": db_user.username}

        # Create access token
        access_token = create_access_token(
            data=token_data,
            expires_delta=timedelta(minutes=30)  # Token expires in 30 minutes
        )

        return {"access_token": access_token, "token_type": "bearer"}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e)
        )


@router.post("/auth/login", response_model=TokenResponse)
def login(user_data: UserLogin, session: Session = Depends(get_session)):
    """
    Authenticate a user and return an access token.
    """
    # Use the User service to authenticate the user
    user = UserService.authenticate_user(session, user_data.email, user_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create token data
    token_data = {"user_id": str(user.id), "username": user.username}

    # Create access token
    access_token = create_access_token(
        data=token_data,
        expires_delta=timedelta(minutes=30)  # Token expires in 30 minutes
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/auth/refresh", response_model=TokenResponse)
def refresh_token(
    current_user: TokenData = Depends(get_current_user)
):
    """
    Refresh an access token.
    """
    # Create new token data
    new_token_data = {"user_id": current_user.user_id, "username": current_user.username}

    # Create new access token
    new_access_token = create_access_token(
        data=new_token_data,
        expires_delta=timedelta(minutes=30)  # Token expires in 30 minutes
    )

    return {"access_token": new_access_token, "token_type": "bearer"}