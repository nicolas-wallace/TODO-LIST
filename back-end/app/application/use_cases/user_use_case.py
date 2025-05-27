from app.domain.repositories.user_repository import UserRepository
from app.domain.entities.user import User
from typing import Optional

class UserUseCase:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def register_user(self, username: str, password: str, email: str) -> User:
        return self.user_repository.create(username, password, email)

    def get_user_by_username(self, username: str) -> Optional[User]:
        return self.user_repository.get_by_username(username)

    def get_user_by_email(self, email: str) -> Optional[User]:
        return self.user_repository.get_by_email(email)
