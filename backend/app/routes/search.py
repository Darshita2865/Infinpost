from fastapi import APIRouter, Query, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
import pandas as pd
import os

router = APIRouter()
def load_posts_from_csv():
    all_posts = []
    datasets_folder = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'datasets')
    csv_files = [  
        os.path.join(datasets_folder, 'facebook_post.csv'),
        os.path.join(datasets_folder, 'instagram_post.csv'),
        os.path.join(datasets_folder, 'linkedin_post.csv'),
        os.path.join(datasets_folder, 'merged_post.csv')
    ]
    
    for file_path in csv_files:
        if os.path.exists(file_path):
            try:
                df = pd.read_csv(file_path)
                if 'platform' not in df.columns:
                    if 'facebook' in file_path.lower():
                        df['platform'] = 'facebook'
                    elif 'instagram' in file_path.lower():
                        df['platform'] = 'instagram'
                    elif 'linkedin' in file_path.lower():
                        df['platform'] = 'linkedin'
                all_posts.extend(df.to_dict('records'))
            except Exception as e:
                print(f"Error loading {file_path}: {e}")
    
    return all_posts

MOCK_POSTS = [
    {
        "id": 1,
        "platform": "instagram",
        "title": "AI Internship Opportunity",
        "content": "Exciting AI internship program for final year students. Apply now!",
        "author": "TechCorp",
        "likes": 120,
        "comments": 45,
        "created_at": "2024-01-15"
    },
    {
        "id": 2,
        "platform": "linkedin",
        "title": "Machine Learning Engineer Role",
        "content": "Looking for ML engineers with Python and TensorFlow experience.",
        "author": "DataJobs",
        "likes": 89,
        "comments": 23,
        "created_at": "2024-01-14"
    },
    {
        "id": 3,
        "platform": "facebook",
        "title": "Data Science Community",
        "content": "Join our data science community for networking and learning.",
        "author": "DataScienceGroup",
        "likes": 67,
        "comments": 12,
        "created_at": "2024-01-13"
    },
    {
        "id": 4,
        "platform": "instagram",
        "title": "Python Developer Needed",
        "content": "We are hiring Python developers with 2+ years experience.",
        "author": "TechHub",
        "likes": 45,
        "comments": 8,
        "created_at": "2024-01-12"
    },
    {
        "id": 5,
        "platform": "linkedin",
        "title": "React JS Developer Position",
        "content": "Looking for React developers with experience in modern web apps.",
        "author": "WebWorks",
        "likes": 34,
        "comments": 5,
        "created_at": "2024-01-11"
    },
    {
        "id": 6,
        "platform": "facebook",
        "title": "AI in Healthcare Webinar",
        "content": "Join our free webinar on AI applications in healthcare.",
        "author": "HealthAI",
        "likes": 78,
        "comments": 15,
        "created_at": "2024-01-10"
    },
    {
        "id": 7,
        "platform": "instagram",
        "title": "Machine Learning Bootcamp",
        "content": "Free 30-day machine learning bootcamp for beginners.",
        "author": "MLBootcamp",
        "likes": 210,
        "comments": 67,
        "created_at": "2024-01-09"
    },
    {
        "id": 8,
        "platform": "linkedin",
        "title": "Data Scientist Position",
        "content": "Looking for data scientists with experience in NLP and deep learning.",
        "author": "DataCorp",
        "likes": 56,
        "comments": 14,
        "created_at": "2024-01-08"
    }
]

@router.get("/")
async def search_posts(
    q: str = Query(..., min_length=1),
    platform: Optional[str] = None,
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Search posts across platforms"""
    try:
        print(f"🔍 Searching for: {q}, platform: {platform}")
        
        posts = load_posts_from_csv()
        
        if not posts:
            posts = MOCK_POSTS.copy()
        
        if platform:
            posts = [p for p in posts if p.get("platform", "").lower() == platform.lower()]
        
        if q:
            q_lower = q.lower()
            posts = [
                p for p in posts 
                if q_lower in str(p.get("content", "")).lower() or 
                   q_lower in str(p.get("title", "")).lower() or
                   q_lower in str(p.get("text", "")).lower()
            ]
        
        posts = posts[:limit]
        
        print(f"✅ Found {len(posts)} results")
        return posts
    except Exception as e:
        print(f"❌ Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/trending")
async def get_trending_searches(
    limit: int = Query(10, ge=1, le=50)
):
    """Get trending searches"""
    trending = [
        {"query": "AI Internship", "count": 45},
        {"query": "Machine Learning", "count": 32},
        {"query": "Python Developer", "count": 28},
        {"query": "Data Science", "count": 25},
        {"query": "React JS", "count": 20},
        {"query": "Software Developer", "count": 18},
        {"query": "NLP", "count": 15},
        {"query": "Deep Learning", "count": 12},
    ]
    return trending[:limit]
