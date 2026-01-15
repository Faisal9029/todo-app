from sqlmodel import Session, select
from typing import Optional
from models.user import User, UserCreate, UserUpdate, hash_password, verify_password
from core.config import settings
import uuid


class UserService:
    @staticmethod
    def create_user(session: Session, user_create) -> User:
        """Create a new user with hashed password."""
        # Extract email from user_create
        email = user_create.email
        password = user_create.password

        # Generate username from email if not provided
        username = getattr(user_create, 'username', None)
        if not username:
            # Use the part before @ in email as username base
            username = email.split('@')[0]
            # Ensure username is unique by appending a suffix if needed
            counter = 1
            base_username = username
            while session.exec(select(User).where(User.username == username)).first():
                username = f"{base_username}{counter}"
                counter += 1

        # Check if user already exists
        existing_user = session.exec(
            select(User).where((User.username == username) | (User.email == email))
        ).first()

        if existing_user:
            raise ValueError("Email already exists")

        # Hash the password
        hashed_password = hash_password(password)

        # Create the user with explicit UUID
        user_id = str(uuid.uuid4())
        db_user = User(
            id=user_id,
            username=username,
            email=email,
            hashed_password=hashed_password
        )

        session.add(db_user)
        session.commit()
        session.refresh(db_user)

        return db_user

    @staticmethod
    def authenticate_user(session: Session, email: str, password: str) -> Optional[User]:
        """Authenticate user with email and password."""
        user = session.exec(select(User).where(User.email == email)).first()

        if not user or not verify_password(password, user.hashed_password):
            return None

        return user

    @staticmethod
    def get_user_by_id(session: Session, user_id: str) -> Optional[User]:
        """Get a user by ID."""
        return session.exec(select(User).where(User.id == user_id)).first()

    @staticmethod
    def get_user_by_email(session: Session, email: str) -> Optional[User]:
        """Get a user by email."""
        return session.exec(select(User).where(User.email == email)).first()

    @staticmethod
    def update_user(session: Session, user_id: str, user_update: UserUpdate) -> Optional[User]:
        """Update user information."""
        db_user = session.exec(select(User).where(User.id == user_id)).first()

        if not db_user:
            return None

        # Update fields if provided
        if user_update.username is not None:
            db_user.username = user_update.username
        if user_update.email is not None:
            # Check if email is already taken by another user
            existing_user = session.exec(
                select(User).where(User.email == user_update.email, User.id != user_id)
            ).first()
            if existing_user:
                raise ValueError("Email already exists")
            db_user.email = user_update.email
        if user_update.password is not None:
            db_user.hashed_password = hash_password(user_update.password)

        session.add(db_user)
        session.commit()
        session.refresh(db_user)

        return db_user

    @staticmethod
    def delete_user(session: Session, user_id: str) -> bool:
        """Delete a user by ID."""
        db_user = session.exec(select(User).where(User.id == user_id)).first()

        if not db_user:
            return False

        session.delete(db_user)
        session.commit()

        return True