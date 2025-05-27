from abc import ABC, abstractmethod
from typing import List, Optional
from app.domain.entities.todo import Todo

class TodoRepository(ABC):
    @abstractmethod
    def create(self, title: str, user_id: int) -> Todo:
        pass

    @abstractmethod
    def get_all(self, user_id: int) -> List[Todo]:
        pass

    @abstractmethod
    def delete(self, todo_id: int, user_id: int) -> bool:
        pass
