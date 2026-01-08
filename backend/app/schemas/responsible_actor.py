from pydantic import BaseModel
from typing import Optional
import datetime

class ResponsibleActorCreate(BaseModel):
    id: str
    name: str
    role: Optional[str] = None
    contributions: Optional[str] = None
    decisions: Optional[str] = None
    reasons: Optional[str] = None
    timestamp: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True

class ResponsibleActorResponse(ResponsibleActorCreate):
    class Config:
        from_attributes = True

class ResponsibleActorUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    contributions: Optional[str] = None
    decisions: Optional[str] = None
    reasons: Optional[str] = None
    timestamp: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True
