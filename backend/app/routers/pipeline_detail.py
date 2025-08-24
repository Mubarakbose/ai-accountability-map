from fastapi import APIRouter, Depends, HTTPException, Response, UploadFile, File, Form, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models.pipeline_detail import PipelineDetail
from schemas.pipeline_detail import PipelineDetailResponse, PipelineDetailUpdate
import os
from uuid import uuid4

router = APIRouter(
    prefix="/pipeline_details",
    tags=["Pipeline Details"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def _safe_name(name: str) -> str:
    # simple sanitizer: allow alnum, -, _, .
    name = str(name or "")
    cleaned = "".join(c for c in name if c.isalnum() or c in ("-", "_", "."))
    return cleaned or "file"


async def _save_upload_file(upload: UploadFile, uploads_dir: str = UPLOAD_DIR) -> str:
    os.makedirs(uploads_dir, exist_ok=True)
    original_name = os.path.basename(upload.filename or "")
    safe_name = _safe_name(original_name)
    unique_name = f"{uuid4()}_{safe_name}"
    dest_path = os.path.join(uploads_dir, unique_name)

    contents = await upload.read()
    with open(dest_path, "wb") as f:
        f.write(contents)

    return unique_name


def _normalize_detail_obj(d):
    if d is None:
        return
    is_dict = isinstance(d, dict)

    fp = d.get("file_path") if is_dict else getattr(d, "file_path", None)
    fu = d.get("file_url") if is_dict else getattr(d, "file_url", None)

    filename = None
    if fp:
        filename = os.path.basename(str(fp)).replace("\\", "/")
    elif fu:
        raw = str(fu).replace("\\", "/").lstrip("/")
        if raw.lower().startswith("api/"):
            raw = raw.split("/", 1)[-1] if "/" in raw else raw
        raw = raw.replace("uploads/", "")
        filename = os.path.basename(raw)

    if filename:
        if is_dict:
            d["file_path"] = filename
            d["file_url"] = f"/uploads/{filename}"
        else:
            setattr(d, "file_path", filename)
            setattr(d, "file_url", f"/uploads/{filename}")
    else:
        if is_dict:
            d["file_path"] = None
            d["file_url"] = None
        else:
            setattr(d, "file_path", None)
            setattr(d, "file_url", None)


@router.post("/", response_model=PipelineDetailResponse, status_code=201)
async def create_detail(
    method_id: str = Form(...),
    name: str = Form(...),
    value: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    file_path = None
    if file:
        file_path = await _save_upload_file(file, uploads_dir=UPLOAD_DIR)

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

    _normalize_detail_obj(new_detail)
    return PipelineDetailResponse.from_orm_with_url(new_detail)


@router.get("/", response_model=List[PipelineDetailResponse])
def get_details(method_id: Optional[str] = Query(None), db: Session = Depends(get_db)):
    q = db.query(PipelineDetail)
    if method_id:
        q = q.filter(PipelineDetail.method_id == method_id)
    details = q.all()
    for d in details:
        _normalize_detail_obj(d)
    return [PipelineDetailResponse.from_orm_with_url(d) for d in details]


@router.get("/by_method/{method_id}", response_model=List[PipelineDetailResponse])
def get_details_by_method(method_id: str, db: Session = Depends(get_db)):
    details = db.query(PipelineDetail).filter(PipelineDetail.method_id == method_id).all()
    for d in details:
        _normalize_detail_obj(d)
    return [PipelineDetailResponse.from_orm_with_url(d) for d in details]


@router.get("/{detail_id}", response_model=PipelineDetailResponse)
def get_detail(detail_id: str, db: Session = Depends(get_db)):
    detail = db.query(PipelineDetail).filter(PipelineDetail.id == detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Detail not found")
    _normalize_detail_obj(detail)
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
    _normalize_detail_obj(detail)
    return PipelineDetailResponse.from_orm_with_url(detail)