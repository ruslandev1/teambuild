# TeamBuild

Marketing website and admin panel for a team-building and web development company.

**Full documentation:** [DOCUMENTATION.md](./DOCUMENTATION.md) — tech stack, architecture, API, setup, and deployment.

## Stack at a glance

| Layer | Tech |
|-------|------|
| Frontend | React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · React Router 7 |
| UI | Radix UI · Lucide · Motion · Sonner |
| Backend | Hono 4 · Node.js · TypeScript |
| Database | PostgreSQL 16 · JSONB (`postgres.js`) |
| Auth | JWT (`jose`) |

## Quick start

```bash
# PostgreSQL
npm run db:up

# API
cp server/.env.example server/.env
cd server && npm install && npm run db:migrate && npm run dev

# Frontend (new terminal)
npm install && npm run dev
```

Or run both: `npm run dev:all`

- Site: http://localhost:5173  
- Admin: http://localhost:5173/admin (password: `teambuild-admin`)

See [DOCUMENTATION.md](./DOCUMENTATION.md) for details.
