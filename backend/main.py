from os import abort
import random
from time import sleep
from bottle import run, route
import requests

API_ENDPOINT = "https://blockchain.info/tobtc?currency=USD&value=100000"


@route("/price")
def index():
    "Return the current value of USD for 1 BTC"
    response = requests.get(API_ENDPOINT)

    if response.status_code == 200:
        # Convert BTC for 100,000 USD to USD for 1 BTC
        price_per_btc = 100000 / float(response.text)
        return {"price": price_per_btc}

    return abort(500, {"error": "Unable to fetch price"})


@route("/balance")
def balance():
    "Return mocked up value between 0.001 and 1, with 8 digits, with a 500ms delay"
    sleep(0.5)
    return {"balance": round(random.uniform(0.001, 1), 8)}


if __name__ == "__main__":
    run(host="localhost", port=8080)
