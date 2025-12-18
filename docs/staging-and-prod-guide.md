# Staging and Production Runbook (Supabase + App)

Goal: always work in staging by default, then promote both database schema and app changes to production when ready.

## What you need
- Supabase CLI installed: `brew install supabase/tap/supabase`
- Logged in once: `supabase login`
- Two Supabase projects already exist:
  - Prod ref: `vodpkueuivafcfjmtexa`
  - Staging ref: `dilapxxyzjdzyfthpsfz`
- Env files (keep secrets out of git):
  - `code/backend/.env.staging` (staging secrets)
  - `code/backend/.env.prod` (prod secrets)
  - Never commit real secrets; keep `.env.example` for placeholders.

## Local backend: use staging by default
The backend loader reads `.env`. To work against staging locally:
1) Copy staging env into `.env` before running the API:
   - `cp code/backend/.env.staging code/backend/.env`
2) Start the backend as usual (e.g., `npm run dev` inside `code/backend`).
If you ever need to point the local backend at prod (rare): `cp code/backend/.env.prod code/backend/.env` first. Switch back to staging afterward.

## Database schema migrations
All DB changes go through migrations in `supabase/migrations/`.

One-time baseline already pulled: `20251210003722_baseline-prod.sql` (prod schema at time of capture).

### Normal flow (make changes in staging, then promote)
1) **Link CLI to staging (default state):**
   - `supabase link --project-ref dilapxxyzjdzyfthpsfz --password <staging-db-password>`
   - Do this once per machine/session; stay linked to staging while developing.
2) **Change schema/RLS/functions** against staging (via SQL or the dashboard), then generate a migration:
   - `supabase db diff -f <short-name>`
   - This writes a new SQL file in `supabase/migrations/`.
3) **Apply to staging:**
   - `supabase db push`
   - Verify the app/tests against staging.
4) **Promote to prod:**
   - Link prod: `supabase link --project-ref vodpkueuivafcfjmtexa --password <prod-db-password>`
   - Apply the same migrations: `supabase db push`
   - Immediately re-link staging to avoid accidental prod commands:
     `supabase link --project-ref dilapxxyzjdzyfthpsfz --password <staging-db-password>`

Notes:
- If `supabase db push` asks for confirmation, answer `Y`.
- Warnings like “no privileges were granted for vector_*” are normal for the vector extension.
- Do not edit schema in the prod dashboard; always use migrations.
- Do not copy prod data into staging; create safe seed data if needed.

## App (website/API) deploy flow
### Working in staging (default)
- Keep `.env` set to staging values locally.
- Point your frontend/backend staging deployments to the staging Supabase URL/keys.

### Promoting to prod
1) Ensure the migrations have been pushed to prod (see DB steps above).
2) Deploy the app with prod env vars:
   - Set prod Supabase URL, anon/service keys, JWT secret, S3 creds in your hosting platform.
3) Merge/ship the app code to the prod branch/environment.

## Quick command recap
- Link staging: `supabase link --project-ref dilapxxyzjdzyfthpsfz --password <staging-db-password>`
- Link prod: `supabase link --project-ref vodpkueuivafcfjmtexa --password <prod-db-password>`
- Generate migration from staged changes: `supabase db diff -f my-change`
- Apply to current link: `supabase db push`
- Use staging env locally: `cp code/backend/.env.staging code/backend/.env`
- Use prod env locally (rare): `cp code/backend/.env.prod code/backend/.env`

## Safety checklist
- Stay linked to staging except when promoting to prod.
- Never commit real secrets; only commit migration SQL files.
- Take a prod backup before risky migrations (`supabase db dump` or Supabase backups).
- After pushing to prod, relink to staging immediately.
