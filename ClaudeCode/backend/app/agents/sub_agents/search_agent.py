from typing import Any
from .base import BaseSubAgent

class SearchAgent(BaseSubAgent):
    async def execute(self, task_id, agent_type, step_goal, prev_output, user_input):
        return {"type": "search_result", "records": [], "total_count": 0, "query_params": {}}
