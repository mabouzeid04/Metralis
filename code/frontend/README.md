# Metralis Frontend

## Config

Create `.env` (or `.env.local`) with:
```
VITE_API_URL=http://localhost:4000/api/v1
```

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle
npm run preview  # serve dist locally
```

Deploy the `dist/` directory to Vercel/Netlify/S3. Set `VITE_API_URL` to your backend URL before building for production.
