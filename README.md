# FORKOFF Campaign Dashboard

Next.js 16 app with:
- Credential auth (signup/signin/signout)
- JWT cookie sessions
- SQLite user storage
- Campaign listing API with search, sort, filters, and pagination

## Tech Stack

- Next.js `16.1.6` (App Router)
- React `19`
- TypeScript
- Tailwind CSS
- SQLite via `better-sqlite3`
- Auth crypto:
  - `bcryptjs` for password hashing
  - `jose` for JWT signing/verification
- Data fetching: `swr`

---

## Project Structure (Important Files)

- App/UI
  - `app/page.tsx` -> landing page
  - `app/login/page.tsx` -> login page
  - `app/signup/page.tsx` -> signup page
  - `app/dashboard/page.tsx` -> main campaign dashboard
  - `app/not-found.tsx` -> custom 404 page
- APIs
  - `app/api/auth/signup/route.ts`
  - `app/api/auth/signin/route.ts`
  - `app/api/auth/me/route.ts`
  - `app/api/auth/signout/route.ts`
  - `app/api/campaigns/route.ts`
- Auth/DB internals
  - `lib/db.ts`
  - `lib/auth.ts`
  - `middleware.ts`
- Campaign data/types
  - `lib/mock-campaigns.ts`
  - `lib/types.ts`
  - `hooks/use-campaigns.ts`

---

## Database

### What DB is used?

SQLite via `better-sqlite3`.

### DB file path

The DB path is created in code as:

- `path.join(process.cwd(), 'data', 'auth.db')`

So actual file is:

- `data/auth.db`

### Where connection is created?

In [`lib/db.ts`](/Users/manish/Desktop/test2/lib/db.ts):

- Creates DB connection: `new Database(dbPath)`
- Ensures `data/` directory exists
- Creates `users` table if missing
- Creates index `idx_users_email`

### Current schema

`users` table:
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `email` TEXT UNIQUE NOT NULL
- `password` TEXT NOT NULL (bcrypt hash)
- `name` TEXT nullable
- `avatar` TEXT nullable
- `created_at` DATETIME default current timestamp
- `updated_at` DATETIME default current timestamp

---

## Authentication Flow

### Core auth logic

In [`lib/auth.ts`](/Users/manish/Desktop/test2/lib/auth.ts):

- Password hash: `bcrypt.hash(password, 12)`
- Password verify: `bcrypt.compare(...)`
- JWT sign/verify with `HS256` and `7d` expiry
- Cookie name: `auth_token`
- Cookie options:
  - `httpOnly: true`
  - `sameSite: 'lax'`
  - `secure: process.env.NODE_ENV === 'production'`
  - `maxAge: 7 days`

### Secret used

`JWT_SECRET` from env if set, otherwise fallback:

- `'your-secret-key-change-in-production'`

You should set `JWT_SECRET` in real environments.

### Route protection

In [`middleware.ts`](/Users/manish/Desktop/test2/middleware.ts):

- Protected routes: `/dashboard`
- Auth pages: `/login`, `/signup`
- Redirect behavior:
  - Unauthenticated -> `/dashboard` redirects to `/login?callbackUrl=/dashboard`
  - Authenticated -> `/login` or `/signup` redirects to `/dashboard`
  - Authenticated -> `/` redirects to `/dashboard`

---

## API Documentation

Base URL (local dev): `http://localhost:3000`

## 1) Signup

### Endpoint

`POST /api/auth/signup`

### Body

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

### Validation

- `email` must be valid email
- `password` min 8 chars
- `name` optional but if provided must be non-empty

### Success (200)

Sets `auth_token` cookie and returns:

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "avatar": null
  }
}
```

### Error

- `400` validation errors / email already exists
- `500` internal error

---

## 2) Signin

### Endpoint

`POST /api/auth/signin`

### Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Validation

- Valid email format
- Password required (min 1)

### Success (200)

Sets `auth_token` cookie and returns same user shape as signup.

### Error

- `400` validation error
- `401` invalid credentials
- `500` internal error

---

## 3) Current User

### Endpoint

`GET /api/auth/me`

### Success

- If logged in:

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "avatar": null
  }
}
```

