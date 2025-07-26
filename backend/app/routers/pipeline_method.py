from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.pipeline_method import PipelineMethod
from models.responsible_actor import ResponsibleActor
from schemas.pipeline_method import PipelineMethodCreate, PipelineMethodResponse, PipelineMethodUpdate
import uuid

router = APIRouter(
    prefix="/pipeline_methods",
    tags=["Pipeline Methods"]
)

@router.post("/", response_model=PipelineMethodResponse)
def create_method(method: PipelineMethodCreate, db: Session = Depends(get_db)):
    actors = db.query(ResponsibleActor).filter(ResponsibleActor.id.in_(method.actor_ids)).all()

    new_method = PipelineMethod(
        id=str(uuid.uuid4()),
        name=method.name,
        description=method.description,
        stage_id=method.stage_id,
        actors=actors
    )
    db.add(new_method)
    db.commit()
    db.refresh(new_method)
    return new_method  # ✅ Return the SQLAlchemy ORM object

@router.get("/", response_model=List[PipelineMethodResponse])
def get_methods(db: Session = Depends(get_db)):
    return db.query(PipelineMethod).all()  # ✅ Return list of ORM objects

@router.get("/{method_id}", response_model=PipelineMethodResponse)
def get_method_by_id(method_id: str, db: Session = Depends(get_db)):
    method = db.query(PipelineMethod).filter(PipelineMethod.id == method_id).first()
    if not method:
        raise HTTPException(status_code=404, detail="Method not found")
    return method  # ✅ Return ORM object

@router.put("/{method_id}", response_model=PipelineMethodResponse)
def update_method(method_id: str, update_data: PipelineMethodUpdate, db: Session = Depends(get_db)):
    method = db.query(PipelineMethod).filter(PipelineMethod.id == method_id).first()
    if not method:
        raise HTTPException(status_code=404, detail="Method not found")

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(method, field, value)

    db.commit()
    db.refresh(method)
    return method
