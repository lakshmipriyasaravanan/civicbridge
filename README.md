# CivicBridge – MERN Government Scheme Finder

A professional civic-tech platform for personalized government benefit discovery, explainable eligibility guidance, document readiness, and scheme comparison.

## Stack
- Frontend: React + Vite + JavaScript + React Router + Lucide React
- Backend: Node.js + Express + Mongoose
- Database: MongoDB
- Persistence: MongoDB + localStorage for demo session/UI state

## 1. Prerequisites
- Node.js 18+
- MongoDB local instance or MongoDB Atlas

## 2. Setup

### Backend
```bash
cd server
npm install
cp .env.example .env
# edit MONGO_URI if required
npm run seed
npm run dev
```

Backend runs on `http://localhost:5000`.

### Frontend
Open another terminal:
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Demo login
The login page is intentionally a simulated Google account selector. No real credentials are used.
- Priya Sharma – priya.demo@example.com
- Arun Kumar – arun.demo@example.com

## Important
The included scheme records are demo/sample data. CivicBridge is an informational platform; final eligibility and approval are determined by the relevant government authority.
