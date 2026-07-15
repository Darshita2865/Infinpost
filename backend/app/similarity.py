import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict
from app.utils.preprocessing import TextPreprocessor

class SimilarityCalculator:
    """Calculate similarity between texts"""
    
    def __init__(self):
        self.preprocessor = TextPreprocessor()
        self.vectorizer = TfidfVectorizer(max_features=1000)
        self.vectors = None
        self.texts = []
    
    def fit(self, texts: List[str]):
        """Fit the vectorizer on texts"""
        processed_texts = [self.preprocessor.preprocess(t) for t in texts]
        self.vectors = self.vectorizer.fit_transform(processed_texts)
        self.texts = texts
    
    def search(self, query: str, top_k: int = 10) -> List[Dict]:
        """Search for similar texts"""
        if self.vectors is None:
            return []
        
        processed_query = self.preprocessor.preprocess(query)
        query_vector = self.vectorizer.transform([processed_query])
        
        similarities = cosine_similarity(query_vector, self.vectors).flatten()
        
        top_indices = np.argsort(similarities)[-top_k:][::-1]
        
        results = []
        for idx in top_indices:
            if similarities[idx] > 0.1:  
                results.append({
                    'text': self.texts[idx],
                    'similarity': float(similarities[idx])
                })
        
        return results
