from pydantic import BaseModel
from datetime import date

class CurrencyRateSchema(BaseModel):
    currency: str
    rate: float
    date: date

    class Config:
        orm_mode = True
