const express = require('express');
const Quest = require('../models/Quest');
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

// Get all quests (optionally filter by chain)
router.get('/', async (req, res) => {
  const { chain } = req.query;
  const filter = {};
  if (chain) filter.chain = chain;
  const quests = await Quest.find(filter).populate('chain');
  res.json(quests);
});

// Create quest (admin only)
router.post('/', auth, async (req, res) => {
  const { title, description, url, chain } = req.body;
  const quest = new Quest({ title, description, url, chain });
  await quest.save();
  res.json(quest);
});

// Update quest (admin only)
router.put('/:id', auth, async (req, res) => {
  const { title, description, url, chain } = req.body;
  const quest = await Quest.findByIdAndUpdate(
    req.params.id,
    { title, description, url, chain },
    { new: true }
  );
  res.json(quest);
});

// Delete quest (admin only)
router.delete('/:id', auth, async (req, res) => {
  await Quest.findByIdAndDelete(req.params.id);
  res.json({ message: 'Quest deleted' });
});

module.exports = router; 