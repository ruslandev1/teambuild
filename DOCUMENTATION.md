# TeamBuild — Application Documentation

TeamBuild is a full-stack marketing website for a team-building and web-development company. It includes a public landing page and a password-protected **admin panel** to manage contact details, portfolio projects, links, and site copy. Content is persisted in **PostgreSQL** via a **Hono** REST API.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Project structure](#project-structure)
5. [Data model](#data-model)
6. [API reference](#api-reference)
7. [Environment variables](#environment-variables)
8. [Development setup](#development-setup)
9. [npm scripts](#npm-scripts)
10. [Admin panel](#admin-panel)
11. [Deployment notes](#deployment-notes)

---

## Tech stack

### Overview

| Layer | Technology | Role |
|-------|------------|------|
| **Frontend** | React 18 | UI library |
| **Build tool** | Vite 6 | Dev server, bundling, HMR |
| **Language** | TypeScript | Type safety (frontend + backend) |
| **Routing** | React Router 7 | Public site + `/admin` routes |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **UI components** | Radix UI + shadcn-style primitives | Accessible dialogs, forms, buttons |
| **Icons** | Lucide React | Icon set |
| **Animation** | Motion (Framer Motion) | Section transitions, hover effects |
| **Notifications** | Sonner | Toast messages in admin |
| **Backend** | Hono 4 | Lightweight HTTP API |
| **Runtime** | Node.js | Server execution |
| **Database** | PostgreSQL 16 | Persistent storage |
| **DB client** | postgres (postgres.js) | Tagged-template SQL, JSONB |
| **Auth** | jose (JWT) | Admin bearer tokens |
| **Validation** | Zod | Request body validation |
| **Dev orchestration** | concurrently | Run frontend + API together |
| **Containers** | Docker Compose | Local PostgreSQL |

### Frontend stack (detail)

| Category | Packages |
|----------|----------|
| Core | `react`, `react-dom`, `vite`, `@vitejs/plugin-react` |
| Routing | `react-router` |
| CSS | `tailwindcss`, `@tailwindcss/vite`, `tailwind-merge`, `tw-animate-css` |
| UI primitives | `@radix-ui/react-*` (dialog, label, select, tabs, etc.) |
| Forms | `react-hook-form`, `class-variance-authority`, `clsx` |
| Motion | `motion` |
| Charts / extras | `recharts`, `embla-carousel-react`, `react-slick` (available in UI kit) |
| MUI (bundled) | `@mui/material`, `@mui/icons-material` (present in dependencies) |

The public site and admin UI are **single-page applications** served as static assets after `vite build`.

### Backend stack (detail)

| Category | Packages |
|----------|----------|
| Framework | `hono` |
| Node adapter | `@hono/node-server` |
| Database | `postgres` |
| Auth | `jose` (HS256 JWT, 7-day expiry) |
| Config | `dotenv` |
| Validation | `zod` |
| Dev runner | `tsx` |

### Shared code

Types and default content live in `shared/` and are imported by both the Vite app (`@shared/*` alias) and the Hono server.

---

## Architecture

```mermaid
flowchart TB
  subgraph client [Browser]
    Public[Public landing page]
    Admin[Admin panel /admin]
  end

  subgraph vite [Vite dev / static CDN]
    React[React SPA]
  end

  subgraph api [Hono API :3001]
    Routes[REST routes]
    Auth[JWT middleware]
  end

  subgraph data [PostgreSQL]
    Table[(site_content JSONB)]
  end

  Public --> React
  Admin --> React
  React -->|GET /api/site-content| Routes
  React -->|PUT + Bearer token| Auth
  Auth --> Routes
  Routes --> Table
```

### Request flow

1. **Public visitor** — React loads → `GET /api/site-content` → renders Hero, Projects, Contact, Footer from JSON.
2. **Admin login** — `POST /api/auth/login` with password → JWT stored in `sessionStorage`.
3. **Admin edit** — UI updates local state → debounced or explicit `PUT /api/site-content` with `Authorization: Bearer <token>`.
4. **Database** — One singleton row (`id = 1`) stores the full `SiteContent` document as **JSONB**.

In development, Vite proxies `/api` to `http://localhost:3001` (see `vite.config.ts`).

---

## Features

### Public website

- Fixed header with smooth scroll to sections
- **Home** — Hero with stats and CTA
- **Services** — Service cards grid
- **Industries** — Hospitality & sales focus
- **Projects** — Portfolio cards (image, tech tags, external link)
- **Contact** — Email, phone, address + contact form (UI only; no backend submit yet)
- **Footer** — Social links, service/industry links, legal links

### Admin panel (`/admin`)

| Section | Capabilities |
|---------|----------------|
| Dashboard | Overview counts and quick links |
| Contact | Email, phone, address, section copy |
| Projects | CRUD, JSON import/export, replace-all import |
| Links | Social URLs, footer nav links, legal URLs |
| Site settings | Brand, hero, footer; reset to defaults |

### Authentication

- Single shared admin password (environment variable)
- JWT issued on successful login
- Protected routes: `PUT /api/site-content`, `POST /api/site-content/reset`

---

## Project structure

```
teambuild/
├── src/                          # Frontend (Vite + React)
│   ├── main.tsx                  # App entry
│   ├── app/
│   │   ├── App.tsx               # Router: / and /admin/*
│   │   ├── components/           # Public sections + ui/ (shadcn-style)
│   │   ├── context/              # SiteContentContext, AdminAuthContext
│   │   ├── data/                 # Re-exports default content
│   │   ├── lib/api.ts            # Fetch wrapper for API
│   │   ├── pages/
│   │   │   ├── PublicSite.tsx
│   │   │   └── admin/            # Admin layout + CRUD pages
│   │   └── types/                # Re-exports shared types
│   └── styles/                   # Tailwind + theme CSS
│
├── server/                       # Hono API
│   ├── src/
│   │   ├── index.ts              # App bootstrap, routes, CORS
│   │   ├── db.ts                 # Postgres queries + seed
│   │   ├── auth.ts               # JWT + password check
│   │   ├── env.ts                # Environment config
│   │   └── migrate.ts            # Run SQL migrations
│   ├── migrations/
│   │   └── 001_init.sql          # site_content table
│   ├── package.json
│   └── .env.example
│
├── shared/                       # Shared between frontend & server
│   ├── siteContent.ts            # TypeScript interfaces
│   └── defaultSiteContent.ts     # Seed / fallback data
│
├── public/                       # Static assets
├── docker-compose.yml            # PostgreSQL for local dev
├── vite.config.ts
├── package.json                  # Frontend root scripts
├── DOCUMENTATION.md              # This file
└── README.md                     # Quick start
```

---

## Data model

### PostgreSQL

**Table: `site_content`**

| Column | Type | Description |
|--------|------|-------------|
| `id` | `SMALLINT` | Always `1` (singleton) |
| `data` | `JSONB` | Full `SiteContent` object |
| `updated_at` | `TIMESTAMPTZ` | Last save time |

### `SiteContent` (TypeScript / JSON)

```ts
SiteContent {
  brand: { name, logoLetter }
  hero: { badge, title, titleHighlight, description, image, stats..., demoVideoUrl }
  contact: { badge, heading, headingHighlight, description, email, phone, address }
  projects: Project[]   // id, title, category, description, image, tech[], gradient, projectUrl
  socialLinks: { twitter, linkedin, github, mail }
  footer: { tagline, copyright, serviceLinks[], industryLinks[], privacyPolicy, termsOfService, cookiePolicy }
}
```

On first API read, if no row exists, the server inserts `defaultSiteContent` from `shared/defaultSiteContent.ts`.

---

## API reference

Base URL (dev): `http://localhost:3001`  
Frontend dev proxy: `/api/*` → API server

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/health` | No | `{ "ok": true }` |
| `GET` | `/api/site-content` | No | Returns full site JSON |
| `PUT` | `/api/site-content` | Bearer JWT | Replace site content |
| `POST` | `/api/site-content/reset` | Bearer JWT | Reset to defaults |
| `POST` | `/api/auth/login` | No | Body: `{ "password": "..." }` → `{ "token": "..." }` |

### Login example

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"teambuild-admin"}'
```

### Save example

```bash
curl -X PUT http://localhost:3001/api/site-content \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d @site-content.json
```

---

## Environment variables

### Server (`server/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | Postgres connection string |
| `PORT` | No | `3001` | API listen port |
| `ADMIN_PASSWORD` | No | `teambuild-admin` | Admin login password |
| `JWT_SECRET` | No | (dev fallback) | Secret for signing JWTs — **set in production** |
| `CORS_ORIGIN` | No | `http://localhost:5173` | Allowed frontend origin |

Example:

```env
PORT=3001
DATABASE_URL=postgres://teambuild:teambuild@localhost:5432/teambuild
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=long-random-string
CORS_ORIGIN=http://localhost:5173
```

### Frontend (optional `.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | API base URL. Leave empty in dev to use Vite proxy (`/api`). Set in production, e.g. `https://api.yourdomain.com` |

### Docker Compose (Postgres)

| Variable | Value |
|----------|-------|
| `POSTGRES_USER` | `teambuild` |
| `POSTGRES_PASSWORD` | `teambuild` |
| `POSTGRES_DB` | `teambuild` |
| Port | `5432` |

---

## Development setup

### Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm** (or pnpm)
- **Docker** (optional, for local PostgreSQL)

### 1. Start PostgreSQL

```bash
npm run db:up
# or: docker compose up -d postgres
```

### 2. Configure and run the API

```bash
cp server/.env.example server/.env
cd server
npm install
npm run db:migrate
npm run dev
```

API: [http://localhost:3001](http://localhost:3001)

### 3. Run the frontend

```bash
# from repo root
npm install
npm run dev
```

- Website: [http://localhost:5173](http://localhost:5173)
- Admin: [http://localhost:5173/admin](http://localhost:5173/admin)

### Run frontend + API together

```bash
npm run dev:all
```

---

## npm scripts

### Root (`package.json`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server (port 5173) |
| `npm run build` | Production build → `dist/` |
| `npm run dev:server` | Hono API in watch mode |
| `npm run dev:all` | Frontend + API concurrently |
| `npm run db:up` | Start Postgres via Docker Compose |
| `npm run db:migrate` | Run SQL migrations |

### Server (`server/package.json`)

| Script | Description |
|--------|-------------|
| `npm run dev` | `tsx watch src/index.ts` |
| `npm run build` | Compile TypeScript → `dist/` |
| `npm run start` | Run compiled server |
| `npm run db:migrate` | Apply `migrations/001_init.sql` |

---

## Admin panel

| URL | Purpose |
|-----|---------|
| `/admin/login` | Sign in |
| `/admin` | Dashboard |
| `/admin/contact` | Contact info |
| `/admin/projects` | Portfolio CRUD + JSON import |
| `/admin/links` | Social & footer links |
| `/admin/settings` | Brand, hero, footer |

**Default password (development):** `teambuild-admin`

**Project import format** — JSON array:

```json
[
  {
    "title": "Project Name",
    "category": "Web Application",
    "description": "Short description",
    "image": "https://example.com/image.jpg",
    "tech": ["React", "PostgreSQL"],
    "gradient": "from-violet-500 to-purple-500",
    "projectUrl": "https://example.com"
  }
]
```

Sample file: `public/sample-projects-import.json`

---

## Deployment notes

### Frontend

1. `npm run build` → deploy `dist/` to static hosting (Vercel, Netlify, S3 + CDN, etc.).
2. Set `VITE_API_URL` to your production API URL at build time.

### Backend

1. Build: `cd server && npm run build && npm run start`
2. Set `DATABASE_URL`, `JWT_SECRET`, `ADMIN_PASSWORD`, `CORS_ORIGIN` on the host.
3. Run migrations once: `npm run db:migrate`
4. Use a managed PostgreSQL (RDS, Supabase, Neon, etc.) in production.

### Security checklist (production)

- [ ] Change `ADMIN_PASSWORD` and `JWT_SECRET`
- [ ] Use HTTPS for API and site
- [ ] Restrict CORS to your real domain
- [ ] Do not commit `server/.env`
- [ ] Consider bcrypt + user table if multiple admins are needed

---

## Design origin

The UI was derived from a Figma design: [Company website for team building](https://www.figma.com/design/8zpqFbARlZxWcNHZbUY4y9/Company-website-for-team-building). See `ATTRIBUTIONS.md` for asset credits.

---

## Possible extensions

- Normalized `projects` table with per-project API routes
- Contact form submission (email service or tickets table)
- Image upload endpoint (S3 / Cloudflare R2)
- Drizzle ORM for migrations and typed queries
- Multi-admin users with hashed passwords
