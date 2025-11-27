# Deployment Checklist - What You Need to Do

This checklist covers all the manual steps you need to complete after the code changes are done.

---

## ✅ Step 1: Supabase Setup

### 1.1 Get Database Connection String
- [ ] Go to Supabase Dashboard → Your Project → **Settings** → **Database**
- [ ] Scroll to **"Connection string"** → Copy the **URI** format
- [ ] It looks like: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
- [ ] **Replace `[PASSWORD]` with your actual database password**
- [ ] **Save this** - you'll need it for Render

### 1.2 Create Storage Bucket
- [ ] Go to Supabase → **Storage** (left sidebar)
- [ ] Click **"New bucket"**
- [ ] Name: `metralis-documents`
- [ ] Set to **Public** (toggle ON)
- [ ] Click **"Create bucket"**

### 1.3 Get Storage Credentials
- [ ] Go to **Settings** → **API**
- [ ] Find **"Project API keys"** section
- [ ] Copy the **`anon` `public`** key → This is your `S3_ACCESS_KEY`
- [ ] Copy the **`service_role` `secret`** key → This is your `S3_SECRET_KEY`
- [ ] **Save both**

### 1.4 Get Storage Endpoint
- [ ] Still in **Settings** → **API**
- [ ] Find **"Project URL"** (e.g., `https://[PROJECT-REF].supabase.co`)
- [ ] Your storage endpoint is: `https://[PROJECT-REF].supabase.co/storage/v1/s3`
- [ ] **Save this**

### 1.5 Enable pgvector + run migrations
- [ ] Go to **SQL Editor** in Supabase
- [ ] Run: `create extension if not exists vector;`
- [ ] In the repo root run: `cd code/backend && ./migrate-supabase.sh "postgresql://postgres:PASSWORD@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"`
- [ ] Confirm the new table `DocumentChunk` exists (Supabase Table Editor → public schema)

### 1.6 Configure OpenAI embeddings
- [ ] Create an OpenAI API key with access to `text-embedding-3-small`
- [ ] Store it somewhere safe—you’ll need it for Render environment variables
- [ ] (Optional) If you prefer a different embedding model/dimension, update both the DB column definition and `OPENAI_EMBEDDING_DIMENSIONS`

---

## ✅ Step 2: Render Backend Setup

### 2.1 Create Web Service
- [ ] Go to https://render.com → **"New +"** → **"Web Service"**
- [ ] Connect GitHub if not already connected
- [ ] Select repository: `Metralis`
- [ ] Select branch: `main`

### 2.2 Configure Service
Fill in:
- [ ] **Name**: `metralis-api` (or your choice)
- [ ] **Environment**: `Node`
- [ ] **Build Command**: `cd code/backend && npm install && npm run build`
- [ ] **Start Command**: `cd code/backend && npm start`
- [ ] **Root Directory**: Leave empty (or `code/backend` if Render supports it)

### 2.3 Set Environment Variables
Go to **"Environment Variables"** and add these (click "Add" for each):

| Variable Name | Value | Where to Get It |
|--------------|-------|----------------|
| `NODE_ENV` | `production` | - |
| `PORT` | `4000` | - |
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require` | Step 1.1 (add `?sslmode=require` at end) |
| `JWT_SECRET` | `[GENERATE RANDOM STRING]` | Generate with: `openssl rand -hex 32` (or any long random string) |
| `S3_BUCKET` | `metralis-documents` | - |
| `S3_REGION` | `us-east-1` | (or your Supabase region) |
| `S3_ACCESS_KEY` | `[ANON PUBLIC KEY]` | Step 1.3 |
| `S3_SECRET_KEY` | `[SERVICE ROLE SECRET KEY]` | Step 1.3 |
| `S3_ENDPOINT` | `https://[PROJECT-REF].supabase.co/storage/v1/s3` | Step 1.4 |
| `S3_FORCE_PATH_STYLE` | `true` | - |
| `FRONTEND_URL` | `https://yourdomain.com` | Your frontend domain (optional, for CORS) |
| `OPENAI_API_KEY` | `[YOUR OPENAI KEY]` | Step 1.6 |
| `OPENAI_EMBEDDING_MODEL` | `text-embedding-3-small` | Step 1.6 |
| `OPENAI_EMBEDDING_DIMENSIONS` | `1536` | Leave at 1536 unless you change the DB column |

**Important**: Replace all `[PLACEHOLDERS]` with actual values!

### 2.4 Deploy
- [ ] Click **"Create Web Service"**
- [ ] Wait for deployment (5-10 minutes)
- [ ] Once status shows **"Live"**, copy the **Service URL** (e.g., `https://metralis-api.onrender.com`)
- [ ] **Save this URL** - you'll need it for frontend

### 2.5 Add Custom Domain (Optional)
- [ ] In Render service → **"Settings"** → **"Custom Domains"**
- [ ] Click **"Add Custom Domain"**
- [ ] Enter: `api.yourdomain.com` (or your choice)
- [ ] Render will show DNS records - **save these for Step 4**

