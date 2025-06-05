from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, database, schemas, nbp

models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/currencies/{date}", response_model=list[schemas.CurrencyRateSchema])
def get_currency_rates(date: str, db: Session = Depends(get_db)):
    return db.query(models.CurrencyRate).filter(models.CurrencyRate.date == date).all()

@app.post("/currencies/fetch/{date}")
def fetch_and_save(date: str, db: Session = Depends(get_db)):
    rates = nbp.fetch_nbp_data(date)
    for rate in rates:
        existing = db.query(models.CurrencyRate).filter_by(currency=rate["code"], date=date).first()
        if not existing:
            db_rate = models.CurrencyRate(currency=rate["code"], rate=rate["mid"], date=date)
            db.add(db_rate)
    db.commit()
    return {"msg": "Dane zapisane"}
