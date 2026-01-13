from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.exc import SQLAlchemyError
import logging
import traceback


def init_error_handlers(app: FastAPI):
    """
    Initialize error handlers for the FastAPI application.
    """

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        """
        Handle HTTP exceptions and return appropriate JSON responses.
        """
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "message": exc.detail if hasattr(exc, 'detail') else "HTTP Error occurred",
                "error_code": exc.status_code
            }
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        """
        Handle request validation errors and return appropriate JSON responses.
        """
        errors = []
        for error in exc.errors():
            errors.append({
                "loc": error["loc"],
                "msg": error["msg"],
                "type": error["type"]
            })

        return JSONResponse(
            status_code=422,
            content={
                "success": False,
                "message": "Validation error",
                "error_code": 422,
                "details": errors
            }
        )

    @app.exception_handler(SQLAlchemyError)
    async def database_exception_handler(request: Request, exc: SQLAlchemyError):
        """
        Handle database errors and return appropriate JSON responses.
        """
        logging.error(f"Database error: {str(exc)}")
        logging.error(traceback.format_exc())

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Database error occurred",
                "error_code": 500
            }
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        """
        Handle general exceptions and return appropriate JSON responses.
        """
        logging.error(f"General error: {str(exc)}")
        logging.error(traceback.format_exc())

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Internal server error",
                "error_code": 500
            }
        )


def setup_logging():
    """
    Set up logging configuration for the application.
    """
    import logging.config

    LOGGING_CONFIG = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": {
                "format": "%(asctime)s %(levelname)s %(name)s %(message)s",
            },
        },
        "handlers": {
            "default": {
                "formatter": "default",
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stderr",
            },
        },
        "loggers": {
            "uvicorn.error": {"handlers": ["default"], "level": "INFO"},
            "uvicorn.access": {"handlers": ["default"], "level": "WARNING"},
            "app": {"handlers": ["default"], "level": "INFO", "propagate": False},
        },
    }

    logging.config.dictConfig(LOGGING_CONFIG)