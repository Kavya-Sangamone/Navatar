from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app import models

from app.routers import company, navatar, user, booking

app = FastAPI(
    title="Project API",
    version="1.0.0",
    description="Backend API for the project"
)
origins = [
    "http://localhost:3000", 
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # 👈 Important!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ⬇️ Include routers with tags and prefixes
app.include_router(company.router, prefix="/company", tags=["Company"])
app.include_router(navatar.router, prefix="/navatar", tags=["Navatar"])
app.include_router(user.router, prefix="/user", tags=["User"])
app.include_router(booking.router, prefix="/booking", tags=["Booking"])

# Create DB tables at startup (optional)
@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)

# Root route
@app.get("/")
def read_root():
    return {"message": "Backend API for the project"}
