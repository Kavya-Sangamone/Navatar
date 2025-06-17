from sqlalchemy.orm import Session
from app import models, schemas

def create_admin(db: Session, admin: schemas.AdminCreate):
    db_admin = models.Admin(**admin.dict())
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin

def get_admins(db: Session):
    return db.query(models.Admin).all()

def get_admin(db: Session, admin_id: int):
    return db.query(models.Admin).filter(models.Admin.admin_id == admin_id).first()


