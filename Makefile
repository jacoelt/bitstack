install:
	@echo "Installing requirements..."
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

run: runfront runback

runback:
	@echo "Starting backend server..."
	cd backend && python app.py &

runfront:
	@echo "Starting frontend server..."
	cd frontend && npm start &