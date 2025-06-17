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

@router.post("/", response_model=schemas.CompanyOut)
def create_company(company: schemas.CompanyCreate, db: Session = Depends(get_db)):
    return crud.company.create_company(db, company)

@router.get("/", response_model=list[schemas.CompanyOut])
def get_companies(db: Session = Depends(get_db)):
    return crud.company.get_companies(db)

@router.get("/")
def read_companies(db: Session = Depends(get_db)):
    return {"message": "List companies endpoint"}

@router.delete("/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    return crud.company.delete_company(db, company_id)
