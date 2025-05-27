from app.domain.repositories.todo_repository import TodoRepository
from app.domain.entities.todo import Todo
from app.infrastructure.database.models import Todo as TodoModel
from sqlalchemy.orm import Session
from typing import List

class TodoRepositoryImpl(TodoRepository):
    def __init__(self, db: Session):
        self.db = db

    def create(self, title: str, user_id: int) -> Todo:
        todo_model = TodoModel(title=title, user_id=user_id)
        self.db.add(todo_model)
        self.db.commit()
        self.db.refresh(todo_model)
        return Todo(id=todo_model.id, title=todo_model.title, done=todo_model.done, user_id=todo_model.user_id)

    def get_all(self, user_id: int) -> List[Todo]:
        todos = self.db.query(TodoModel).filter(TodoModel.user_id == user_id).all()
        return [Todo(id=t.id, title=t.title, done=t.done, user_id=t.user_id) for t in todos]

    def delete(self, todo_id: int, user_id: int) -> bool:
        todo = self.db.query(TodoModel).filter(TodoModel.id == todo_id, TodoModel.user_id == user_id).first()
        if todo:
            self.db.delete(todo)
            self.db.commit()
            return True
        return False
