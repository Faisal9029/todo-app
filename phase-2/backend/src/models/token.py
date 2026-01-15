from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


class JWTToken(SQLModel):
    """Model for JWT token data (used for validation, not stored in database)."""
    token: str
    user_id: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)


class JWTokenBlacklist(SQLModel, table=True):
    """Model for blacklisted JWT tokens (for logout functionality)."""
    id: Optional[int] = Field(default=None, primary_key=True)
    token: str = Field(unique=True, index=True)
    user_id: str = Field(index=True)
    expires_at: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)