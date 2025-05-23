from fastapi import FastAPI
from app import database, routes, models

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()
app.include_router(routes.router)