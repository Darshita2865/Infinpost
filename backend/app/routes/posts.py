from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import and_, or_, func
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from backend.app.services.search_service import SearchService
from app.schemas.post import PostResponse

router = APIRouter()

@router.get("/{post_id}")
async def get_post(
    post_id: int,
    db: Session = Depends(get_db)
):
    """Get a single post by ID"""
    search_service = SearchService(db)
    post = search_service.get_post_by_id(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.get("/platform/{platform}")
async def get_posts_by_platform(
    platform: str,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """Get posts by platform"""
    search_service = SearchService(db)
    posts = search_service.get_posts_by_platform(platform, limit, offset)
    return posts

@router.get("/user/{user_id}")
async def get_user_posts(
    user_id: int,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """Get posts saved by user"""
    search_service = SearchService(db)
    posts = search_service.get_user_posts(user_id, limit, offset)
    return posts