# Backend Service

This directory contains the JamConnect backend (Node.js + TypeScript + Express + Prisma).

## Prerequisites
- Node.js (LTS recommended)
- PostgreSQL database (configure connection URL in `DATABASE_URL` env var)

## Environment Variables
Create a `.env` file in `backend/`:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
```
(Replace placeholders with real values.)

## Installation
```
npm install
```

## Prisma Client Generation
The Prisma client must exist before running the dev server.
This project provides a script:
```
npm run prisma:generate
```
Run it after installing dependencies or modifying `prisma/schema.prisma`.

## Database Migration
To apply existing migrations (after first checkout):
```
npx prisma migrate deploy
```
To create a new migration after changing the schema:
```
npx prisma migrate dev --name <migration_name>
```

## Development
Start the server (runs via ts-node):
```
npm run dev
```
By default it listens on `http://localhost:4000`.

## Production Build (optional scaffold)
If you later introduce a build step (e.g., tsc output to `dist/`), add scripts:
```
"build": "tsc --project tsconfig.json",
"start": "node dist/index.js"
```
(Currently using ts-node directly for simplicity.)

## Auth (Current State)
- Sessions temporarily stored client-side via `localStorage` key `jamconnect_user`.
- Roadmap: migrate to HTTP-only signed cookie & refresh token rotation.

## Useful Commands
| Action | Command |
| ------ | ------- |
| Install deps | `npm install` |
| Generate Prisma client | `npm run prisma:generate` |
| Apply migrations | `npx prisma migrate deploy` |
| Start dev server | `npm run dev` |

## Troubleshooting
- If `PrismaClientInitializationError`: ensure database is running and `DATABASE_URL` is correct.
- If types are stale: re-run `npm run prisma:generate`.

## Conventions
- Add README setup note for any new script that generates artifacts.
- Keep API route handlers in `src/` (expand into submodules as complexity grows).

