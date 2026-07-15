from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer

from app.database import get_db
from app.schemas.user import UserResponse, UserUpdate
from app.services.auth_service import AuthService
from app.utils.jwt_handler import decode_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

@router.get("/", response_model=UserResponse)
async def get_profile(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Session = Depends(get_db)
):
    payload = decode_token(token)
    email = payload.get("sub")
    
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    auth_service = AuthService(db)
    user = auth_service.get_user_by_email(email)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user

@router.put("/", response_model=UserResponse)
async def update_profile(
    user_data: UserUpdate,
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Session = Depends(get_db)
):
    payload = decode_token(token)
    email = payload.get("sub")
    
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    auth_service = AuthService(db)
    user = auth_service.update_profile(email, user_data)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user