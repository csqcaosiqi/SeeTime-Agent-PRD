from geoalchemy2 import Geometry
from sqlalchemy import Column, String, Float
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid

class Camera(Base):
    __tablename__ = "cameras"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    address = Column(String)
    street = Column(String)
    district = Column(String)
    location = Column(Geometry("POINT", srid=4326))
    coverage_radius = Column(Float, default=50.0)
    stream_url = Column(String)
    status = Column(String, default="online")
