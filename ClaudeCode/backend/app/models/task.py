from sqlalchemy import Column, String, Integer, DateTime, JSON, Enum
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid
import enum
from datetime import datetime

class TaskStatus(str, enum.Enum):
    RUNNING = "running"
    PAUSED = "paused"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class StepStatus(str, enum.Enum):
    PENDING = "pending"
    EXECUTING = "executing"
    WAITING_USER = "waiting_user"
    COMPLETED = "completed"

class Task(Base):
    __tablename__ = "tasks"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_type = Column(String, nullable=False)
    task_description = Column(String)
    status = Column(Enum(TaskStatus), default=TaskStatus.RUNNING)
    current_step_index = Column(Integer, default=0)
    steps_config = Column(JSON)
    steps_output = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
