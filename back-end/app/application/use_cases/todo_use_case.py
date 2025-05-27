from app.domain.repositories.todo_repository import TodoRepository
from app.domain.entities.todo import Todo
from typing import List

class TodoUseCase:
    def __init__(self, todo_repository: TodoRepository):
        self.todo_repository = todo_repository

    def create_todo(self, title: str, user_id: int) -> Todo:
        return self.todo_repository.create(title, user_id)

    def list_todos(self, user_id: int) -> List[Todo]:
        return self.todo_repository.get_all(user_id)

    def delete_todo(self, todo_id: int, user_id: int) -> bool:
        return self.todo_repository.delete(todo_id, user_id)
