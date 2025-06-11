from sqlalchemy.orm import Session
from app import models, schemas
from fastapi import APIRouter, Depends

from app.database import get_db

router = APIRouter()

@router.get("/")
def read_users(db: Session = Depends(get_db)):
    return {"message": "List users endpoint"}

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users_by_company(db: Session, company_id: int):
    return db.query(models.User).filter(models.User.company_id == company_id).all()

def update_user(db: Session, user_id: int, updated_data: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if db_user:
        for key, value in updated_data.dict().items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user
