const express = require('express');
const AirdropEvent = require('../models/AirdropEvent');
const jwt = require('jsonwebtoken');

const router = express.Router();

// JWT auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Get all airdrop events
router.get('/', async (req, res) => {
  const events = await AirdropEvent.find();
  res.json(events);
});

// Create airdrop event (admin only)
router.post('/', auth, async (req, res) => {
  const { title, description, banner, url, startDate, endDate } = req.body;
  const event = new AirdropEvent({ title, description, banner, url, startDate, endDate });
  await event.save();
  res.json(event);
});

// Update airdrop event (admin only)
router.put('/:id', auth, async (req, res) => {
  const { title, description, banner, url, startDate, endDate } = req.body;
  const event = await AirdropEvent.findByIdAndUpdate(
    req.params.id,
    { title, description, banner, url, startDate, endDate },
    { new: true }
  );
  res.json(event);
});

// Delete airdrop event (admin only)
router.delete('/:id', auth, async (req, res) => {
  await AirdropEvent.findByIdAndDelete(req.params.id);
  res.json({ message: 'Airdrop event deleted' });
});

module.exports = router; 