# Quick Fix: Add SSL to DATABASE_URL

Your current connection string:
```
postgresql://postgres:Orion1FoodBasket2@db.vodpkueuivafcfjmtexa.supabase.co:5432/postgres
```

**Update it to (add `?sslmode=require` at the end):**
```
postgresql://postgres:Orion1FoodBasket2@db.vodpkueuivafcfjmtexa.supabase.co:5432/postgres?sslmode=require
```

## Steps:

1. Go to **Render Dashboard** → Your Backend Service
2. Click **"Environment"** tab
3. Find `DATABASE_URL`
4. Click to edit
5. Change from:
   ```
   postgresql://postgres:Orion1FoodBasket2@db.vodpkueuivafcfjmtexa.supabase.co:5432/postgres
   ```
   To:
   ```
   postgresql://postgres:Orion1FoodBasket2@db.vodpkueuivafcfjmtexa.supabase.co:5432/postgres?sslmode=require
   ```
6. Click **"Save Changes"**
7. Wait for Render to redeploy (2-5 minutes)
8. Check **"Logs"** tab - should see "✅ Migrations completed successfully"

## If Still Not Working:

### Option 1: Check Supabase IP Restrictions
1. Supabase Dashboard → Settings → Database
2. Scroll to "Network Restrictions"
3. Make sure it says "Your database can be accessed by all IP addresses"
4. If restricted, click "Add restriction" → Allow `0.0.0.0/0`

### Option 2: Try Connection Pooler
1. Supabase Dashboard → Settings → Database
2. Find "Connection string" → Look for "Session mode"
3. Copy that connection string (uses port 6543)
4. Use that as `DATABASE_URL` in Render instead

