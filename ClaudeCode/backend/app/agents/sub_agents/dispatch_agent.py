from typing import Any
from .base import BaseSubAgent

class DispatchAgent(BaseSubAgent):
    async def execute(self, task_id, agent_type, step_goal, prev_output, user_input):
        return {"type": "dispatch_result", "dispatched_orders": [], "total_dispatched": 0, "summary": ""}
