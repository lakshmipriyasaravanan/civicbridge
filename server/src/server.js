import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import schemeRoutes from './routes/schemeRoutes.js';
import eligibilityRoutes from './routes/eligibilityRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-demo-user", "x-user-id"],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'CivicBridge API' }));
app.use('/api/schemes', schemeRoutes);
app.use('/api/eligibility', eligibilityRoutes);
app.use('/api/user', userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/civicbridge';

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB: ${mongoUri}`);
    app.listen(port, () => console.log(`CivicBridge API running on port ${port}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
