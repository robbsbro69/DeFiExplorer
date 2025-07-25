const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  // Generate JWT
  const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  res.json({ token });
});

// Create admin user (setup route, remove after first use)
router.post('/create', async (req, res) => {
  const { username, password } = req.body;
  const existing = await Admin.findOne({ username });
  if (existing) return res.status(400).json({ message: 'Admin already exists' });
  const hash = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hash });
  await admin.save();
  res.json({ message: 'Admin created' });
});

module.exports = router; 