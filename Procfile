# Procfile for multi-service application deployment
# For deployment platforms that support multi-process apps

web: cd phase 2/frontend && npm run dev
worker: cd phase 2/backend && python -m uvicorn src.main:app --host 0.0.0.0 --port 8000