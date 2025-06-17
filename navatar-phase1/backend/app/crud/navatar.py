from sqlalchemy.orm import Session
from app import models, schemas

def create_navatar(db: Session, navatar: schemas.NavatarCreate):
    db_navatar = models.Navatar(**navatar.dict())
    db.add(db_navatar)
    db.commit()
    db.refresh(db_navatar)
    return db_navatar
def get_navatars(db: Session):
    return db.query(models.Navatar).all()

def get_navatar(db: Session, navatar_id: int):
    return db.query(models.Navatar).filter(models.Navatar.id == navatar_id).first()


