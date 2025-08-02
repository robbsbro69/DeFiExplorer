require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const chainRoutes = require('./routes/chain');
const dappRoutes = require('./routes/dapp');
const dailyTaskRoutes = require('./routes/dailytask');
const airdropEventRoutes = require('./routes/airdropevent');
const questRoutes = require('./routes/quest');
const sectionRoutes = require('./routes/section');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/defiexplorer', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// API Routes placeholder
app.get('/', (req, res) => {
    res.json({ 
      message: 'DeFi Explorer API running',
      status: 'success',
      timestamp: new Date().toISOString()
    });
});

app.use('/api/admin', adminRoutes);
app.use('/api/chains', chainRoutes);
app.use('/api/dapps', dappRoutes);
app.use('/api/dailytasks', dailyTaskRoutes);
app.use('/api/airdropevents', airdropEventRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/sections', sectionRoutes);

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
