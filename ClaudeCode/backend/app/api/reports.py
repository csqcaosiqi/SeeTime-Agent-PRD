from fastapi import APIRouter

router = APIRouter(prefix="/api/reports", tags=["reports"])

@router.get("/{task_id}/export-pdf")
async def export_pdf(task_id: str):
    return {"message": "PDF export not implemented yet"}
