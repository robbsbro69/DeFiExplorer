const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple health check
app.get('/', (req, res) => {
  res.json({
    message: 'DeFi Explorer API is running on Vercel',
    status: 'success',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({
    message: 'Test endpoint working',
    mongoUri: process.env.MONGO_URI ? 'Set' : 'Not set',
    frontendUrl: process.env.FRONTEND_URL || 'Not set'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

module.exports = app; 