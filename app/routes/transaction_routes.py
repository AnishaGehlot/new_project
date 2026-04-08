from fastapi import APIRouter

router = APIRouter()


@router.get("/transactions/test")
def test_transactions():
    return {"message": "Transaction route working"}