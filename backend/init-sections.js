require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/defiexplorer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Create some default sections
const defaultSections = [
    {
        name: 'Testnet Faucets',
        type: 'faucet',
        description: 'Testnet faucets for various chains',
        order: 1
    },
    {
        name: 'Mainnet Faucets',
        type: 'faucet', 
        description: 'Mainnet faucets and airdrops',
        order: 2
    },
    {
        name: 'Layer 2 Faucets',
        type: 'faucet',
        description: 'Layer 2 and rollup faucets',
        order: 3
    }
];

async function initSections() {
    try {
        // Import the Section model
        const Section = require('./models/Section');
        
        // Clear existing sections
        await Section.deleteMany({});
        console.log('Cleared existing sections');
        
        // Insert default sections
        const sections = await Section.insertMany(defaultSections);
        console.log('Created default sections:', sections.map(s => s.name));
        
        console.log('Sections initialization complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing sections:', error);
        process.exit(1);
    }
}

// Run the initialization
initSections(); 