# Fix: Database Connection Error on Render

If you're seeing: `Can't reach database server at db.vodpkueuivafcfjmtexa.supabase.co:5432`

## Quick Fix Steps

### Step 1: Check Supabase IP Restrictions

1. Go to Supabase Dashboard → Your Project
2. Go to **Settings** → **Database**
3. Scroll to **"Network Restrictions"**
4. Make sure it says: **"Your database can be accessed by all IP addresses"**
   - If it shows restrictions, click **"Add restriction"** and allow `0.0.0.0/0` (all IPs)
   - Or temporarily remove restrictions for testing

### Step 2: Update DATABASE_URL in Render

The connection string might need SSL parameters. Here's the correct format:

1. Go to Render Dashboard → Your Backend Service
2. Go to **"Environment"** tab
3. Find `DATABASE_URL` and click to edit

**Current format (might be wrong):**
```
postgresql://postgres:PASSWORD@db.vodpkueuivafcfjmtexa.supabase.co:5432/postgres
```

**Try this format (with SSL):**
```
postgresql://postgres:PASSWORD@db.vodpkueuivafcfjmtexa.supabase.co:5432/postgres?sslmode=require
```

**Important:**
- Replace `PASSWORD` with your actual Supabase database password (no brackets)
- If your password has special characters, they need to be URL-encoded:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `$` becomes `%24`
  - `%` becomes `%25`
  - etc.

### Step 3: Verify Connection String Format

The connection string should look exactly like this (with your actual password):
```
postgresql://postgres:Orion1FoodBasket2@db.vodpkueuivafcfjmtexa.supabase.co:5432/postgres?sslmode=require
```

**Common mistakes:**
- ❌ Having brackets: `[PASSWORD]` → ✅ Remove brackets
- ❌ Missing password: `postgres:@db...` → ✅ Include password
- ❌ Wrong format: `postgres://` → ✅ Use `postgresql://`
- ❌ Missing SSL: No `?sslmode=require` → ✅ Add SSL parameter

### Step 4: Redeploy on Render

After updating `DATABASE_URL`:
1. Click **"Save Changes"** in Render
2. Render will automatically redeploy
3. Wait for deployment to finish (2-5 minutes)
4. Check **"Logs"** tab to see if connection works

### Step 5: Test Connection

1. Go to Render → Your Service → **"Logs"** tab
2. Look for:
   - ✅ `✅ Migrations completed successfully` = Good!
   - ✅ `API listening on port 4000` = Good!
   - ❌ `Can't reach database server` = Still broken, check steps above

### Alternative: Use Connection Pooler

If direct connection still doesn't work, try Supabase's connection pooler:

1. Go to Supabase → **Settings** → **Database**
2. Find **"Connection string"** section
3. Look for **"Session mode"** or **"Transaction mode"** connection string
4. It will look like:
   ```
   postgresql://postgres.vodpkueuivafcfjmtexa:[PASSWORD]@aws-0-us-east-2.pooler.supabase.com:6543/postgres
   ```
5. Copy this and use it as `DATABASE_URL` in Render (replace `[PASSWORD]` with actual password)
6. **Note**: Pooler uses port `6543` instead of `5432`

---

## Still Not Working?

### Check Render Logs
1. Render Dashboard → Your Service → **"Logs"** tab
2. Look for error messages
3. Copy the full error and check:
   - Is the password correct?
   - Are there special characters that need encoding?
   - Is Supabase project active?

### Test Connection Locally
You can test if the connection string works:
```bash
# Install psql (PostgreSQL client) if needed
# Then test:
psql "postgresql://postgres:PASSWORD@db.vodpkueuivafcfjmtexa.supabase.co:5432/postgres?sslmode=require"
```

If this works locally but not on Render, it's likely an IP restriction issue.

### Contact Supabase Support
If nothing works, Supabase support can help check:
- Database status
- IP restrictions
- Connection limits

---

## Quick Checklist

- [ ] Supabase IP restrictions allow all IPs (or Render's IPs)
- [ ] `DATABASE_URL` in Render has correct password (no brackets)
- [ ] `DATABASE_URL` includes `?sslmode=require` at the end
- [ ] Password special characters are URL-encoded if needed
- [ ] Render service has been redeployed after changes
- [ ] Checked Render logs for connection errors

