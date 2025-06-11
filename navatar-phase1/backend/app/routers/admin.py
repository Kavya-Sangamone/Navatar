from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import crud, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_admin(admin: schemas.AdminCreate, db: Session = Depends(get_db)):
    return crud.admin.create_admin(db, admin)
