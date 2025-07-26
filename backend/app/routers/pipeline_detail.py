from fastapi import APIRouter, Depends, HTTPException, Response, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.pipeline_detail import PipelineDetail
from schemas.pipeline_detail import PipelineDetailResponse, PipelineDetailUpdate
import shutil
import os
from uuid import uuid4

router = APIRouter(
    prefix="/pipeline_details",
    tags=["Pipeline Details"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/", response_model=PipelineDetailResponse, status_code=201)
def create_detail(
    method_id: str = Form(...),
    name: str = Form(...),
    value: str = Form(...),
    description: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    file_path = None
    if file:
        filename = f"{uuid4()}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    new_detail = PipelineDetail(
        method_id=method_id,
        name=name,
        value=value,
        description=description,
        file_path=file_path,
    )
    db.add(new_detail)
    db.commit()
    db.refresh(new_detail)
    return PipelineDetailResponse.from_orm_with_url(new_detail)


@router.get("/", response_model=List[PipelineDetailResponse])
def get_details(db: Session = Depends(get_db)):
    details = db.query(PipelineDetail).all()
    return [PipelineDetailResponse.from_orm_with_url(d) for d in details]


@router.get("/{detail_id}", response_model=PipelineDetailResponse)
def get_detail(detail_id: str, db: Session = Depends(get_db)):
    detail = db.query(PipelineDetail).filter(PipelineDetail.id == detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Detail not found")
    return PipelineDetailResponse.from_orm_with_url(detail)


@router.delete("/{detail_id}", status_code=204)
def delete_detail(detail_id: str, db: Session = Depends(get_db)):
    detail = db.query(PipelineDetail).filter(PipelineDetail.id == detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Detail not found")
    db.delete(detail)
    db.commit()
    return Response(status_code=204)

@router.put("/{detail_id}", response_model=PipelineDetailResponse)
def update_detail(detail_id: str, update_data: PipelineDetailUpdate, db: Session = Depends(get_db)):
    detail = db.query(PipelineDetail).filter(PipelineDetail.id == detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Detail not found")

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(detail, field, value)

    db.commit()
    db.refresh(detail)
    return PipelineDetailResponse.from_orm_with_url(detail)
