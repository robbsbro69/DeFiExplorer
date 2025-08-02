require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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
    if (!mongoUri) {
      console.error('MONGO_URI environment variable is not set');
      throw new Error('MONGO_URI is required');
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Don't exit process in serverless environment
    isConnected = false;
  }
};

// Lazy load routes to avoid issues if MongoDB is not connected
let adminRoutes, chainRoutes, dappRoutes, dailyTaskRoutes, airdropEventRoutes, questRoutes, sectionRoutes;

const loadRoutes = async () => {
  try {
    adminRoutes = require('./routes/admin');
    chainRoutes = require('./routes/chain');
    dappRoutes = require('./routes/dapp');
    dailyTaskRoutes = require('./routes/dailytask');
    airdropEventRoutes = require('./routes/airdropevent');
    questRoutes = require('./routes/quest');
    sectionRoutes = require('./routes/section');
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};

// Health check endpoint
app.get('/', async (req, res) => {
  try {
    await connectDB();
    res.json({ 
      message: 'DeFi Explorer API running',
      status: 'success',
      mongoConnected: isConnected,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      message: 'API is running but MongoDB connection failed',
      status: 'warning',
      mongoConnected: isConnected,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Initialize routes with connection check
app.use('/api/*', async (req, res, next) => {
  try {
    await connectDB();
    await loadRoutes();
    
    if (!isConnected) {
      return res.status(503).json({
        message: 'Database connection not available',
        status: 'error'
      });
    }
    
    next();
  } catch (error) {
    console.error('Route initialization error:', error);
    res.status(500).json({
      message: 'Service temporarily unavailable',
      status: 'error'
    });
  }
});

// API Routes
app.use('/api/admin', (req, res, next) => {
  if (adminRoutes) {
    adminRoutes(req, res, next);
  } else {
    res.status(503).json({ message: 'Admin routes not loaded' });
  }
});

app.use('/api/chains', (req, res, next) => {
  if (chainRoutes) {
    chainRoutes(req, res, next);
  } else {
    res.status(503).json({ message: 'Chain routes not loaded' });
  }
});

app.use('/api/dapps', (req, res, next) => {
  if (dappRoutes) {
    dappRoutes(req, res, next);
  } else {
    res.status(503).json({ message: 'Dapp routes not loaded' });
  }
});

app.use('/api/dailytasks', (req, res, next) => {
  if (dailyTaskRoutes) {
    dailyTaskRoutes(req, res, next);
  } else {
    res.status(503).json({ message: 'Daily task routes not loaded' });
  }
});

app.use('/api/airdropevents', (req, res, next) => {
  if (airdropEventRoutes) {
    airdropEventRoutes(req, res, next);
  } else {
    res.status(503).json({ message: 'Airdrop event routes not loaded' });
  }
});

app.use('/api/quests', (req, res, next) => {
  if (questRoutes) {
    questRoutes(req, res, next);
  } else {
    res.status(503).json({ message: 'Quest routes not loaded' });
  }
});

app.use('/api/sections', (req, res, next) => {
  if (sectionRoutes) {
    sectionRoutes(req, res, next);
  } else {
    res.status(503).json({ message: 'Section routes not loaded' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
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

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
