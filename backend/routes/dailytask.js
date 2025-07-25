const express = require('express');
const DailyTask = require('../models/DailyTask');
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

// Get all daily tasks (optionally filter by type)
router.get('/', async (req, res) => {
  const { type } = req.query;
  const filter = {};
  if (type) filter.type = type;
  const tasks = await DailyTask.find(filter);
  res.json(tasks);
});

// Create daily task (admin only)
router.post('/', auth, async (req, res) => {
  const { type, name, url, description, logo } = req.body;
  const task = new DailyTask({ type, name, url, description, logo });
  await task.save();
  res.json(task);
});

// Update daily task (admin only)
router.put('/:id', auth, async (req, res) => {
  const { type, name, url, description, logo } = req.body;
  const task = await DailyTask.findByIdAndUpdate(
    req.params.id,
    { type, name, url, description, logo },
    { new: true }
  );
  res.json(task);
});

// Delete daily task (admin only)
router.delete('/:id', auth, async (req, res) => {
  await DailyTask.findByIdAndDelete(req.params.id);
  res.json({ message: 'Daily task deleted' });
});

module.exports = router; 