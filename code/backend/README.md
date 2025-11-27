# Metralis CMMS API

Node/Express backend that implements the MVP scope defined in `PRD-v1-cmms.md`.

## Prerequisites

- Node.js 20.x
- npm
- Docker (for local Postgres + MinIO)

## Getting Started

```bash
# from repo root
docker compose up -d          # spins up Postgres + MinIO for dev

cd code/backend
npm install
npx prisma migrate dev        # applies schema to the Postgres container
npm run dev                   # API on http://localhost:4000
```

Environment variables live in `.env` (see `.env.example`):

```
DATABASE_URL="postgresql://metralis:metralis@localhost:5432/metralis?schema=public"
JWT_SECRET="supersecretjwt"
PORT=4000
S3_BUCKET="metralis-documents"
S3_REGION="us-east-1"
S3_ACCESS_KEY="minio"
S3_SECRET_KEY="minio123"
S3_ENDPOINT="http://localhost:9000"
S3_FORCE_PATH_STYLE=true
OPENAI_API_KEY="your-openai-key"          # embeddings
GEMINI_API_KEY="your-gemini-key"          # default chat provider
GEMINI_MODEL="gemini-2.5-flash"
AI_PROVIDER="gemini"
AI_TEMPERATURE=0.2
AI_MAX_TOKENS=1024
FRONTEND_URL="http://localhost:5173"      # comma-separated list allowed
```

For production, point those values at your managed Postgres instance and S3/Supabase bucket, then remove the `S3_ENDPOINT` + `S3_FORCE_PATH_STYLE` overrides.

## Project Structure

- `src/app.ts` – Express app setup (CORS, JSON body parsing, routes, error handler)
- `src/routes/*` – Feature routers for auth, machines, work orders, parts, documents, dashboard stats, search, and admin users
- `src/middleware/auth.ts` – JWT auth guard + role helper
- `prisma/schema.prisma` – Database schema aligned with the PRD (users, machines, work orders, repair actions, parts, documents, etc.)
- `src/services/storage.ts` – Multer + S3 helper (MinIO locally, AWS/Supabase in prod)

PostgreSQL is now the primary datastore. Document binaries are written to S3 (or MinIO) and we persist the object key in the `documents` table for retrieval.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start API with auto-reload (ts-node-dev) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled server |
| `npm run prisma:migrate` | Run migrations |
| `npm run prisma:generate` | Regenerate Prisma client |
| `npm run lint` | Type-check via `tsc --noEmit` |
| `npm test` | Run Vitest unit tests (retrieval + schema coverage) |

## API Overview

All endpoints are prefixed with `/api/v1`.

- `POST /auth/signup`, `POST /auth/login`, `GET /auth/me`
- `GET/POST/PATCH /machines`
- `GET/POST/PATCH /work-orders`
- `PATCH /work-orders/:id/status`, `PATCH /work-orders/:id/assign`, `POST /work-orders/:id/repair`
- `GET/POST/PATCH /parts`
- `GET/POST /documents`, `GET /documents/:id/file` (multipart upload using field `file`)
- `POST /ai/chat` – send a prompt, optional `machineId`, returns LLM reply + citations
- `GET /ai/conversations` – list a user's chat history
- `GET /ai/conversations/:id` – fetch messages for a conversation
- `GET /dashboard/stats`, `GET /dashboard/top-machines`
- `GET /search?q=...`
- Admin-only `GET/POST/PATCH /users`

All routes except `/auth/*` require the `Authorization: Bearer <token>` header.

## Frontend Integration

1. Start the backend (`npm run dev`).
2. In `code/frontend`, add an `.env` pointing to `VITE_API_URL=http://localhost:4000/api/v1`.
3. Frontend mock data can now be replaced with real requests (React Query/axios already included).

## Next Steps

- Seed script for demo data
- Expand AI provider registry (e.g., OpenAI GPT-4o, DeepSeek R1) by binding new adapters
- Tighten retrieval eval + add automated regression prompts
- Support streaming answers and richer UI states in the Metralis AI panel


