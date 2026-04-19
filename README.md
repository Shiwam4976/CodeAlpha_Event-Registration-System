# Event Registration System (MERN Stack)

Fullstack MERN app for event registration.

## 🚀 Quick Start (Local)

### Backend
```
npm install
cp .env.example .env  # Add MONGODB_URI, JWT_SECRET
npm run dev  # http://localhost:5000
```

### Frontend
```
cd frontend
npm install
npm start  # http://localhost:3000
```

## ✨ Features
- User Auth (Register/Login JWT)
- View Events List/Details
- Register/Cancel (capacity check)
- Admin: Create Events
- MongoDB/Mongoose
- React/Vite/Bootstrap UI

## 📋 APIs
| Endpoint | Method | Auth | Desc |
|----------|--------|------|------|
| `/api/events` | GET | - | List events |
| `/api/events/:id` | GET | - | Event details |
| `/api/auth/register` | POST | - | Register |
| `/api/registrations` | POST/GET/DEL | Yes | Manage reg |

## 🌐 Live Deployments
**Backend**: https://event-reg-backend.onrender.com (Deploy: Render → GitHub repo)
**Frontend**: https://event-registration-ui.vercel.app (Deploy: Vercel → GitHub repo)

## Repo
https://github.com/Shiwam4976/CodeAlpha_Event-Registration-System

**Live Local**: Backend confirmed! Run frontend for UI.
