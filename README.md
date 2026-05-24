# TeamBuild

Marketing site with an admin panel, backed by **Hono** + **PostgreSQL**.

## Quick start

### 1. PostgreSQL

```bash
docker compose up -d postgres
```

Or use any Postgres instance and set `DATABASE_URL` in `server/.env` (see `server/.env.example`).

### 2. API (Hono)

```bash
cp server/.env.example server/.env
cd server && npm install
npm run db:migrate
npm run dev
```

API runs at `http://localhost:3001`.

### 3. Frontend (Vite + React)

```bash
npm install
npm run dev
```

Site: `http://localhost:5173` · Admin: `http://localhost:5173/admin`

Run both together:

```bash
npm run dev:all
```

Default admin password: `teambuild-admin` (set `ADMIN_PASSWORD` in `server/.env`).

## API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | — | Health check |
| GET | `/api/site-content` | — | Public site content |
| PUT | `/api/site-content` | Bearer JWT | Save content |
| POST | `/api/site-content/reset` | Bearer JWT | Reset to defaults |
| POST | `/api/auth/login` | — | `{ "password": "..." }` → `{ "token" }` |

Content is stored as JSONB in PostgreSQL (`site_content` table).

## Project layout

- `src/` — React frontend + admin UI
- `server/` — Hono API
- `shared/` — `SiteContent` types and defaults (used by both)
  