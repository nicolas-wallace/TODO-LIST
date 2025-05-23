from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app import schemas, database, crud, auth

router = APIRouter()

@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Usuário já existe")
    return crud.create_user(db, user.username, user.password)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = crud.get_user_by_username(db, form_data.username)
    if not user or user.password != form_data.password:
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    token = auth.create_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

def get_current_user(token: str = Depends(auth.oauth2_scheme), db: Session = Depends(database.get_db)):
    user_id = auth.decode_token(token)
    user = db.query(crud.models.User).filter(crud.models.User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    return user

@router.post("/todos", response_model=schemas.TodoOut)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(database.get_db), user=Depends(get_current_user)):
    return crud.create_todo(db, todo.title, user.id)

@router.get("/todos", response_model=list[schemas.TodoOut])
def read_todos(db: Session = Depends(database.get_db), user=Depends(get_current_user)):
    return crud.get_todos(db, user.id)

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(database.get_db), user=Depends(get_current_user)):
    success = crud.delete_todo(db, todo_id, user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    return {"ok": True}
