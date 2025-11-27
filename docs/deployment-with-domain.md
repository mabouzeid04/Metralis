# Deployment Guide with Custom Domain

This guide will help you deploy Metralis to the internet using your own domain.

## Overview

We'll use:
- **Supabase** - Database (PostgreSQL) + File Storage
- **Render** - Backend hosting (API server)
- **Vercel** - Frontend hosting (React app)
- **Your Domain** - Custom domain for both frontend and backend

---

## Step 1: Set Up Supabase (Database + Storage)

### 1.1 Create Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click **"New Project"**
3. Fill in:
   - **Name**: `metralis` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., `us-east-2`)
4. Click **"Create new project"** (takes 2-3 minutes)

### 1.2 Get Database Connection String

1. In your Supabase project, go to **Settings** → **Database**
2. Scroll to **"Connection string"** section
3. Find **"URI"** format (not "Session mode" or "Transaction mode")
4. Copy the connection string - it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password
6. **Save this** - you'll need it for Render

### 1.3 Set Up File Storage (Supabase Storage)

1. In Supabase, go to **Storage** (left sidebar)
2. Click **"New bucket"**
3. Name it: `metralis-documents`
4. Set to **Public bucket** (toggle ON)
5. Click **"Create bucket"**

### 1.4 Get Storage Credentials

1. Go to **Settings** → **API**
2. Find **"Project API keys"** section
3. Copy:
   - **`anon` `public`** key (this is your `S3_ACCESS_KEY`)
   - **`service_role` `secret`** key (this is your `S3_SECRET_KEY`)
4. **Save both** - you'll need them for Render

### 1.5 Get Storage Endpoint

1. Still in **Settings** → **API**
2. Find **"Project URL"** - it looks like: `https://[PROJECT-REF].supabase.co`
3. Your storage endpoint will be: `https://[PROJECT-REF].supabase.co/storage/v1/s3`
4. **Save this** - you'll need it for Render

---

## Step 2: Deploy Backend to Render

### 2.1 Connect GitHub Repository

1. Go to https://render.com and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select repository: `Metralis`
5. Select branch: `main`

### 2.2 Configure Backend Service

Fill in the form:

- **Name**: `metralis-api` (or your choice)
- **Environment**: `Node`
- **Build Command**: `cd code/backend && npm install && npm run build`
- **Start Command**: `cd code/backend && npm start`
- **Root Directory**: Leave empty (or set to `code/backend` if Render supports it)

### 2.3 Set Environment Variables

Scroll to **"Environment Variables"** and click **"Add"** for each:

| Name | Value | Notes |
|------|-------|-------|
| `NODE_ENV` | `production` | |
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres` | From Step 1.2 |
| `JWT_SECRET` | `[GENERATE A RANDOM STRING]` | Use a long random string (e.g., `openssl rand -hex 32`) |
| `PORT` | `4000` | |
| `S3_BUCKET` | `metralis-documents` | |
| `S3_REGION` | `us-east-1` | (or your Supabase region) |
| `S3_ACCESS_KEY` | `[ANON PUBLIC KEY]` | From Step 1.4 |
| `S3_SECRET_KEY` | `[SERVICE ROLE SECRET KEY]` | From Step 1.4 |
| `S3_ENDPOINT` | `https://[PROJECT-REF].supabase.co/storage/v1/s3` | From Step 1.5 |
| `S3_FORCE_PATH_STYLE` | `true` | |

**Important**: Replace all `[PLACEHOLDERS]` with actual values from Supabase!

### 2.4 Deploy

1. Scroll down and click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once status shows **"Live"**, copy the **Service URL** (e.g., `https://metralis-api.onrender.com`)
4. **Save this URL** - you'll need it for frontend

### 2.5 Add Custom Domain (Backend)

1. In your Render service, go to **"Settings"** tab
2. Scroll to **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your subdomain (e.g., `api.yourdomain.com`)
5. Render will show you DNS records to add
6. **Don't add DNS yet** - we'll do all DNS together in Step 4

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Connect GitHub Repository

1. Go to https://vercel.com and sign up/login
2. Click **"Add New..."** → **"Project"**
3. Import your `Metralis` repository
4. Select branch: `main`

### 3.2 Configure Frontend Project

Fill in:

- **Framework Preset**: `Vite`
- **Root Directory**: `code/frontend`
- **Build Command**: `npm run build` (should auto-detect)
- **Output Directory**: `dist` (should auto-detect)

### 3.3 Set Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://api.yourdomain.com/api/v1` | (Use your backend custom domain, or Render URL for now) |

**Note**: If you haven't set up the custom domain yet, use your Render URL temporarily: `https://metralis-api.onrender.com/api/v1`. You can update this later.

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Once deployed, copy the **Deployment URL** (e.g., `https://metralis.vercel.app`)
4. **Save this URL**

