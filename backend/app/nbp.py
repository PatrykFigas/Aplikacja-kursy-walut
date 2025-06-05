import requests

def fetch_nbp_data(date: str):
    url = f"https://api.nbp.pl/api/exchangerates/tables/A/{date}/?format=json"
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("Błąd pobierania danych z NBP")
    return response.json()[0]["rates"]
