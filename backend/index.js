require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const chainRoutes = require('./routes/chain');
const dappRoutes = require('./routes/dapp');
const dailyTaskRoutes = require('./routes/dailytask');
const airdropEventRoutes = require('./routes/airdropevent');
const questRoutes = require('./routes/quest');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/defiexplorer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// API Routes placeholder
app.get('/', (req, res) => {
    res.send('DeFi Explorer API running');
});

app.use('/api/admin', adminRoutes);
app.use('/api/chains', chainRoutes);
app.use('/api/dapps', dappRoutes);
app.use('/api/dailytasks', dailyTaskRoutes);
app.use('/api/airdropevents', airdropEventRoutes);
app.use('/api/quests', questRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
