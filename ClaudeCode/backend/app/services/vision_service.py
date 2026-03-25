from __future__ import annotations
import os
import random

VISION_MODE = os.getenv("VISION_MODE", "mock")

async def detect_objects(image_path: str, task_type: str) -> list[dict]:
    if VISION_MODE == "mock":
        return _mock_detect(task_type)
    return _mock_detect(task_type)

def _mock_detect(task_type: str) -> list[dict]:
    if random.random() < 0.3:
        return [{"bbox": [100+random.randint(0,50), 100+random.randint(0,50), 300+random.randint(0,50), 300+random.randint(0,50)],
                 "class": task_type, "confidence": 0.7 + random.random() * 0.25}]
    return []
