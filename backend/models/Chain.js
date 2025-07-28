const mongoose = require('mongoose');

const ChainSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String }, // e.g. EVM, Cosmos, etc.
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chain', ChainSchema); 