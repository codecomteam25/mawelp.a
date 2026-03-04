# Vercel Deployment Setup Guide

## Critical: Fix 404 Error

The 404 error occurs because Vercel needs to know where your Next.js app is located. Follow these steps **exactly**:

### Step 1: Configure Root Directory in Vercel

1. Go to your Vercel project dashboard: https://vercel.com/codecomteam25/mawelp-a
2. Click **Settings** tab
3. Scroll to **Root Directory** section
4. Click **Edit**
5. Enter: `frontend`
6. Click **Save**

### Step 2: Add Environment Variables

Still in Settings, go to **Environment Variables** and add these:

```
NEXT_PUBLIC_CONVEX_URL=https://original-labrador-490.convex.cloud
CONVEX_DEPLOYMENT=prod:original-labrador-490
NEXT_PUBLIC_CONVEX_SITE_URL=https://original-labrador-490.convex.site
```

Make sure to add them for **Production**, **Preview**, and **Development** environments.

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Check "Use existing Build Cache" is **unchecked**
5. Click **Redeploy**

---

## Alternative: If Root Directory Setting Doesn't Work

If the Root Directory setting is not available or doesn't work:

1. **Delete the current Vercel project**
2. **Re-import from GitHub** and during setup:
   - When asked "What's the name of your project?" → keep default or rename
   - When asked "Which directory is your code located?" → Enter `frontend`
   - Framework Preset: **Next.js** (should auto-detect)
   - Build Command: Leave default (`npm run build`)
   - Output Directory: Leave default (`.next`)
   - Install Command: Leave default (`npm install`)

3. **Add environment variables** (same as Step 2 above)

4. **Deploy**

---

## Verify Deployment

After deployment completes, visit:
- Homepage: `https://mawelp-a.vercel.app/`
- Admin Login: `https://mawelp-a.vercel.app/login`

Login with:
- Email: `admin@mawelpa.com`
- Password: `MawelAdmin2026`

---

## Troubleshooting

**Still getting 404?**
- Verify Root Directory is set to `frontend` in Settings
- Check that all environment variables are set
- Clear build cache and redeploy
- Check deployment logs for errors

**Build fails?**
- Check environment variables are correct
- Verify Convex deployment is accessible
- Check build logs in Vercel dashboard
