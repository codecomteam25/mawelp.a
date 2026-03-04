# Mawel P.A Admin Account Setup Guide

## Overview
This system allows **only admins** to create new user accounts (agents and other admins). There is **no public sign-up** — all accounts must be created by an existing admin through the dashboard.

---

## Initial Setup (First Time Only)

### Step 1: Create Your First Admin Account in Clerk

Since there's no public sign-up, you need to manually create the first admin account in your Clerk Dashboard:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your Mawel P.A application
3. Navigate to **Users** in the sidebar
4. Click **Create User**
5. Fill in:
   - **Email**: Your admin email (e.g., `admin@mawelpa.com`)
   - **Password**: Set a secure password
   - **First Name**: Your name
   - **Last Name**: (optional)
6. Click **Create**
7. **Important**: After creating the user, click on the user to edit
8. Scroll to **Public metadata** section
9. Add this JSON:
   ```json
   {
     "role": "admin"
   }
   ```
10. Click **Save**

### Step 2: Set Up Clerk Webhook (Auto-sync to Convex)

This webhook automatically syncs users from Clerk to Convex:

1. In Clerk Dashboard, go to **Webhooks**
2. Click **Add Endpoint**
3. Set **Endpoint URL** to: `https://your-domain.com/api/webhooks/clerk`
   - For local development: `http://localhost:3000/api/webhooks/clerk`
   - For production: Use your deployed URL
4. Subscribe to these events:
   - `user.created`
   - `user.updated`
5. Click **Create**
6. Copy the **Signing Secret** (starts with `whsec_`)
7. Add to your `.env.local`:
   ```
   CLERK_WEBHOOK_SECRET=whsec_your_secret_here
   ```

### Step 3: Disable Public Sign-Up in Clerk

1. In Clerk Dashboard, go to **User & Authentication** → **Email, Phone, Username**
2. Under **Authentication strategies**, disable:
   - **Sign up** toggle (turn it OFF)
3. This ensures only admins can create accounts through the dashboard

---

## How to Create New Users (Admin Only)

Once you're logged in as an admin:

1. Navigate to **Users & Agents** page in the dashboard
2. Click **Add User** button
3. Fill in the form:
   - **Full Name**: User's full name
   - **Email**: User's email address
   - **Phone**: Phone number
   - **Password**: Set a password (minimum 8 characters)
   - **Role**: Choose `Agent` or `Admin`
   - **Ghana Card Number**: (optional)
4. Click **Create User**

The system will:
- Create the user in Clerk with the specified password
- Store the role in Clerk's public metadata
- Webhook automatically syncs the user to Convex
- User can now log in with their email and password

---

## User Roles

### Admin
- Full dashboard access
- Can create/manage agents and other admins
- Access to all pages: Dashboard, Properties, Transactions, Payments, Users & Agents, Documents, Settings

### Agent
- Limited dashboard access
- Can manage properties, transactions, documents
- **Cannot** access Payments or Users & Agents pages
- **Cannot** create other users

### Buyer/Seller
- No dashboard access
- Redirected to public website
- Can browse listings, about, contact pages

---

## Login Process

### For Real Users (Created by Admin)
1. Go to `http://localhost:3000/login` (or your domain)
2. Enter email and password (set by admin)
3. Click **Sign In**
4. Redirected to dashboard based on role

### For Demo Mode (Client Presentations)
1. Go to `http://localhost:3000/login`
2. Use demo credentials:
   - Email: `admin@mawelpa.com`
   - Password: `MawelAdmin2026`
3. This bypasses Clerk and uses localStorage for demo purposes
4. Full admin access without needing a real Clerk account

---

## Environment Variables Required

Add these to `frontend/.env.local`:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
```

---

## Troubleshooting

### "User not found in Convex"
- Check that the Clerk webhook is set up correctly
- Verify `CLERK_WEBHOOK_SECRET` is in `.env.local`
- Manually trigger webhook or wait a few seconds for sync

### "Cannot create user"
- Verify you're logged in as an admin
- Check Clerk API keys are correct
- Ensure password is at least 8 characters

### "Redirected to Clerk sign-in page"
- This shouldn't happen anymore with the middleware fix
- Clear browser cache and try again
- Ensure you're navigating to `/login` directly

---

## Security Notes

- **Never share admin credentials**
- Admins should use strong, unique passwords
- Regularly audit user list in Users & Agents page
- Demo mode is for presentations only — disable in production by removing demo credentials check in login page
