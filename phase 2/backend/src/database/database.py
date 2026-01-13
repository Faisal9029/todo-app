from sqlmodel import create_engine, Session
from sqlalchemy import text
from typing import Generator
from core.config import settings
from sqlalchemy.pool import QueuePool
import time
import logging


def create_engine_with_retry():
    """
    Create a database engine with retry logic for Neon connection issues.
    """
    max_retries = 5
    retry_delay = 2  # seconds

    # Extract host for logging (hide credentials)
    db_url = settings.database_url
    db_host = "unknown"
    if "@" in db_url:
        try:
            db_host = db_url.split("@")[1].split("/")[0]
        except:
            pass

    logging.info(f"🔌 Attempting to connect to database at {db_host}...")
    logging.info(f"   SSL mode: {'✓ enabled' if 'sslmode=' in db_url.lower() else '✗ disabled'}")

    for attempt in range(max_retries):
        try:
            logging.info(f"   Connection attempt {attempt + 1}/{max_retries}...")

            engine = create_engine(
                settings.database_url,
                echo=settings.db_echo,  # Set to True for SQL query logging
                pool_pre_ping=True,  # Verify connections before use - critical for cloud DB
                pool_recycle=300,  # Recycle connections after 5 minutes
                poolclass=QueuePool,
                pool_size=5,
                max_overflow=10,
                pool_timeout=30,
                pool_reset_on_return="commit",
                connect_args={
                    "connect_timeout": 10,
                }
            )

            # Test the connection
            with engine.connect() as conn:
                result = conn.execute(text("SELECT 1"))
                result.fetchone()

            logging.info(f"✅ Database connection established successfully to {db_host}")
            logging.info(f"   Pool size: 5, Max overflow: 10, Connection timeout: 10s")
            return engine

        except Exception as e:
            logging.warning(f"⚠️  Database connection attempt {attempt + 1}/{max_retries} failed: {e}")
            if attempt == max_retries - 1:
                logging.error(f"❌ Failed to connect to database after {max_retries} retries")
                logging.error(f"   Please check: DATABASE_URL format, network connectivity, database availability")
                raise e
            logging.info(f"   Retrying in {retry_delay} seconds...")
            time.sleep(retry_delay)

    raise Exception("Failed to connect to database after retries")


# Create the database engine with retry logic
engine = create_engine_with_retry()


def get_session() -> Generator[Session, None, None]:
    """
    Get a database session for dependency injection.
    """
    with Session(engine) as session:
        yield session