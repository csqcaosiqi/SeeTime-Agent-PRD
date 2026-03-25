from typing import Any
from .base import BaseSubAgent

class ReportAgent(BaseSubAgent):
    async def execute(self, task_id, agent_type, step_goal, prev_output, user_input):
        return {"type": "report", "title": "", "sections": [], "summary": "", "generated_at": ""}
