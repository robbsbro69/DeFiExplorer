const mongoose = require('mongoose');

const DailyTaskSchema = new mongoose.Schema({
  type: { type: String, required: true }, // checkin, swap, quest, faucet
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  logo: { type: String },
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' }, // Reference to Section model
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DailyTask', DailyTaskSchema); 