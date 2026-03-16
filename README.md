# TravelHub — Full-Stack Travel Web Application

A complete travel booking platform built with **React + Redux Toolkit** frontend and **Node.js + Express + MongoDB** backend.

---

## Project Structure

```
travelhub/
├── backend/                   # Node.js + Express API
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── seed.js            # Database seeder
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── destinationController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT protect middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Destination.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── destinationRoutes.js
│   │   └── userRoutes.js
│   ├── .env                   # Backend environment variables
│   ├── package.json
│   └── server.js              # Entry point
│
├── src/                       # React + TypeScript frontend
│   ├── api/
│   │   ├── authApi.ts
│   │   ├── destinationApi.ts
│   │   └── userApi.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── BookingModal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── DestinationCard.tsx
│   │   │   ├── FilterSidebar.tsx
│   │   │   ├── SafetyBadge.tsx
│   │   │   ├── SafetyInfo.tsx
│   │   │   └── SearchBar.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── hooks/
│   │   └── useRedux.ts        # Typed Redux hooks
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── user/
│   │   │   └── DashboardPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── DestinationsPage.tsx
│   │   └── HomePage.tsx
│   ├── store/
│   │   ├── authSlice.ts
│   │   ├── destinationSlice.ts
│   │   ├── userSlice.ts
│   │   └── index.ts           # Redux store
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
│
├── .env                       # Frontend environment variables
└── package.json
```

---

## Prerequisites

- **Node.js** v18+
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)

---

## Installation & Setup

### Step 1 — Install Frontend Dependencies
```bash
# In the project root
npm install
```

### Step 2 — Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3 — Configure Environment Variables

**Frontend** (`/.env` — already created):
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend** (`/backend/.env` — already created):
```env
MONGO_URI=mongodb://localhost:27017/travelhub
JWT_SECRET=travelhub_super_secret_jwt_key_2024
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
```

> For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string:
> `MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/travelhub`

### Step 4 — Seed the Database (Optional but Recommended)
```bash
cd backend
node config/seed.js
```
This populates the database with 12 sample destinations across all categories.

---

## Running the Application

### Terminal 1 — Start the Backend
```bash
cd backend
npm run dev        # With nodemon (auto-restart)
# OR
npm start          # Without nodemon
```
Backend runs at: **http://localhost:5000**

### Terminal 2 — Start the Frontend
```bash
# In the project root
npm run dev
```
Frontend runs at: **http://localhost:5173**

---

## API Endpoints

### Auth
| Method | Endpoint             | Access  | Description       |
|--------|----------------------|---------|-------------------|
| POST   | /api/auth/register   | Public  | Register new user |
| POST   | /api/auth/login      | Public  | Login user        |

### Destinations
| Method | Endpoint                   | Access  | Description          |
|--------|----------------------------|---------|----------------------|
| GET    | /api/destinations           | Public  | List all (filterable)|
| GET    | /api/destinations/:id       | Public  | Get single           |
| POST   | /api/destinations           | Public  | Create new           |

**Query Parameters for GET /api/destinations:**
- `category` — hotel | restaurant | attraction | ride | guide
- `search` — text search in title/location/description
- `womenFriendly` — true/false
- `minPrice`, `maxPrice` — price range filter
- `sort` — price_asc | price_desc | rating_desc | rating_asc

### User (Protected — requires JWT)
| Method | Endpoint                        | Description          |
|--------|---------------------------------|----------------------|
| GET    | /api/user/profile               | Get profile          |
| PUT    | /api/user/profile               | Update profile       |
| GET    | /api/user/bookings              | Get user bookings    |
| POST   | /api/user/bookings              | Create booking       |
| PUT    | /api/user/bookings/:id/cancel   | Cancel booking       |

---

## Redux Store Structure

```
store/
├── auth         — user, token, isAuthenticated, loading, error
├── destinations — destinations[], featured*, filters, loading, error
├── user         — profile, bookings[], loading states, error
└── ui           — darkMode
```

---

## Features

- **JWT Authentication** — Register, login, protected routes
- **Redux Toolkit** — Global state with thunks for async API calls
- **Destinations** — Browse, filter, search by category/safety/price/rating
- **Booking System** — Book destinations, view/cancel bookings in dashboard
- **Dark Mode** — Persisted in localStorage
- **Responsive** — Mobile-first design with Tailwind CSS
- **Safety Ratings** — Women-friendly filters across all categories
- **Protected Routes** — Dashboard requires authentication

