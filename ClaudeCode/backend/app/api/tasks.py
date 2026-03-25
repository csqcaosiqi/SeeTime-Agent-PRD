from __future__ import annotations
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.major_agent import resolve_intent
from app.agents.see_agent import SeeAgent
from typing import Optional
import uuid

router = APIRouter(prefix="/api/tasks", tags=["tasks"])
active_agents: dict[str, SeeAgent] = {}

class CreateTaskRequest(BaseModel):
    user_input: str
    agent_type: Optional[str] = None

class StepAdvanceRequest(BaseModel):
    step_index: int
    output: dict

@router.post("/create")
async def create_task(req: CreateTaskRequest):
    if req.agent_type:
        intent = {"agent_type": req.agent_type, "description": req.user_input}
    else:
        intent = await resolve_intent(req.user_input)

    from app.db.seed import STEP_CONFIGS
    agent_type = intent["agent_type"]
    steps = sorted([s for s in STEP_CONFIGS if s["agent_type"] == agent_type], key=lambda s: s["step_index"])

    task_id = str(uuid.uuid4())
    see_agent = SeeAgent(task_id, agent_type, steps)
    active_agents[task_id] = see_agent

    return {"task_id": task_id, "agent_type": agent_type, "description": intent["description"], "steps": steps, "current_step_index": 0}

@router.post("/{task_id}/advance")
async def advance_step(task_id: str, req: StepAdvanceRequest):
    agent = active_agents.get(task_id)
    if not agent:
        return {"error": "Task not found"}
    return agent.advance_step(req.step_index, req.output)
