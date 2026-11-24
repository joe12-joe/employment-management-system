# Employment Management System

Full-stack employment management platform covering Core HR, onboarding, time/leave, payroll, performance, and workforce operations.

## Structure

- `apps/web` — React + Vite + TypeScript + Tailwind admin frontend
- `apps/api` — NestJS + Prisma + SQLite backend
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
npx prisma migrate dev --name init
npm run start:dev
```

API: `http://localhost:3000/api/v1`  
Swagger: `http://localhost:3000/api/docs`

The SQLite database file is created at `apps/api/prisma/dev.db` (based on `DATABASE_URL`).
