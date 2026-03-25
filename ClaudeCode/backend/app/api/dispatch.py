from fastapi import APIRouter, Query

router = APIRouter(prefix="/api/dispatch", tags=["dispatch"])

MOCK_MAPPINGS = [
    {"id": "dm-1", "district": "城南区", "street": "中山路", "event_type": "garbage", "receiver_name": "张三", "receiver_contact": "138xxxx1111", "receiver_unit": "城南中队"},
    {"id": "dm-2", "district": "城南区", "street": "中山路", "event_type": "garbage", "receiver_name": "李四", "receiver_contact": "138xxxx2222", "receiver_unit": "城北中队"},
    {"id": "dm-3", "district": "城南区", "street": None, "event_type": "illegal_parking", "receiver_name": "赵六", "receiver_contact": "138xxxx4444", "receiver_unit": "交管大队"},
]

@router.get("/mapping")
async def get_dispatch_mapping(district: str = Query(None), event_type: str = Query(None)):
    result = MOCK_MAPPINGS
    if district:
        result = [m for m in result if m["district"] == district]
    if event_type:
        result = [m for m in result if m["event_type"] == event_type]
    return result
