from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.pipeline_stage import PipelineStage
from schemas.pipeline_stage import PipelineStageCreate, PipelineStageResponse, PipelineStageUpdate

router = APIRouter(
    prefix="/pipeline_stages",
    tags=["Pipeline Stages"]
)

@router.post("/", response_model=PipelineStageResponse, status_code=status.HTTP_201_CREATED)
def create_stage(stage: PipelineStageCreate, db: Session = Depends(get_db)):
    new_stage = PipelineStage(
        name=stage.name,
        description=stage.description
    )
    db.add(new_stage)
    db.commit()
    db.refresh(new_stage)
    return new_stage

@router.get("/", response_model=List[PipelineStageResponse])
def get_stages(db: Session = Depends(get_db)):
    return db.query(PipelineStage).all()

@router.get("/{stage_id}", response_model=PipelineStageResponse)
def get_stage(stage_id: str, db: Session = Depends(get_db)):
    stage = db.query(PipelineStage).filter(PipelineStage.id == stage_id).first()
    if not stage:
        raise HTTPException(status_code=404, detail="Stage not found")
    return stage

@router.put("/{stage_id}", response_model=PipelineStageResponse)
def update_stage(stage_id: str, stage: PipelineStageUpdate, db: Session = Depends(get_db)):
    db_stage = db.query(PipelineStage).filter(PipelineStage.id == stage_id).first()
    if not db_stage:
        raise HTTPException(status_code=404, detail="Stage not found")

    if stage.name is not None:
        db_stage.name = stage.name
    if stage.description is not None:
        db_stage.description = stage.description

    db.commit()
    db.refresh(db_stage)
    return db_stage

@router.delete("/{stage_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_stage(stage_id: str, db: Session = Depends(get_db)):
    db_stage = db.query(PipelineStage).filter(PipelineStage.id == stage_id).first()
    if not db_stage:
        raise HTTPException(status_code=404, detail="Stage not found")

    db.delete(db_stage)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
