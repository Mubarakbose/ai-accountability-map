from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from database import Base
from models.method_actor_association import method_actor_association
from datetime import datetime
import uuid

class ResponsibleActor(Base):
    __tablename__ = "responsible_actors"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    contributions = Column(String)
    decisions = Column(String)
    reasons = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

    methods = relationship("PipelineMethod", secondary=method_actor_association, back_populates="actors")
