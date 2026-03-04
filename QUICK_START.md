# Quick Start - Creating Your First Admin Account

## Step 1: Create Admin in Clerk Dashboard

1. Go to https://dashboard.clerk.com
2. Navigate to **Users** → **Create User**
3. Set email and password
4. After creation, edit the user and add to **Public metadata**:
   ```json
   { "role": "admin" }
   ```

## Step 2: Add Webhook Secret to .env.local

```env
CLERK_WEBHOOK_SECRET=whsec_your_secret_from_clerk
```

## Step 3: Set Up Webhook in Clerk

1. **Webhooks** → **Add Endpoint**
2. URL: `http://localhost:3000/api/webhooks/clerk`
3. Events: `user.created`, `user.updated`
4. Copy the signing secret to `.env.local`

## Step 4: Disable Public Sign-Up

In Clerk Dashboard:
- **User & Authentication** → **Email, Phone, Username**
- Turn OFF the **Sign up** toggle

## Done!

Now you can:
- Login at `/login` with your admin credentials
- Create more admins/agents through **Users & Agents** page
- All new users auto-sync to Convex via webhook

For full details, see `ADMIN_SETUP_GUIDE.md`
