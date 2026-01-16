# Bitstack take home challenge

## How to run
Install Python 3.11 with pip, npm 11 and Node 22.
If you would like to use a virtual environment for Python, activate it. Otherwise, the packages will be installed in your root Python path.

### If `make` is available:
Run `make install` to install the required dependencies.
Run `make run` to start the frontend and backend services

Navigate to [http://localhost:5173/](http://localhost:5173/)

If you want to only run the frontend, use `make runfront`
If you want to only run the backend, use `make runback`

### Otherwise, run manually
To install dependencies, run the following commands
```
cd backend
pip install -r requirements
cd ..
cd frontend
npm install
```

Then you need to start the frontend and backend services with
```
cd backend
python main.py &
cd ..
cd frontend
npm run dev &
```

Navigate to [http://localhost:5173/](http://localhost:5173/)


## Technologies

No need for a complex api system, nor a complex UI here.\
[Bottle](https://bottlepy.org/docs/dev/) is perfect for this kind of usecase for the backend, and a simple [React](https://react.dev/) app will do just fine for the front.\
They are both easy to setup and easy to run.

## Technical tradeoffs

### /price
Since the price of the pair BTC/USD is only here for information, and we don't provide a way for users to make monetary transactions based on this information, a 1 second refresh interval is more than enough. Without the need for 2-way live data transmission and no need for instant update, a **polling strategy with 1s interval** will work well and be much simpler to implement than websocket or SSE. If better update times are needed, this can be easily converted to a long-polling system.

### /balance
The balance is a value that will not change very often, and a 1 minute polling is enough. Along with a UI allowing the user to refresh it on demand, as well as a time of last update, this will meet the users needs.

## Apis

### /price
blockchain.info provides multiple apis for cryptocurrencies.\
A GET call on `https://blockchain.info/tobtc?currency=USD&value=100000` will give us a conversion value without any useless information around. I'm using 100,000 USD for value to reduce rounding errors.\
Unfortunately, it seems like this API caches the current price of BTC for a long time (about ~1 min), so we will not see changes ocurring every second.

### /balance
Connecting to an actual Bitcoin wallet is out of the scope of this exercise, so this part will be mocked up, returning a random float value between 0.001 and 1, with a delay of 500ms to simulate real life external api call.


## Architecture

### Backend
The backend will be a simple Bottle app. Give the low complexity of the APIs involved, all endpoints will be defined in a single file

### Frontend
The frontend is a basic Vite setup, with a main App file and components in their own dedicated files.\
Again, given the complexity, there is no need to over complicate the architecture.

## What would I do if I had more time?
- Add tests
- Prepare for scale
- Add logging
