# Vercel Deployment Guide

## Environment Variables

Add these environment variables in your Vercel project settings:

```
NEXT_PUBLIC_CONVEX_URL=https://original-labrador-490.convex.cloud
CONVEX_DEPLOYMENT=prod:original-labrador-490
NEXT_PUBLIC_CONVEX_SITE_URL=https://original-labrador-490.convex.site
```

## Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Root Directory**: `frontend`

## Important Notes

1. Make sure to set the **Root Directory** to `frontend` in Vercel project settings
2. All environment variables must be added before deployment
3. The production Convex deployment is already configured and seeded with admin account

## Admin Login

After deployment, access the admin portal at:
- URL: `https://your-domain.vercel.app/login`
- Email: `admin@mawelpa.com`
- Password: `MawelAdmin2026`

## Troubleshooting

If you get 404 errors:
1. Verify Root Directory is set to `frontend`
2. Check that all environment variables are set
3. Redeploy the project
