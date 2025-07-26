const express = require('express');
const Section = require('../models/Section');
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

// Get all sections
router.get('/', async (req, res) => {
  const { type } = req.query;
  const filter = {};
  if (type) filter.type = type;
  const sections = await Section.find(filter).sort({ order: 1 });
  res.json(sections);
});

// Create section (admin only)
router.post('/', auth, async (req, res) => {
  const { name, type, description, order } = req.body;
  const section = new Section({ name, type, description, order });
  await section.save();
  res.json(section);
});

// Update section (admin only)
router.put('/:id', auth, async (req, res) => {
  const { name, type, description, order } = req.body;
  const section = await Section.findByIdAndUpdate(
    req.params.id,
    { name, type, description, order },
    { new: true }
  );
  res.json(section);
});

// Delete section (admin only)
router.delete('/:id', auth, async (req, res) => {
  await Section.findByIdAndDelete(req.params.id);
  res.json({ message: 'Section deleted' });
});

module.exports = router; 