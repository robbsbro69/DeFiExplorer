const mongoose = require('mongoose');

const AirdropEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  banner: { type: String },
  url: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AirdropEvent', AirdropEventSchema); 