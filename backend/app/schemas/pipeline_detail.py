from pydantic import BaseModel
from typing import Optional
from uuid import UUID
import os


class PipelineDetailCreate(BaseModel):
    method_id: UUID
    name: str
    value: str
    description: str

    class Config:
        from_attributes = True


class PipelineDetailResponse(PipelineDetailCreate):
    id: UUID
    file_path: Optional[str] = None
    file_url: Optional[str] = None  # <- Add this

    class Config:
        from_attributes = True

    @staticmethod
    def from_orm_with_url(obj) -> "PipelineDetailResponse":
        detail = PipelineDetailResponse.model_validate(obj)
        if obj.file_path:
            filename = os.path.basename(obj.file_path)
            detail.file_url = f"http://127.0.0.1:8000/uploads/{filename}"
        return detail


class PipelineDetailUpdate(BaseModel):
    name: Optional[str] = None
    value: Optional[str] = None
    description: Optional[str] = None

    class Config:
        from_attributes = True
