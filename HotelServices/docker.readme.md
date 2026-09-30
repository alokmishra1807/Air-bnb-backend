# HotelServices

Backend service built with **Node.js, TypeScript, MySQL, Redis, Sequelize, Docker, and Docker Compose**.

## Tech Stack

- Node.js + TypeScript
- Express
- MySQL
- Redis
- Sequelize
- BullMQ
- Docker & Docker Compose

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

DB_USERNAME=root
DB_PASSWORD=pass123
DB_NAME=airbnb_dev
HOST_NAME=mysql

REDIS_SERVER_URL=redis://redis:6379
```

> Do not commit `.env` to Git.

## Run the Application

Build and start all services:

```bash
docker compose up -d --build
```

This starts the HotelServices API, MySQL, and Redis.

The API runs on:

```text
http://localhost:3000
```

## Run Sequelize Migrations

After the containers are running and MySQL is ready:

```bash
docker compose exec app npx sequelize-cli db:migrate
```

Check migration status:

```bash
docker compose exec app npx sequelize-cli db:migrate:status
```

Undo the last migration:

```bash
docker compose exec app npx sequelize-cli db:migrate:undo
```

## Stop the Application

```bash
docker compose down
```

This removes the containers while keeping the MySQL and Redis volumes.

To completely reset the database and Redis data:

```bash
docker compose down -v
```
