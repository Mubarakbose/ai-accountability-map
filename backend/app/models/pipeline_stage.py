from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from database import Base
import uuid

class PipelineStage(Base):
    __tablename__ = "pipeline_stages"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False, unique=True)
    description = Column(String)

    # If a stage is deleted, all its methods are also deleted
    methods = relationship("PipelineMethod", back_populates="stage", cascade="all, delete-orphan")
