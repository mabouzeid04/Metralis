# Deployment Guide

## 1. Infrastructure Checklist

| Component | Recommendation |
| --- | --- |
| Database | Managed PostgreSQL (Supabase, Neon, RDS, etc.) |
| Object Storage | S3-compatible bucket for document uploads |
| Backend Runtime | Container platform (Render, Railway, Fly.io, ECS, etc.) |
| Frontend Hosting | Static hosting (Vercel, Netlify, S3+CloudFront, etc.) |

## 2. Backend

1. Set environment variables as defined in `code/backend/.env.example`.
2. Build the container image:
   ```bash
   cd code/backend
   docker build -t metralis-backend .
   ```
3. Push/run the image on your platform, ensuring the following secrets are set:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `PORT` (optional, defaults to 4000)
   - `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`
   - Optional `S3_ENDPOINT`/`S3_FORCE_PATH_STYLE` if using a custom endpoint
4. Run Prisma migrations in your production database:
   ```bash
   npx prisma migrate deploy
   ```

## 3. Frontend

1. Set `VITE_API_URL` to the deployed backend (e.g., `https://api.metralis.com/api/v1`).
2. Build and deploy:
   ```bash
   cd code/frontend
   npm install
   npm run build
   ```
3. Upload the `dist/` folder to your static host.

## 4. MinIO / Local Development

`docker compose up -d` starts Postgres + MinIO locally. Access the MinIO console at `http://localhost:9001` (user `minio`, password `minio123`) to create the `metralis-documents` bucket.

## 5. Rollout Checklist

- [ ] Environment variables configured
- [ ] Migrations applied to production DB
- [ ] S3 bucket exists with proper IAM policy
- [ ] Backend container running and reachable
- [ ] Frontend deployed with correct `VITE_API_URL`
- [ ] Smoke tested login/signup/user management + file uploads
