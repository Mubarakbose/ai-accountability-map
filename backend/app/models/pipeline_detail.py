from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import uuid
from datetime import datetime

class PipelineDetail(Base):
    __tablename__ = "pipeline_details"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    method_id = Column(String, ForeignKey("pipeline_methods.id"), nullable=False)
    name = Column(String, nullable=False)
    value = Column(String, nullable=False)
    description = Column(String)
    file_path = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    method = relationship("PipelineMethod", back_populates="details")
    #actors = relationship("ResponsibleActor", back_populates="detail", cascade="all, delete-orphan")
