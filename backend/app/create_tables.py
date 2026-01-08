from database import Base, engine

# Import all models to register them with SQLAlchemy metadata
from models.pipeline_stage import PipelineStage
from models.pipeline_method import PipelineMethod
from models.pipeline_detail import PipelineDetail
from models.responsible_actor import ResponsibleActor  # ✅ Include this

print("✅ Creating database tables...")
Base.metadata.create_all(bind=engine)
print("✅ Tables created successfully.")
