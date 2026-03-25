from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.tasks import router as tasks_router
from app.api.ws import router as ws_router
from app.api.cameras import router as cameras_router
from app.api.dispatch import router as dispatch_router
from app.api.events import router as events_router
from app.api.reports import router as reports_router

app = FastAPI(title="SeeTime Agent API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)
app.include_router(ws_router)
app.include_router(cameras_router)
app.include_router(dispatch_router)
app.include_router(events_router)
app.include_router(reports_router)

@app.get("/health")
async def health():
    return {"status": "ok"}
