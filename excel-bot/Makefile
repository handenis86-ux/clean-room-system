.PHONY: install test lint run migrate up down logs

install:
	pip install -r requirements-dev.txt

test:
	pytest -q

lint:
	ruff check app tests
	ruff format --check app tests

run:
	uvicorn app.main:app --reload --port 8080

migrate:
	alembic upgrade head

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f bot
