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
def create_navatar(navatar: schemas.NavatarCreate, db: Session = Depends(get_db)):
    return crud.navatar.create_navatar(db, navatar)

@router.get("/")
def read_navatars(db: Session = Depends(get_db)):
    return crud.navatar.get_navatars(db)

@router.get("/{navatar_id}")
def read_navatar(navatar_id: int, db: Session = Depends(get_db)):
    return crud.navatar.get_navatar(db, navatar_id)


