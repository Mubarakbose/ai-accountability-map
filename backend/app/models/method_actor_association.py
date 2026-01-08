from sqlalchemy import Table, Column, ForeignKey
from database import Base

method_actor_association = Table(
    "method_actor_association",
    Base.metadata,
    Column("method_id", ForeignKey("pipeline_methods.id"), primary_key=True),
    Column("actor_id", ForeignKey("responsible_actors.id"), primary_key=True),
)
