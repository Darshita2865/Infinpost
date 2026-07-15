from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.password_handler import get_password_hash, verify_password
from datetime import datetime

class AuthService:
    def __init__(self, db: Session):
        self.db = db
    
    def register(self, user_data: UserCreate):
        existing_user = self.db.query(User).filter(
            (User.email == user_data.email) | (User.username == user_data.username)
        ).first()
        
        if existing_user:
            raise ValueError("User with this email or username already exists")
        
        new_user = User(
            username=user_data.username,
            email=user_data.email,
            hashed_password=get_password_hash(user_data.password),
            full_name=user_data.full_name,
            created_at=datetime.utcnow()
        )
        
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        
        return new_user
    
    def authenticate(self, email: str, password: str):
        user = self.db.query(User).filter(User.email == email).first()
        
        if not user:
            return None
        
        if not verify_password(password, user.hashed_password):
            return None
        
        return user
    
    def get_user_by_email(self, email: str):
        return self.db.query(User).filter(User.email == email).first()
    
    def get_user_by_id(self, user_id: int):
        return self.db.query(User).filter(User.id == user_id).first()
    
    def update_profile(self, email: str, user_data):
        user = self.get_user_by_email(email)
        if not user:
            return None
        
        for key, value in user_data.dict(exclude_unset=True).items():
            setattr(user, key, value)
        
        self.db.commit()
        self.db.refresh(user)
        return user