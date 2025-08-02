require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://defiexplorerr.vercel.app',
    'https://defiexplorer.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection with better error handling
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI;
    console.log('Checking MONGO_URI:', mongoUri ? 'Set' : 'Not set');
    
    if (!mongoUri) {
      console.error('MONGO_URI environment variable is not set');
      console.log('Available environment variables:', Object.keys(process.env));
      throw new Error('MONGO_URI is required');
    }

    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Full error:', err);
    // Don't exit process in production
    isConnected = false;
  }
};

// Health check endpoint
app.get('/', async (req, res) => {
  try {
    console.log('Health check requested');
    await connectDB();
    res.json({ 
      message: 'DeFi Explorer API running',
      status: 'success',
      mongoConnected: isConnected,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      message: 'API is running but MongoDB connection failed',
      status: 'warning',
      mongoConnected: isConnected,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Database connection middleware
app.use('/api/*', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(503).json({
      message: 'Database connection not available',
      status: 'error'
    });
  }
});

// Load and use routes
try {
  console.log('Loading routes...');
  const adminRoutes = require('./routes/admin');
  const chainRoutes = require('./routes/chain');
  const dappRoutes = require('./routes/dapp');
  const dailyTaskRoutes = require('./routes/dailytask');
  const airdropEventRoutes = require('./routes/airdropevent');
  const questRoutes = require('./routes/quest');
  const sectionRoutes = require('./routes/section');

  // API Routes - Force deployment update
  app.use('/api/admin', adminRoutes);
  app.use('/api/chains', chainRoutes);
  app.use('/api/dapps', dappRoutes);
  app.use('/api/dailytasks', dailyTaskRoutes);
  app.use('/api/airdropevents', airdropEventRoutes);
  app.use('/api/quests', questRoutes);
  app.use('/api/sections', sectionRoutes);
  console.log('Routes loaded successfully');
} catch (error) {
  console.error('Error loading routes:', error);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error middleware caught:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl
  });
});

// For Vercel deployment
module.exports = app;

// For local development and Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('MONGO_URI set:', !!process.env.MONGO_URI);
});
