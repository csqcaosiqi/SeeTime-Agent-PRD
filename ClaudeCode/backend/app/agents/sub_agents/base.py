from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Any, Optional

class BaseSubAgent(ABC):
    @abstractmethod
    async def execute(self, task_id: str, agent_type: str, step_goal: str, prev_output: Any, user_input: Optional[dict]) -> Any:
        pass
