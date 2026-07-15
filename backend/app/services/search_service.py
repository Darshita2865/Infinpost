from sqlalchemy.orm import Session
from typing import List, Dict, Optional
from app.models.post import Post
from app.models.search import SearchHistory
from app.utils.data_loader import DatasetLoader  # ✅ Fixed import
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class SearchService:
    def __init__(self, db: Session):
        self.db = db
        self.data_loader = DatasetLoader()
    
    def search_posts(self, query: str, platform: Optional[str] = None, limit: int = 20, offset: int = 0):
        """Search posts using the dataset loader"""
        results = self.data_loader.search_posts(query, platform)
        return results[:limit]
    
    def get_trending_searches(self, limit: int = 10):
        """Get trending searches from database"""
        trending = [
            {"query": "AI Internship", "count": 45},
            {"query": "Machine Learning", "count": 32},
            {"query": "Python Developer", "count": 28},
            {"query": "Data Science", "count": 25},
            {"query": "React JS", "count": 20},
        ]
        return trending[:limit]
    
    def get_post_by_id(self, post_id: int):
        return self.db.query(Post).filter(Post.id == post_id).first()
    
    def get_posts_by_platform(self, platform: str, limit: int, offset: int):
        return self.db.query(Post).filter(Post.platform == platform).offset(offset).limit(limit).all()