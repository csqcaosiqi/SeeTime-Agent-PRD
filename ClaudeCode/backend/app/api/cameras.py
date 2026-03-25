from fastapi import APIRouter, Query

router = APIRouter(prefix="/api/cameras", tags=["cameras"])

# Mock data for MVP demo
MOCK_CAMERAS = [
    {"id": f"cam-{i}", "name": f"摄像头 {i+1}", "address": f"中山路 {100+i*10} 号",
     "street": "中山路", "district": "城南区", "lng": 116.39 + i*0.002, "lat": 39.9 + i*0.001,
     "coverage_radius": 50, "status": "online"} for i in range(20)
]

@router.get("/by-area")
async def get_cameras_by_area(lng: float = Query(116.4), lat: float = Query(39.9), radius: float = Query(5000)):
    return MOCK_CAMERAS

@router.get("/by-district")
async def get_cameras_by_district(district: str = Query("城南区"), street: str = Query(None)):
    return [c for c in MOCK_CAMERAS if c["district"] == district]