---

## ✅ Step 3: Vercel Frontend Setup

### 3.1 Create Project
- [ ] Go to https://vercel.com → **"Add New..."** → **"Project"**
- [ ] Import repository: `Metralis`
- [ ] Select branch: `main`

### 3.2 Configure Project
- [ ] **Framework Preset**: `Vite` (should auto-detect)
- [ ] **Root Directory**: `code/frontend`
- [ ] **Build Command**: `npm run build` (should auto-detect)
- [ ] **Output Directory**: `dist` (should auto-detect)

### 3.3 Set Environment Variable
- [ ] Click **"Environment Variables"**
- [ ] Add: `VITE_API_URL` = `https://metralis-api.onrender.com/api/v1`
  - (Use your Render URL for now, update to custom domain later if you set one up)

### 3.4 Deploy
- [ ] Click **"Deploy"**
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy the **Deployment URL** (e.g., `https://metralis.vercel.app`)
- [ ] **Save this URL**

### 3.5 Add Custom Domain (Optional)
- [ ] In Vercel project → **"Settings"** → **"Domains"**
- [ ] Enter your domain: `yourdomain.com` (or `app.yourdomain.com`)
- [ ] Vercel will show DNS records - **save these for Step 4**

---

## ✅ Step 4: Configure DNS (If Using Custom Domain)

### 4.1 Backend DNS
If you added a custom domain in Render:
- [ ] Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
- [ ] Find **"DNS Management"** or **"DNS Settings"**
- [ ] Add **CNAME** record:
  - **Name**: `api` (or your subdomain)
  - **Value**: `[YOUR-RENDER-SERVICE].onrender.com`
  - **TTL**: `3600` (or default)

### 4.2 Frontend DNS
If you added a custom domain in Vercel:
- [ ] In your domain registrar's DNS settings
- [ ] Add **CNAME** record (or **A** records if Vercel provides IPs):
  - **Name**: `@` (for root) or `app` (for subdomain)
  - **Value**: `cname.vercel-dns.com` (or IPs from Vercel)
  - **TTL**: `3600` (or default)

### 4.3 Wait for DNS Propagation
- [ ] DNS changes can take 5 minutes to 48 hours (usually 15-30 minutes)
- [ ] Check: https://dnschecker.org
- [ ] Once propagated, update frontend environment variable:
  - [ ] Go to Vercel → Project → **Settings** → **Environment Variables**
  - [ ] Update `VITE_API_URL` to: `https://api.yourdomain.com/api/v1`
  - [ ] Click **"Redeploy"** (or push a commit to trigger redeploy)

---

## ✅ Step 5: Test Everything

### 5.1 Test Backend
- [ ] Visit: `https://metralis-api.onrender.com/health` (or your custom domain)
- [ ] Should see: `{"status":"ok"}`

### 5.2 Test Frontend
- [ ] Visit: `https://metralis.vercel.app` (or your custom domain)
- [ ] Should see the login page
- [ ] Try signing up with a new account
- [ ] Should work! ✅

### 5.3 Test File Uploads
- [ ] Log into the app
- [ ] Go to **Documents** page
- [ ] Upload a test file
- [ ] Should work (stored in Supabase Storage) ✅

---

## 🔧 Troubleshooting

### Backend won't start
- [ ] Check Render logs: **"Logs"** tab in Render dashboard
- [ ] Verify all environment variables are set correctly
- [ ] Check that `DATABASE_URL` has correct password (no brackets)

### Frontend shows "Network Error"
- [ ] Check browser console (F12) for errors
- [ ] Verify `VITE_API_URL` in Vercel matches your backend URL
- [ ] Make sure backend is "Live" on Render

### Database connection fails
- [ ] Verify `DATABASE_URL` has correct password (no brackets)
- [ ] Check Supabase project is active
- [ ] Try the connection string in a PostgreSQL client to test

### File uploads fail
- [ ] Verify Supabase Storage bucket `metralis-documents` exists and is public
- [ ] Check `S3_ACCESS_KEY` and `S3_SECRET_KEY` are correct
- [ ] Verify `S3_ENDPOINT` is correct format

### Custom domain not working
- [ ] Wait longer for DNS propagation (can take up to 48 hours)
- [ ] Verify DNS records are correct at your registrar
- [ ] Check Render/Vercel show domain as "Active" or "Verified"

---

## 📝 Quick Reference

Save these URLs/values:

- **Supabase Database URL**: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
- **Supabase Storage Endpoint**: `https://[PROJECT-REF].supabase.co/storage/v1/s3`
- **Supabase Access Key**: `[ANON PUBLIC KEY]`
- **Supabase Secret Key**: `[SERVICE ROLE SECRET KEY]`
- **Render Backend URL**: `https://metralis-api.onrender.com`
- **Vercel Frontend URL**: `https://metralis.vercel.app`
- **Your Custom Domain**: `https://yourdomain.com` (if set up)

---

## 🎉 You're Done!

Once all steps are checked off, your app should be live on the internet!

