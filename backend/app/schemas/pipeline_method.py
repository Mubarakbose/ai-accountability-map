from pydantic import BaseModel
from typing import Optional, List
from schemas.responsible_actor import ResponsibleActorResponse 
from datetime import datetime


class PipelineMethodCreate(BaseModel):
    name: str
    description: Optional[str] = None
    stage_id: str
    actor_ids: List[str]

    class Config:
        from_attributes = True

class PipelineMethodResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    stage_id: str
    actors: List[ResponsibleActorResponse]  # full actor info returned
    timestamp: Optional[datetime]  

    class Config:
        orm_mode = True


class PipelineMethodUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    actor_ids: Optional[List[str]] = None

    class Config:
        from_attributes = True
