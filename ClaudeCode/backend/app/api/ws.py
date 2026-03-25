from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import json

router = APIRouter()
connections: dict[str, list[WebSocket]] = {}

@router.websocket("/ws/{task_id}")
async def websocket_endpoint(websocket: WebSocket, task_id: str):
    await websocket.accept()
    connections.setdefault(task_id, []).append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        connections[task_id].remove(websocket)
        if not connections[task_id]:
            del connections[task_id]

async def broadcast_to_task(task_id: str, message: dict):
    if task_id in connections:
        data = json.dumps(message)
        for ws in connections[task_id]:
            await ws.send_text(data)
