from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.core_config import ALLOWED_ORIGIN_REGEX, ALLOWED_ORIGINS
from routers.routers_country import router as countries_router

app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=ALLOWED_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(countries_router)
