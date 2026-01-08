from pydantic import BaseModel
from typing import Optional


class PipelineStageCreate(BaseModel):
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class PipelineStageResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class PipelineStageUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

    class Config:
        from_attributes = True
