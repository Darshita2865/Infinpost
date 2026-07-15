from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routes
from app.routes import auth, search, profile
from app.database import create_tables

# Create tables
create_tables()

# Create FastAPI app
app = FastAPI(
    title="InfinPost API",
    description="AI-Powered Social Media Aggregator",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS - Allow frontend to connect
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(search.router, prefix="/api/search", tags=["Search"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])

# Health Check
@app.get("/")
async def root():
    return {
        "message": "Welcome to InfinPost API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}