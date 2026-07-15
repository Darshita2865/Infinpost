from pydantic import BaseModel
from typing import Optional, Dict

class PostCreate(BaseModel):
    platform: str
    post_id: Optional[str] = None
    title: Optional[str] = None
    content: str
    author: Optional[str] = None
    url: Optional[str] = None
    likes: int = 0
    comments: int = 0
    shares: int = 0
    post_metadata: Optional[Dict] = None 

class PostResponse(BaseModel):
    id: int
    platform: str
    post_id: Optional[str]
    title: Optional[str]
    content: str
    author: Optional[str]
    url: Optional[str]
    likes: int
    comments: int
    shares: int
    post_metadata: Optional[Dict] 
    created_at: str
    
    class Config:
        from_attributes = True

class PostSearch(BaseModel):
    query: str
    platform: Optional[str] = None
    limit: int = 20
    offset: int = 0