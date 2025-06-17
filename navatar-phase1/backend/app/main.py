from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app import models

from app.routers import company, navatar, user, booking, admin

app = FastAPI(
    title="Project API",
    version="1.0.0",
    description="Backend API for the project"
)
origins = [
    "http://localhost:3000", 
   'http://localhost:5174',
   'http://localhost:5173',
   'http://localhost:5172',
   'http://localhost:5171',
   'http://localhost:5170',
   'http://localhost:5169',
   'http://localhost:5168',
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
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

# Create DB tables at startup (optional)
@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)

# Root route
@app.get("/")
def read_root():
    return {"message": "Backend API for the project"}
