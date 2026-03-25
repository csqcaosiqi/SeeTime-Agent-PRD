from sqlalchemy import Column, String, Integer, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid

class StepConfig(Base):
    __tablename__ = "step_configs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_type = Column(String, nullable=False)
    step_index = Column(Integer, nullable=False)
    step_name = Column(String, nullable=False)
    sub_agent_type = Column(String, nullable=False)
    config = Column(JSON, default=dict)
