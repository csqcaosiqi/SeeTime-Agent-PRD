from typing import Any
from .base import BaseSubAgent

class ScopeAgent(BaseSubAgent):
    async def execute(self, task_id, agent_type, step_goal, prev_output, user_input):
        if agent_type == "data_reporter":
            return {"type": "query_filter", "time_range": None, "event_types": [], "spatial_scope": None}
        return {"type": "camera_scope", "cameras": [], "event_types": [], "description": ""}
