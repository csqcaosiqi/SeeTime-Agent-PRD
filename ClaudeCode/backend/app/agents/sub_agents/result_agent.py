from typing import Any
from .base import BaseSubAgent

class ResultAgent(BaseSubAgent):
    async def execute(self, task_id, agent_type, step_goal, prev_output, user_input):
        return {"type": "anomaly_result", "confirmed_anomalies": [], "total_count": 0, "summary": ""}
