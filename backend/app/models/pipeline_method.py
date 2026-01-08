from sqlalchemy import Column, String, ForeignKey, DateTime  # ✅ Added DateTime
from sqlalchemy.orm import relationship
from database import Base
from models.method_actor_association import method_actor_association
from datetime import datetime
import uuid

class PipelineMethod(Base):
    __tablename__ = "pipeline_methods"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    stage_id = Column(String, ForeignKey("pipeline_stages.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)  # ✅ Properly defined column

    stage = relationship("PipelineStage", back_populates="methods")
    details = relationship("PipelineDetail", back_populates="method", cascade="all, delete-orphan")
    actors = relationship("ResponsibleActor", secondary=method_actor_association, back_populates="methods")