- If not logged in:

```json
{
  "user": null
}
```

---

## 4) Signout

### Endpoint

`POST /api/auth/signout`

### Success

Deletes auth cookie:

```json
{
  "success": true
}
```

---

## 5) Campaigns List

### Endpoint

`GET /api/campaigns`

### Data source

Currently from in-memory mock data in:

- [`lib/mock-campaigns.ts`](/Users/manish/Desktop/test2/lib/mock-campaigns.ts)

### Query params

- `q` -> search term (title/description contains)
- `niche` -> exact niche match (e.g. `Crypto`)
- `sort` -> `newest | oldest | popular`
- `budgetTrend` -> `all | increasing | decreasing`
- `page` -> page number (default `1`)
- `pageSize` -> items per page (default `6`)
- `dateFilter` -> `all | increasing | decreasing`
- `popularityFilter` -> `all | increasing | decreasing`
- `budgetFilter` -> `all | increasing | decreasing`

### Filter/sort behavior rules

Important behavior from [`app/api/campaigns/route.ts`](/Users/manish/Desktop/test2/app/api/campaigns/route.ts):

1. Search/niche/budgetTrend are applied first.
2. Then either:
   - Main sort (`sort`) is used, or
   - Custom filter sort is used (`dateFilter`, `popularityFilter`, `budgetFilter`)
3. If any custom filter is active, it overrides main sort.
4. Among custom filters, precedence is:
   - `dateFilter` first
   - else `popularityFilter`
   - else `budgetFilter`
5. Pagination is applied after sorting.

### Meaning of increasing/decreasing

- `dateFilter=increasing` -> newest first
- `dateFilter=decreasing` -> oldest first
- `popularityFilter=increasing` -> low to high
- `popularityFilter=decreasing` -> high to low
- `budgetFilter=increasing` -> low to high
- `budgetFilter=decreasing` -> high to low

### Response

```json
{
  "campaigns": [],
  "total": 0,
  "page": 1,
  "pageSize": 6
}
```

---

## API Call Examples

## Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password123","name":"Demo"}'
```

## Signin

```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password123"}' \
  -c cookies.txt
```

## Current user (with cookie)

```bash
curl http://localhost:3000/api/auth/me -b cookies.txt
```

## Signout

```bash
curl -X POST http://localhost:3000/api/auth/signout -b cookies.txt
```

## Campaigns with filters

```bash
curl "http://localhost:3000/api/campaigns?q=crypto&niche=Crypto&sort=newest&page=1&pageSize=6"
```

```bash
curl "http://localhost:3000/api/campaigns?dateFilter=increasing&page=1&pageSize=6"
```

```bash
curl "http://localhost:3000/api/campaigns?popularityFilter=decreasing&page=1&pageSize=6"
```

---

## Frontend Hooks and API Integration

- `hooks/use-auth.ts`
  - Calls:
    - `POST /api/auth/signin`
    - `POST /api/auth/signup`
    - `GET /api/auth/me` (via SWR)
    - `POST /api/auth/signout`
  - Redirects to `/dashboard` on signin/signup.

- `hooks/use-campaigns.ts`
  - Calls `GET /api/campaigns` with query params from dashboard state.
  - Returns `campaigns`, `total`, `isLoading`, `error`.

---

## Run Locally

## 1) Install

```bash
pnpm install
```

## 2) Optional env

Create `.env.local`:

```env
JWT_SECRET=your-strong-random-secret
```

## 3) Start dev server

```bash
pnpm dev
```

App: `http://localhost:3000`

---

## Scripts

- `pnpm dev` -> start dev server
- `pnpm build` -> production build
- `pnpm start` -> run built app
- `pnpm lint` -> eslint (if installed in environment)
- `pnpm type-check` -> TypeScript check
- `pnpm test` -> Jest tests

---

## Notes

- `data/auth.db` is generated/used automatically by `lib/db.ts`.
- Campaign API currently uses mock campaign data, not SQLite.
- There are known type/test config issues in current repo history (unrelated to README generation), so strict type-check/test status may vary.
