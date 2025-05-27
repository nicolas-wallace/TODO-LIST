from app.domain.repositories.user_repository import UserRepository
from app.domain.entities.user import User
from app.infrastructure.database.models import User as UserModel
from sqlalchemy.orm import Session
from typing import Optional

class UserRepositoryImpl(UserRepository):
    def __init__(self, db: Session):
        self.db = db

    def get_by_username(self, username: str) -> Optional[User]:
        user = self.db.query(UserModel).filter(UserModel.username == username).first()
        if user:
            return User(id=user.id, username=user.username, password=user.password, email=user.email)
        return None

    def get_by_email(self, email: str) -> Optional[User]:
        user = self.db.query(UserModel).filter(UserModel.email == email).first()
        if user:
            return User(id=user.id, username=user.username, password=user.password, email=user.email)
        return None

    def create(self, username: str, password: str, email: str) -> User:
        user_model = UserModel(username=username, password=password, email=email)
        self.db.add(user_model)
        self.db.commit()
        self.db.refresh(user_model)
        return User(id=user_model.id, username=user_model.username, password=user_model.password, email=user_model.email)
