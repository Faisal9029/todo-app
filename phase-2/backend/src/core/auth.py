from datetime import datetime, timedelta
from typing import Optional
import jwt
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from .config import settings


# Initialize the security scheme
security = HTTPBearer()


class TokenData(BaseModel):
    user_id: str
    username: Optional[str] = None


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Create a JWT access token with the provided data.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    return encoded_jwt


def verify_token(token: str) -> TokenData:
    """
    Verify the JWT token and return the token data.
    """
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        user_id: str = payload.get("user_id")
        username: str = payload.get("username")

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token_data = TokenData(user_id=user_id, username=username)
        return token_data

    except jwt.exceptions.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> TokenData:
    """
    Get the current user from the JWT token in the Authorization header.
    """
    token_data = verify_token(credentials.credentials)
    return token_data


def verify_user_id_match(url_user_id: str, token_user_id: str) -> bool:
    """
    Verify that the user_id in the URL matches the user_id in the JWT token.
    """
    return url_user_id == token_user_id


def refresh_access_token(token: str):
    """
    Refresh an access token if it's about to expire.
    """
    try:
        # Decode the token to check if it's still valid
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        user_id: str = payload.get("user_id")
        username: str = payload.get("username")

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Create a new token with extended expiration
        new_token_data = {"user_id": user_id, "username": username}
        new_token = create_access_token(
            data=new_token_data,
            expires_delta=timedelta(minutes=settings.access_token_expire_minutes)
        )
        return new_token

    except jwt.exceptions.ExpiredSignatureError:
        # If the token has already expired, raise an exception
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )