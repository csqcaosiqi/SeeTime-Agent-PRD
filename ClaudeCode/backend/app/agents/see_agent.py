from __future__ import annotations
import hashlib
import json
from typing import Any

class SeeAgent:
    def __init__(self, task_id: str, agent_type: str, steps_config: list[dict]):
        self.task_id = task_id
        self.agent_type = agent_type
        self.steps_config = steps_config
        self.current_step_index = 0
        self.step_outputs: dict[int, Any] = {}
        self.step_output_hashes: dict[int, str] = {}

    def _hash_output(self, output: Any) -> str:
        return hashlib.md5(json.dumps(output, sort_keys=True, default=str).encode()).hexdigest()

    def advance_step(self, step_index: int, current_output: Any) -> dict:
        current_hash = self._hash_output(current_output)
        prev_hash = self.step_output_hashes.get(step_index)
        changed = prev_hash is not None and prev_hash != current_hash
        cleared_steps = []
        self.step_outputs[step_index] = current_output
        self.step_output_hashes[step_index] = current_hash
        if changed:
            for i in range(step_index + 1, len(self.steps_config)):
                self.step_outputs.pop(i, None)
                self.step_output_hashes.pop(i, None)
                cleared_steps.append(i)
        next_index = step_index + 1
        is_complete = next_index >= len(self.steps_config)
        return {"changed": changed, "cleared_steps": cleared_steps, "next_step_index": next_index if not is_complete else None, "is_complete": is_complete}
