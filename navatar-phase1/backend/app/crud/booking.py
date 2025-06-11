from sqlalchemy.orm import Session
from app import models, schemas
def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Meeting(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_all_bookings(db: Session):
    return db.query(models.Meeting).all()

def get_bookings_by_user(db: Session, user_id: int):
    return db.query(models.Meeting).filter(models.Meeting.user_id == user_id).all()

def update_booking_status(db: Session, booking_id: int, status: str):
    db_booking = db.query(models.Meeting).filter(models.Meeting.booking_id == booking_id).first()
    if db_booking:
        db_booking.booking_status = status
        db.commit()
        db.refresh(db_booking)
    return db_booking
