from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import uuid4
from typing import List
from database import get_db
from models.responsible_actor import ResponsibleActor
from schemas.responsible_actor import ResponsibleActorCreate, ResponsibleActorResponse, ResponsibleActorUpdate
from datetime import datetime

router = APIRouter(
    prefix="/responsible_actors",
    tags=["Responsible Actors"]
)

@router.post("/", response_model=ResponsibleActorResponse)
def create_responsible_actor(actor: ResponsibleActorCreate, db: Session = Depends(get_db)):
    db_actor = ResponsibleActor(
        id=actor.id or str(uuid4()),
        name=actor.name,
        role=actor.role or "",
        contributions=actor.contributions,
        decisions=actor.decisions,
        reasons=actor.reasons,
        timestamp=actor.timestamp or datetime.utcnow()
    )
    db.add(db_actor)
    db.commit()
    db.refresh(db_actor)
    return db_actor

@router.get("/", response_model=List[ResponsibleActorResponse])
def get_responsible_actors(db: Session = Depends(get_db)):
    return db.query(ResponsibleActor).all()

@router.put("/{actor_id}", response_model=ResponsibleActorResponse)
def update_responsible_actor(actor_id: str, update_data: ResponsibleActorUpdate, db: Session = Depends(get_db)):
    actor = db.query(ResponsibleActor).filter(ResponsibleActor.id == actor_id).first()
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(actor, field, value)

    db.commit()
    db.refresh(actor)
    return actor
