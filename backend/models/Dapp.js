const mongoose = require('mongoose');

const DappSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true }, // DEX, Lending, NFT, Bridge, Faucet, etc.
  chain: { type: mongoose.Schema.Types.ObjectId, ref: 'Chain', required: true },
  description: { type: String },
  logo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dapp', DappSchema); 