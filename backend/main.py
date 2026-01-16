from os import abort
import random
from time import sleep
from bottle import run, route, hook, response
import requests

API_ENDPOINT = "https://blockchain.info/tobtc?currency=USD&value=100000"


@hook("after_request")
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "PUT, GET, POST, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = (
        "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
    )


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
