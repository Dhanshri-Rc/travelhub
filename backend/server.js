/**
 * TravelHub Backend Server
 * Main entry point for the Express.js API server
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// CORS configuration — allow frontend origin
// app.use(
//   cors({
//     origin: ['http://localhost:5173', 'http://localhost:5175'],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

app.use(
  cors({
origin: [
  'http://localhost:5173',
  'http://localhost:5175',
  'https://travelhub-eta-liart.vercel.app'
],
    credentials: true,
  })
);

// ─── Routes ───────────────────────────────────────────────────────────────────

const authRoutes        = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const userRoutes        = require('./routes/userRoutes');

app.use('/api/auth',         authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/user',         userRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'TravelHub API is running',
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 TravelHub server running on port ${PORT}`);
  console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
});