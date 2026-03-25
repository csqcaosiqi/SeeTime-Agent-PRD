from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid
from datetime import datetime

class DispatchRecord(Base):
    __tablename__ = "dispatch_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    task_id = Column(UUID(as_uuid=True), ForeignKey("tasks.id"))
    event_id = Column(UUID(as_uuid=True), ForeignKey("events.id"))
    receiver_name = Column(String, nullable=False)
    receiver_contact = Column(String)
    receiver_unit = Column(String)
    status = Column(String, default="dispatched")
    dispatched_at = Column(DateTime, default=datetime.utcnow)
