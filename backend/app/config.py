import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    APP_NAME = os.getenv("APP_NAME", "InfinPost")
    APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"
    
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here-change-in-production")
    ALGORITHM = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./infinpost.db")
    
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
    
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    MODEL_PATH = os.getenv("MODEL_PATH", "./models")
    USE_GPU = os.getenv("USE_GPU", "False").lower() == "true"

config = Config()
