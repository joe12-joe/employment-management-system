# Employment Management System

Full-stack employment management platform covering Core HR, onboarding, time/leave, payroll, performance, and workforce operations.

## Structure

- `apps/web` — React + Vite + TypeScript + Tailwind admin frontend
- `apps/api` — NestJS + Prisma + PostgreSQL backend
- `docker/` — local development infrastructure
- `docs/` — project documentation and slides

## Frontend

```bash
cd apps/web
npm install
npm run dev
```

App: `http://localhost:5173`

## Backend

```bash
cd apps/api
npm install
cp .env.example .env
npx prisma generate
npm run start:dev
```

API: `http://localhost:3000/api/v1`  
Swagger: `http://localhost:3000/api/docs`

## Local infrastructure

```bash
docker compose -f docker/docker-compose.yml up -d
```

Starts PostgreSQL 16 (`localhost:5432`) and Redis 7 (`localhost:6379`).
