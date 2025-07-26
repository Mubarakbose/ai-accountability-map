from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from routers import (
    pipeline_stage,
    pipeline_method,
    pipeline_detail,
    responsible_actor,
)

app = FastAPI()

# ✅ Mount file upload directory before server starts
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ✅ Allow frontend (React) to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev; restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register API routes
app.include_router(pipeline_stage.router)
app.include_router(pipeline_method.router)
app.include_router(pipeline_detail.router)
app.include_router(responsible_actor.router)
