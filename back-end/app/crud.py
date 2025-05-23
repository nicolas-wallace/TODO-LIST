from sqlalchemy.orm import Session
from app import models

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, username: str, password: str):
    user = models.User(username=username, password=password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def create_todo(db: Session, title: str, user_id: int):
    todo = models.Todo(title=title, user_id=user_id)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

def get_todos(db: Session, user_id: int):
    return db.query(models.Todo).filter(models.Todo.user_id == user_id).all()

def delete_todo(db: Session, todo_id: int, user_id: int):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.user_id == user_id).first()
    if todo:
        db.delete(todo)
        db.commit()
        return True
    return False