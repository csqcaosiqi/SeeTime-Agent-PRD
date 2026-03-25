from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid

class DispatchMapping(Base):
    __tablename__ = "dispatch_mappings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    district = Column(String, nullable=False)
    street = Column(String)
    event_type = Column(String, nullable=False)
    receiver_name = Column(String, nullable=False)
    receiver_contact = Column(String)
    receiver_unit = Column(String)
