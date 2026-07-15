import pandas as pd
import os
import logging
from typing import List, Dict, Optional

logger = logging.getLogger(__name__)

class DatasetLoader:
    def __init__(self):
        self.datasets_folder = self._get_datasets_folder()
        self.all_posts = []
        self.load_all_datasets()
    
    def _get_datasets_folder(self):
        base_path = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        return os.path.join(base_path, 'datasets')
    
    def load_facebook_posts(self) -> List[Dict]:
        file_path = os.path.join(self.datasets_folder, 'facebook_post.csv')
        if os.path.exists(file_path) and os.path.getsize(file_path) > 0:
            try:
                df = pd.read_csv(file_path)
                if 'platform' not in df.columns:
                    df['platform'] = 'facebook'
                logger.info(f"✅ Loaded {len(df)} Facebook posts")
                return df.to_dict('records')
            except Exception as e:
                logger.error(f"❌ Error loading Facebook posts: {e}")
        return []
    
    def load_instagram_posts(self) -> List[Dict]:
        file_path = os.path.join(self.datasets_folder, 'instagram_post.csv')
        if os.path.exists(file_path) and os.path.getsize(file_path) > 0:
            try:
                df = pd.read_csv(file_path)
                if 'caption' in df.columns and 'content' not in df.columns:
                    df.rename(columns={'caption': 'content'}, inplace=True)
                if 'owner' in df.columns and 'author' not in df.columns:
                    df.rename(columns={'owner': 'author'}, inplace=True)
                if 'platform' not in df.columns:
                    df['platform'] = 'instagram'
                logger.info(f"✅ Loaded {len(df)} Instagram posts")
                return df.to_dict('records')
            except Exception as e:
                logger.error(f"❌ Error loading Instagram posts: {e}")
        return []
    
    def load_linkedin_posts(self) -> List[Dict]:
        file_path = os.path.join(self.datasets_folder, 'linkedin_post.csv')
        if os.path.exists(file_path) and os.path.getsize(file_path) > 0:
            try:
                df = pd.read_csv(file_path)
                if 'platform' not in df.columns:
                    df['platform'] = 'linkedin'
                if 'description' in df.columns and 'content' not in df.columns:
                    df.rename(columns={'description': 'content'}, inplace=True)
                if 'company' in df.columns and 'author' not in df.columns:
                    df.rename(columns={'company': 'author'}, inplace=True)
                logger.info(f"✅ Loaded {len(df)} LinkedIn posts")
                return df.to_dict('records')
            except Exception as e:
                logger.error(f"❌ Error loading LinkedIn posts: {e}")
        return []
    
    def load_all_datasets(self) -> List[Dict]:
        all_posts = []
        all_posts.extend(self.load_facebook_posts())
        all_posts.extend(self.load_instagram_posts())
        all_posts.extend(self.load_linkedin_posts())
        self.all_posts = all_posts
        logger.info(f"📊 Total posts loaded: {len(all_posts)}")
        return all_posts
    
    def get_posts(self) -> List[Dict]:
        return self.all_posts
    
    def search_posts(self, query: str, platform: Optional[str] = None) -> List[Dict]:
        results = self.all_posts.copy()
        if platform:
            results = [p for p in results if p.get('platform', '').lower() == platform.lower()]
        if query:
            q_lower = query.lower()
            results = [
                p for p in results
                if q_lower in str(p.get('content', '')).lower()
                or q_lower in str(p.get('title', '')).lower()
                or q_lower in str(p.get('text', '')).lower()
            ]
        return results