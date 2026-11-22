# Employment System — Web Admin

Frontend scaffold for the Employment Management System, aligned with the Phase 0 / Phase 1 architecture plan.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7

## Getting started

```bash
cd apps/web
npm install
npm run dev
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — typecheck + production build
- `npm run preview` — preview production build
- `npm run typecheck` — TypeScript project check

## Structure

```text
src/
  app/                # App shell and routing
  components/         # Shared layout/UI components
  features/           # Feature modules (auth, dashboard, employees, org, users-roles, audit)
  lib/                # API/client utilities (to be added)
  types/              # Shared frontend types (to be added)
```

## Planned next steps

- P0.2: auth flow, session handling, API client, tenant context
- P0.3: RBAC-aware navigation, route guards, audit log UI
- P1.1: departments/locations/job profiles/positions screens
- P1.2: employee list/detail/create/status/history screens
