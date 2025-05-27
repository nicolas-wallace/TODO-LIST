from abc import ABC, abstractmethod
from typing import Optional
from app.domain.entities.user import User

class UserRepository(ABC):
    @abstractmethod
    def get_by_username(self, username: str) -> Optional[User]:
        pass

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[User]:
        pass

    @abstractmethod
    def create(self, username: str, password: str, email: str) -> User:
        pass
