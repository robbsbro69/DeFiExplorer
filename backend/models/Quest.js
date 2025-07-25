const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  chain: { type: mongoose.Schema.Types.ObjectId, ref: 'Chain' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quest', QuestSchema); 