from typing import Any
from .base import BaseSubAgent

class ScanAgent(BaseSubAgent):
    async def execute(self, task_id, agent_type, step_goal, prev_output, user_input):
        return {"type": "scan_result", "anomalies": [], "scanned_cameras": 0, "description": ""}
