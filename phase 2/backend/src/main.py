import asyncio
import signal
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.auth import router as auth_router
from api.tasks import router as tasks_router
from core.error_handler import init_error_handlers, setup_logging


# Set up logging
setup_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handle application startup and shutdown events.
    """
    # Startup
    print("Application starting up...")

    # Create database tables
    from database.database import engine
    from sqlmodel import SQLModel
    from models.user import User  # Import models to register them
    from models.task import Task

    print("Creating database tables...")
    SQLModel.metadata.create_all(engine)
    print("Database tables created successfully!")

    # Yield control to the application
    yield

    # Shutdown
    print("Application shutting down...")
    # Add any cleanup code here if needed


# Create FastAPI app instance with lifespan
app = FastAPI(
    title="Todo API",
    description="A full-stack todo application API with authentication",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],  # Allow frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize error handlers
init_error_handlers(app)

# Include API routers - auth_router has /auth prefix, tasks_router has /api/{user_id} prefix
app.include_router(auth_router, prefix="/api")
app.include_router(tasks_router)  # tasks router already has /api/{user_id} prefix


@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API!"}


@app.get("/health")
def health_check():
    """
    Health check endpoint that verifies database connectivity.
    Returns 200 if healthy, 503 if database is unavailable.
    """
    from database.database import engine
    from sqlalchemy import text
    from fastapi import HTTPException

    try:
        # Test database connection
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Database connection failed: {str(e)}"
        )


@app.get("/api/health")
def api_health_check():
    """
    Health check endpoint that verifies database connectivity.
    Returns 200 if healthy, 503 if database is unavailable.
    """
    from database.database import engine
    from sqlalchemy import text
    from fastapi import HTTPException

    try:
        # Test database connection
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Database connection failed: {str(e)}"
        )