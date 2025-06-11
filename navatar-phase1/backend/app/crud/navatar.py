from sqlalchemy.orm import Session
from app import models, schemas

def create_navatar(db: Session, navatar: schemas.NavatarCreate):
    db_navatar = models.Navatar(**navatar.dict())
    db.add(db_navatar)
    db.commit()
    db.refresh(db_navatar)
    return db_navatar
