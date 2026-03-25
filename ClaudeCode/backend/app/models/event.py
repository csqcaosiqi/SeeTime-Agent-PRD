from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geometry
from app.db.database import Base
import uuid
from datetime import datetime

class Event(Base):
    __tablename__ = "events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    task_id = Column(UUID(as_uuid=True), ForeignKey("tasks.id"))
    camera_id = Column(UUID(as_uuid=True), ForeignKey("cameras.id"))
    event_type = Column(String, nullable=False)
    sub_category = Column(String)
    location = Column(Geometry("POINT", srid=4326))
    street = Column(String)
    screenshot_url = Column(String)
    detection_bbox = Column(JSON)
    confidence = Column(Float)
    license_plate = Column(String, nullable=True)
    status = Column(String, default="detected")
    detected_at = Column(DateTime, default=datetime.utcnow)
