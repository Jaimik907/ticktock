# Ticktock — Timesheet Management App

A timesheet management application built as part of the TenTwenty Frontend Developer Assessment.

## Live Demo

[https://ticktock-8i13.vercel.app/login](https://ticktock-8i13.vercel.app/login)

**Test Credentials**
- Email: `alex@ticktock.com`
- Password: `password123`

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
git clone https://github.com/yourusername/ticktock.git
cd ticktock
npm install
```

### Environment Variables

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## Frameworks & Libraries

| Library | Purpose |
|---|---|
| Next.js 16 | React framework, App Router |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui | UI component primitives |
| next-auth v5 | Authentication |
| Axios | HTTP client |
| Lucide React | Icons |

## Project Structure
```
app/
  api/                        # Internal API routes
    auth/[...nextauth]/       # next-auth handler
    timesheets/               # Timesheet CRUD endpoints
  dashboard/                  # Protected dashboard
    [weekId]/                 # Weekly detail page
  login/                      # Login page
  error.tsx                   # Global error boundary
  not-found.tsx               # 404 page

components/
  errors/                     # ErrorFallback, EmptyState
  layout/                     # Header
  timesheets/                 # StatusBadge, AddEntryModal
  ui/                         # FormField, shadcn components

data/
  mockUsers.ts                # Dummy user credentials
  mockTimesheets.ts           # Dummy timesheet data
  store.ts                    # Shared in-memory store

hooks/
  useAuth.ts                  # Auth state and actions
  useTimesheets.ts            # Timesheet data and mutations

lib/
  auth.ts                     # next-auth config
  http.ts                     # Axios instance
  types.ts                    # Shared TypeScript interfaces
  dateUtils.ts                # Date formatting helpers
```

## Features

- Login with dummy authentication via next-auth
- Protected routes — unauthenticated users redirected to login
- Session-based auth with JWT stored in httpOnly cookie
- Back button prevention after login/logout
- Timesheet list with sorting, filtering by status and date range
- Pagination with configurable page size
- Weekly detail view grouped by date
- Add, edit and delete timesheet entries
- Hours progress bar per week
- Status auto-calculated based on total hours logged
- Skeleton loaders, empty states and inline error handling
- Responsive layout

## Assumptions & Notes

- Mock data is stored in memory — resets on server restart. In production this would be replaced with a real database.
- Status is derived from total hours: `0 = Missing`, `1–39 = Incomplete`, `40+ = Completed`
- Date range filter compares week start/end dates against selected range
- All API calls go through internal Next.js routes — no direct client-to-mock-data access
- Auth secret is hardcoded in `lib/auth.ts` for demo purposes — in production this would come from environment variables only

## Time Spent

| Task | Time |
|---|---|
| Project setup + auth | 2 hrs |
| Dashboard + table | 2 hrs |
| Weekly detail + modal | 2 hrs |
| Error handling + polish | 1 hr |
| Bug fixes + deployment | 1 hr |
| **Total** | **~8 hrs** |