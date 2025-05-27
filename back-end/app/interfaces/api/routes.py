from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.infrastructure.database.models import User as UserModel
from app.infrastructure.database.models import Todo as TodoModel
from app.infrastructure.repositories.user_repository_impl import UserRepositoryImpl
from app.infrastructure.repositories.todo_repository_impl import TodoRepositoryImpl
from app.application.use_cases.user_use_case import UserUseCase
from app.application.use_cases.todo_use_case import TodoUseCase
from app.infrastructure.auth.auth_service import create_token, decode_token, oauth2_scheme
from app.database import get_db
from app.interfaces.schemas.user import UserCreate
from app.interfaces.schemas.todo import TodoCreate, TodoOut
from app.interfaces.schemas.user import UserLogin
from pydantic import BaseModel

router = APIRouter()

class TodoUpdate(BaseModel):
    done: bool | None = None
    title: str | None = None

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    user_repo = UserRepositoryImpl(db)
    user_use_case = UserUseCase(user_repo)
    db_user = user_use_case.get_user_by_email(user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    db_user_username = user_use_case.get_user_by_username(user.username)
    if db_user_username:
        raise HTTPException(status_code=400, detail="Usuário já existe")
    return user_use_case.register_user(user.username, user.password, user.email)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    user_repo = UserRepositoryImpl(db)
    user_use_case = UserUseCase(user_repo)
    db_user = user_use_case.get_user_by_email(user.email)
    if not db_user or not db_user.check_password(user.password):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    token = create_token({"sub": str(db_user.id)})
    return {"token": token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user_id = decode_token(token)
    user = db.query(UserModel).filter(UserModel.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    return user

@router.post("/todos", response_model=TodoOut)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    todo_repo = TodoRepositoryImpl(db)
    todo_use_case = TodoUseCase(todo_repo)
    return todo_use_case.create_todo(todo.title, user.id)

@router.get("/todos", response_model=list[TodoOut])
def read_todos(db: Session = Depends(get_db), user=Depends(get_current_user)):
    todo_repo = TodoRepositoryImpl(db)
    todo_use_case = TodoUseCase(todo_repo)
    return todo_use_case.list_todos(user.id)

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    todo_repo = TodoRepositoryImpl(db)
    todo_use_case = TodoUseCase(todo_repo)
    success = todo_use_case.delete_todo(todo_id, user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    return {"ok": True}

@router.patch("/todos/{todo_id}", response_model=TodoOut)
def update_todo(todo_id: int, todo: TodoUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    todo_repo = TodoRepositoryImpl(db)
    todo_model = db.query(TodoModel).filter(TodoModel.id == todo_id, TodoModel.user_id == user.id).first()
    if not todo_model:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    if todo.done is not None:
        todo_model.done = todo.done
    if todo.title is not None:
        todo_model.title = todo.title
    db.commit()
    db.refresh(todo_model)
    return todo_model