### 3.5 Add Custom Domain (Frontend)

1. In your Vercel project, go to **"Settings"** → **"Domains"**
2. Enter your domain (e.g., `yourdomain.com` or `app.yourdomain.com`)
3. Vercel will show you DNS records to add
4. **Don't add DNS yet** - we'll do all DNS together in Step 4

---

## Step 4: Configure DNS Records

You need to add DNS records at your domain registrar (where you bought the domain).

### 4.1 Find Your DNS Settings

1. Log into your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
2. Find **"DNS Management"** or **"DNS Settings"**
3. You'll add records here

### 4.2 Add DNS Records

Add these records (exact values from Render and Vercel):

#### For Backend (API):
- **Type**: `CNAME`
- **Name**: `api` (or `backend` - your choice)
- **Value**: `[YOUR-RENDER-SERVICE].onrender.com` (from Render)
- **TTL**: `3600` (or default)

#### For Frontend:
- **Type**: `CNAME` (or `A` if Vercel requires it)
- **Name**: `@` (for root domain) or `app` (for subdomain)
- **Value**: `cname.vercel-dns.com` (or IPs if Vercel provides them)
- **TTL**: `3600` (or default)

**Example**:
- If your domain is `metralis.com`:
  - `api.metralis.com` → points to Render backend
  - `metralis.com` or `app.metralis.com` → points to Vercel frontend

### 4.3 Wait for DNS Propagation

1. DNS changes can take 5 minutes to 48 hours (usually 15-30 minutes)
2. Check propagation: https://dnschecker.org
3. Once propagated, your custom domains will work

### 4.4 Update Frontend Environment Variable

Once your backend custom domain is working:

1. Go back to Vercel → Your Project → **Settings** → **Environment Variables**
2. Update `VITE_API_URL` to: `https://api.yourdomain.com/api/v1`
3. Click **"Redeploy"** (or push a new commit to trigger redeploy)

---

## Step 5: Verify Everything Works

### 5.1 Test Backend

1. Visit: `https://api.yourdomain.com/health`
2. Should see: `{"status":"ok"}`

### 5.2 Test Frontend

1. Visit: `https://yourdomain.com` (or your frontend domain)
2. Should see the login page
3. Try signing up with a new account
4. Should work!

### 5.3 Test File Uploads

1. Log into the app
2. Go to **Documents** page
3. Upload a test file
4. Should work (stored in Supabase Storage)

---

## Troubleshooting

### Backend won't start
- Check Render logs: **"Logs"** tab in Render dashboard
- Verify all environment variables are set correctly
- Check that `DATABASE_URL` is correct (with password replaced)

### Frontend shows "Network Error"
- Check browser console (F12) for errors
- Verify `VITE_API_URL` in Vercel matches your backend URL
- Make sure backend is "Live" on Render

### Database connection fails
- Verify `DATABASE_URL` has correct password (no brackets)
- Check Supabase project is active
- Try the connection string in a PostgreSQL client to test

### File uploads fail
- Verify Supabase Storage bucket `metralis-documents` exists and is public
- Check `S3_ACCESS_KEY` and `S3_SECRET_KEY` are correct
- Verify `S3_ENDPOINT` is correct format

### Custom domain not working
- Wait longer for DNS propagation (can take up to 48 hours)
- Verify DNS records are correct at your registrar
- Check Render/Vercel show domain as "Active" or "Verified"

---

## Cost Estimate (Free Tier)

- **Supabase**: Free tier includes 500MB database + 1GB storage (enough for MVP)
- **Render**: Free tier (spins down after 15 min inactivity, but wakes on request)
- **Vercel**: Free tier (unlimited deployments, great for frontend)

**Total**: $0/month for MVP! 🎉

---

## Next Steps After Deployment

1. Set up monitoring (optional): Add error tracking (Sentry, etc.)
2. Set up backups: Supabase has automatic backups on paid plans
3. Scale up: When you outgrow free tiers, upgrade as needed
4. Add SSL: Render and Vercel provide free SSL certificates automatically

---

## Quick Reference: All URLs You'll Need

Save these:

- **Supabase Project URL**: `https://[PROJECT-REF].supabase.co`
- **Supabase Database URL**: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
- **Supabase Storage Endpoint**: `https://[PROJECT-REF].supabase.co/storage/v1/s3`
- **Render Backend URL**: `https://metralis-api.onrender.com` (or your custom domain)
- **Vercel Frontend URL**: `https://metralis.vercel.app` (or your custom domain)
- **Your Custom Domain**: `https://yourdomain.com` (frontend) and `https://api.yourdomain.com` (backend)

