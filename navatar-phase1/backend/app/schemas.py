from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class CompanyCreate(BaseModel):
    name: str
    pincode: Optional[str] #can have default values
    country: Optional[str]

class CompanyOut(CompanyCreate):
    company_id: int
    class Config:
        orm_mode = True

class NavatarCreate(BaseModel):
    company_id: int
    navatar_name: str
    location: str

class AdminCreate(BaseModel):
    company_id: int
    navatar_id: int
    admin_name: str
    admin_email: str

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class UserOut(UserCreate):
    user_id: int
    class Config:
        orm_mode = True

class BookingBase(BaseModel):
    date: datetime
    status: str

class BookingCreate(BookingBase):
    user_id: int
    navatar_id: int

class Booking(BookingBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

