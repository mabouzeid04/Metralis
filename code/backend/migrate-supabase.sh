#!/bin/bash
# Helper script to run Prisma migrations against Supabase
# Usage: ./migrate-supabase.sh "your-supabase-database-url"

if [ -z "$1" ]; then
  echo "Usage: ./migrate-supabase.sh \"postgresql://postgres:PASSWORD@db.PROJECT-REF.supabase.co:5432/postgres\""
  echo ""
  echo "To get your Supabase DATABASE_URL:"
  echo "1. Go to https://supabase.com/dashboard"
  echo "2. Select your project"
  echo "3. Go to Settings → Database"
  echo "4. Copy the 'Connection string' under 'Connection string' (URI format)"
  echo "5. Replace [YOUR-PASSWORD] with your actual database password"
  exit 1
fi

export DATABASE_URL="$1"
echo "Running migrations against Supabase..."
npx prisma migrate deploy
echo ""
echo "✅ Migrations complete! Your Supabase database is now ready."

