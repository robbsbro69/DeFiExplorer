const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Testnet Faucets", "Mainnet Faucets"
  type: { type: String, required: true }, // "faucet" for now, can be extended later
  description: { type: String },
  order: { type: Number, default: 0 }, // For ordering sections
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Section', SectionSchema); 