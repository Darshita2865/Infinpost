import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string

# Download NLTK data (first time only)
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
    nltk.download('stopwords')

class TextPreprocessor:
    """Preprocess text for AI models"""
    
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
    
    def clean_text(self, text: str) -> str:
        """Clean and preprocess text"""
        if not text:
            return ""
        
        # Convert to lowercase
        text = text.lower()
        
        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text)
        
        # Remove mentions and hashtags
        text = re.sub(r'@\w+|\#', '', text)
        
        # Remove special characters and numbers
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text
    
    def tokenize(self, text: str) -> list:
        """Tokenize text into words"""
        tokens = word_tokenize(text)
        # Remove stopwords
        tokens = [t for t in tokens if t not in self.stop_words]
        return tokens
    
    def preprocess(self, text: str) -> str:
        """Full preprocessing pipeline"""
        cleaned = self.clean_text(text)
        tokens = self.tokenize(cleaned)
        return ' '.join(tokens)