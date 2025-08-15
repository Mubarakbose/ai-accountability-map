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
    file_url: Optional[str] = None  # public URL (relative)

    class Config:
        from_attributes = True

    @staticmethod
    def from_orm_with_url(obj) -> "PipelineDetailResponse":
        """
        Build a response from the ORM object and produce a *relative* file_url,
        e.g. "/uploads/<filename>". This works behind Nginx and locally.
        """
        detail = PipelineDetailResponse.model_validate(obj)
        if obj.file_path:
            filename = os.path.basename(obj.file_path)
            # Relative path so it works in prod (/api proxied) and locally
            detail.file_url = f"/uploads/{filename}"
        return detail


class PipelineDetailUpdate(BaseModel):
    name: Optional[str] = None
    value: Optional[str] = None
    description: Optional[str] = None

    class Config:
        from_attributes = True
