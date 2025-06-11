from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Company(Base):
    __tablename__ = "companies"

    company_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    pincode = Column(String(10))
    country = Column(String(100))

    navatars = relationship("Navatar", back_populates="company")
    users = relationship("User", back_populates="company")
    admins = relationship("Admin", back_populates="company")

class Navatar(Base):
    __tablename__ = "navatars"

    navatar_id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.company_id"))
    navatar_name = Column(String(100), nullable=False)
    location = Column(String(200))

    company = relationship("Company", back_populates="navatars")
    bookings = relationship("Booking", back_populates="navatar")
    admins = relationship("Admin", back_populates="navatar")

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    company_id = Column(Integer, ForeignKey("companies.company_id"))
    is_active = Column(Boolean, default=True)

    company = relationship("Company", back_populates="users")
    bookings = relationship("Booking", back_populates="user")

class Admin(Base):
    __tablename__ = "admins"

    admin_id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.company_id"))
    navatar_id = Column(Integer, ForeignKey("navatars.navatar_id"))
    admin_name = Column(String(100), nullable=False)
    admin_email = Column(String(100), unique=True, nullable=False)

    company = relationship("Company", back_populates="admins")
    navatar = relationship("Navatar", back_populates="admins")

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    navatar_id = Column(Integer, ForeignKey("navatars.navatar_id"))
    date = Column(DateTime, nullable=False)
    status = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="bookings")
    navatar = relationship("Navatar", back_populates="bookings")