import pandas as pd
import os
from typing import List, Dict

class DataLoader:
    """Load and process data from CSV files"""
    
    @staticmethod
    def load_posts_from_csv(file_path: str) -> List[Dict]:
        """Load posts from CSV file"""
        if not os.path.exists(file_path):
            return []
        
        df = pd.read_csv(file_path)
        return df.to_dict('records')
    
    @staticmethod
    def load_facebook_posts():
        """Load Facebook posts"""
        return DataLoader.load_posts_from_csv('datasets/facebook_post.csv')
    
    @staticmethod
    def load_instagram_posts():
        """Load Instagram posts"""
        return DataLoader.load_posts_from_csv('datasets/instagram_post.csv')
    
    @staticmethod
    def load_linkedin_posts():
        """Load LinkedIn posts"""
        return DataLoader.load_posts_from_csv('datasets/linkedin_post.csv')
    
    @staticmethod
    def load_all_posts():
        """Load all posts from all platforms"""
        all_posts = []
        all_posts.extend(DataLoader.load_facebook_posts())
        all_posts.extend(DataLoader.load_instagram_posts())
        all_posts.extend(DataLoader.load_linkedin_posts())
        return all_posts