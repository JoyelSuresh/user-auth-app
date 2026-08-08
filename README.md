# User Auth App

Full-stack user authentication app for **local development**: **React + Vite** frontend, **Node.js + Express + TypeScript** backend, and **MongoDB**. Users can register, log in, view their profile, and update their name. Access is secured with **JWT**.

---

## Features

- User registration with client- and server-side validation
- User login with JWT issuance
- Password hashing with bcryptjs
- Authenticated profile view (dashboard)
- Update logged-in user's name
- Protected frontend routes
- Password show / hide toggle
- Logout (clears JWT from `localStorage`)
- Request validation with Zod
- CORS for the local frontend
- Request logging middleware
- Health check endpoint

---

## Tech Stack

| Layer | Technologies |
|-------|----------------|
| Frontend | React 19, Vite 8, React Router DOM 7, Fetch API, CSS |
| Backend | Node.js, Express 5, TypeScript, Mongoose, Zod |
| Database | MongoDB |
| Auth | JWT (`jsonwebtoken`), bcryptjs |

---

## Development Architecture

```text
Browser (localhost:5173)
        |
        v
  React + Vite Frontend
        |
        |  fetch + JWT
        v
  Express API (localhost:5000)
        |
        v
     MongoDB
```

---

## Repository Structure

```text
user-auth-app/
├── backend/                 # Express + TypeScript API
│   ├── src/
│   │   ├── config/          # MongoDB connection
│   │   ├── controllers/     # HTTP handlers
│   │   ├── middleware/      # Auth, validation, request logger
│   │   ├── models/          # Mongoose User model
│   │   ├── routes/          # /auth routes
│   │   ├── services/        # Business logic
│   │   ├── validators/      # Zod schemas
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
│
├── frontend/                # React + Vite SPA
│   ├── src/
│   │   ├── api/             # Auth API client
│   │   ├── components/      # Navbar, ProtectedRoute, PasswordToggleButton
│   │   ├── pages/           # Login, Register, Dashboard, EditProfile
│   │   ├── utils/           # Client-side register validation
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

---

## Prerequisites

- Node.js **v18+**
- npm
- MongoDB running locally (or a MongoDB Atlas URI for local testing)
- Git

---

## Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/JoyelSuresh/user-auth-app.git
cd user-auth-app
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env` (copy from `.env.example` if needed):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-auth-app
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Start the API:

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| API | `http://localhost:5000` |
| Health check | `GET http://localhost:5000/health` |

### 3. Frontend

In a new terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start the app:

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| App | `http://localhost:5173` |

### 4. Local workflow

1. Ensure MongoDB is available.
2. Start backend (`npm run dev` in `backend/`) on port **5000**.
3. Start frontend (`npm run dev` in `frontend/`) on port **5173**.
4. Open `http://localhost:5173`, register, then log in.
5. Use Dashboard and Edit Profile; Logout clears the token.

---

## Development Environment Variables

### Backend — `backend/.env`

| Variable | Description | Dev value |
|----------|-------------|-----------|
| `PORT` | API port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/user-auth-app` |
| `JWT_SECRET` | Secret used to sign/verify tokens | any strong local secret |
| `JWT_EXPIRES_IN` | Token expiry hint | `7d` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |
| `NODE_ENV` | Runtime mode | `development` |

JWT signing uses `JWT_SECRET` and a `"7d"` expiry. Do not commit real `.env` files.

### Frontend — `frontend/.env`

| Variable | Description | Dev value |
|----------|-------------|-----------|
| `VITE_API_URL` | Backend base URL | `http://localhost:5000` |

---

## Development Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API with nodemon + ts-node |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |

---

## Frontend Overview

### Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Redirects to `/login` |
| `/login` | Public | Login form |
| `/register` | Public | Registration form |
| `/dashboard` | Protected | Profile overview |
| `/edit-profile` | Protected | Update display name |
| `*` | Public | 404 page |

### Key files

| File | Role |
|------|------|
| `src/api/auth.js` | API helpers: register, login, getProfile, updateProfile |
| `src/utils/validateRegister.js` | Client-side registration rules |
| `src/components/ProtectedRoute.jsx` | Route guard via JWT in `localStorage` |
| `src/components/Navbar.jsx` | Nav links + logout |
| `src/components/PasswordToggleButton.jsx` | Show / hide password |

### Client validation (register)

| Field | Rules |
|-------|--------|
| Name | 2–20 characters (trimmed) |
| Email | Required, valid email format |
| Password | 8–20 chars; at least one uppercase, lowercase, number, and special character |

---

## Backend Overview

Request flow: **Routes → Middleware (validate / authenticate) → Controllers → Services → MongoDB**.

- **Controllers** handle status codes and response shape.
- **Services** handle hashing, JWT, and DB queries.
- Passwords are stored as `passwordHash` only; the hash is never returned.

### User model

| Field | Type | Notes |
|-------|------|--------|
| `email` | String | Required, unique, lowercase, trimmed |
| `passwordHash` | String | bcrypt hash (salt rounds: 10) |
| `name` | String | Required, trimmed |
| `createdAt` / `updatedAt` | Date | Via Mongoose `timestamps` |

### Middleware

| Middleware | Purpose |
|------------|---------|
| `cors` | Allows `CORS_ORIGIN` (`http://localhost:5173`) |
| `express.json` | Parses JSON bodies |
| `requestLogger` | Logs `METHOD path statusCode` |
| `validate(schema)` | Zod validation |
| `authenticate` | Verifies Bearer JWT; sets `req.userId` |

### Server validation (Zod)

**Register**

| Field | Rules |
|-------|--------|
| `name` | Trimmed, 2–20 characters |
| `email` | Valid email |
| `password` | 8–20 chars; uppercase, lowercase, number, special character |

**Login**

| Field | Rules |
|-------|--------|
| `email` | Valid email |
| `password` | Required (non-empty) |

**Update profile**

| Field | Rules |
|-------|--------|
| `name` | Trimmed, 2–20 characters |

---

## API Endpoints (local)

**Base URL:** `http://localhost:5000`

Protected endpoints require:

```http
Authorization: Bearer <jwt_token>
```

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | No | Health check |
| `POST` | `/auth/register` | No | Create user |
| `POST` | `/auth/login` | No | Authenticate user |
| `GET` | `/auth/profile` | Yes | Get current user profile |
| `PATCH` | `/auth/profile` | Yes | Update current user's name |

### Status codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Validation error |
| 401 | Unauthorized |
| 404 | Not found |
| 409 | Conflict (email exists) |
| 500 | Internal server error |

---

## Authentication Flow

```text
Register / Login
       |
       v
Frontend  ----POST /auth/register or /login---->  Backend
       |                                            |
       |                                            v
       |                                         MongoDB
       |                                            |
       | <----------- JWT + user -------------------
       |
       v
Save token in localStorage
       |
       v
Open Dashboard / Edit Profile
       |
       v
Frontend  ----GET/PATCH /auth/profile---->  Backend
              (Bearer token)                  |
                                              v
                                         Verify JWT
                                              |
                                              v
                                           MongoDB
                                              |
Frontend  <--------- profile data ------------
```

1. Register or log in.
2. Backend hashes/verifies the password and returns a JWT.
3. Frontend stores the token in `localStorage`.
4. Protected pages and API calls send `Authorization: Bearer <token>`.
5. Logout removes the token from `localStorage`.

---

## License

ISC (see package manifests in `backend/` and `frontend/`).
