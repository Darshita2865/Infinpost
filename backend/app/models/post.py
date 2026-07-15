from sqlalchemy import Column, Integer, String, DateTime, Text, JSON
from sqlalchemy.sql import func
from app.database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String(50), nullable=False)
    post_id = Column(String(255), nullable=True)
    title = Column(String(500), nullable=True)
    content = Column(Text, nullable=True)
    author = Column(String(255), nullable=True)
    url = Column(String(500), nullable=True)
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    shares = Column(Integer, default=0)
    post_metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())