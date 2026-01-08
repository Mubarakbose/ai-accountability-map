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

# This file lives at /app/main.py inside the container
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # -> /app
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pipeline_stage.router)
app.include_router(pipeline_method.router)
app.include_router(pipeline_detail.router)
app.include_router(responsible_actor.router)
