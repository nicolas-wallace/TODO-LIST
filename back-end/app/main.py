from fastapi import FastAPI
from app import database
from app.interfaces.api.routes import router
from fastapi.middleware.cors import CORSMiddleware
from app.infrastructure.database import models

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)