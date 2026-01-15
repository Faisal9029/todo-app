from pydantic_settings import SettingsConfigDict, BaseSettings
from pydantic import field_validator
import re
import os
from pathlib import Path


class Settings(BaseSettings):
    model_config = SettingsConfigDict(case_sensitive=False, extra='ignore', env_file=".env", env_file_encoding='utf-8')

    # Database settings - REQUIRED (no defaults for production security)
    DATABASE_URL: str
    DB_ECHO: bool = False

    # JWT settings - REQUIRED (no defaults for production security)
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Better Auth settings
    BETTER_AUTH_SECRET: str = "your-better-auth-secret-key"

    # Provide lowercase aliases for backward compatibility
    @property
    def database_url(self) -> str:
        return self.DATABASE_URL

    @property
    def db_echo(self) -> bool:
        return self.DB_ECHO

    @property
    def jwt_secret_key(self) -> str:
        return self.JWT_SECRET_KEY

    @property
    def jwt_algorithm(self) -> str:
        return self.JWT_ALGORITHM

    @property
    def access_token_expire_minutes(self) -> int:
        return self.ACCESS_TOKEN_EXPIRE_MINUTES

    @property
    def better_auth_secret(self) -> str:
        return self.BETTER_AUTH_SECRET

    @field_validator('DATABASE_URL')
    @classmethod
    def validate_database_url(cls, v: str) -> str:
        """Validate DATABASE_URL format for PostgreSQL"""
        if not v:
            raise ValueError("DATABASE_URL is required and cannot be empty")

        # Check for PostgreSQL URL format
        if not v.startswith(('postgresql://', 'postgres://')):
            raise ValueError("DATABASE_URL must be a valid PostgreSQL connection string (postgresql:// or postgres://)")

        # Check for SSL requirement (Neon requires SSL)
        if 'sslmode=' not in v.lower():
            raise ValueError("DATABASE_URL must include sslmode parameter (e.g., ?sslmode=require) for secure connections")

        return v

    @field_validator('JWT_SECRET_KEY')
    @classmethod
    def validate_jwt_secret(cls, v: str) -> str:
        """Validate JWT_SECRET_KEY meets minimum security requirements"""
        if not v:
            raise ValueError("JWT_SECRET_KEY is required and cannot be empty")

        # Require minimum 32 bytes (256 bits) when base64 encoded
        if len(v) < 32:
            raise ValueError("JWT_SECRET_KEY must be at least 32 characters for 256-bit entropy")

        return v


settings = Settings()