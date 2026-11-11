from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class CalcRequest(BaseModel):
    a: float
    b: float
    op: str  # "add", "sub", "mul", "div"

app = FastAPI(title="Calculator API")

# For development allow all origins (change in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/calc")
async def calculate(req: CalcRequest):
    a = req.a
    b = req.b
    op = req.op
    if op == "add":
        result = a + b
    elif op == "sub":
        result = a - b
    elif op == "mul":
        result = a * b
    elif op == "div":
        if b == 0:
            raise HTTPException(status_code=400, detail="Division by zero")
        result = a / b
    else:
        raise HTTPException(status_code=400, detail="Unknown operation")
    return {"result": result}
