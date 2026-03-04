# Mawel P.A — Land Sales Management System

A professional web application for managing land sales in Ghana. Built with **React**, **NestJS**, **Convex**, and **Clerk**.

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Frontend       | React 19 + TypeScript + Vite      |
| Styling        | Tailwind CSS v4 (Ghanaian palette)|
| Backend        | NestJS                            |
| Database       | Convex (real-time)                |
| Authentication | Clerk                             |
| Icons          | Lucide React                      |
| Routing        | React Router v7                   |

## Features

- **Login / Signup** — Clerk-powered auth with Ghana-themed UI
- **Agent Dashboard** — Stats, recent transactions, available listings
- **Property Management** — CRUD for land listings with grid/list views, filters
- **Buyer/Seller Profiles** — Role-based user management (admin, agent, buyer, seller)
- **Part Payments Tracking** — Record and track installment payments (MoMo, bank, cash)
- **Transaction Details** — Full transaction lifecycle with payment progress
- **Document Management** — Upload/manage indentures, site plans, agreements
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Real-time Updates** — Convex subscriptions for live data

## Project Structure

```
Mawel P.A/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── layout/     # Sidebar, AppLayout
│   │   │   └── ui/         # Button, Card, Modal, StatusBadge, etc.
│   │   ├── pages/          # Route pages
│   │   ├── data/           # Mock data for development
│   │   ├── lib/            # Utility functions
│   │   └── types/          # TypeScript interfaces
│   ├── convex/             # Convex schema & server functions
│   └── .env.example
├── backend/                # NestJS backend
│   └── src/
│       ├── auth/           # Clerk auth guard, service, controller
│       ├── app.module.ts
│       └── main.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A [Clerk](https://clerk.com) account (for authentication)
- A [Convex](https://convex.dev) account (for the database)

### Frontend Setup

```bash
cd frontend
npm install

# Copy env and fill in your keys
cp .env.example .env

# Start dev server
npm run dev
```

The frontend runs on `http://localhost:5173` with mock data by default.

### Convex Setup

```bash
cd frontend
npx convex dev
```

This will prompt you to create a Convex project and generate the `convex/_generated` directory.

### Backend Setup

```bash
cd backend
npm install

# Copy env and fill in your keys
cp .env.example .env

# Start dev server
npm run start:dev
```

The backend runs on `http://localhost:3001`.

## Color Palette (Ghanaian Theme)

| Color         | Hex       | Usage                    |
| ------------- | --------- | ------------------------ |
| Ghana Green   | `#006B3F` | Primary actions, success |
| Ghana Gold    | `#FCD116` | Highlights, warnings     |
| Ghana Red     | `#CE1126` | Errors, danger states    |
| Ghana Black   | `#1A1A2E` | Sidebar, dark elements   |

## Environment Variables

### Frontend (`.env`)
- `VITE_CLERK_PUBLISHABLE_KEY` — Clerk publishable key
- `VITE_CONVEX_URL` — Convex deployment URL

### Backend (`.env`)
- `PORT` — Server port (default: 3001)
- `CLERK_SECRET_KEY` — Clerk secret key
- `CONVEX_URL` — Convex deployment URL

## License

Private — Mawel P.A © 2024
