const express = require('express');
const Chain = require('../models/Chain');
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

// Get all chains
router.get('/', async (req, res) => {
  const chains = await Chain.find();
  res.json(chains);
});

// Create chain (admin only)
router.post('/', auth, async (req, res) => {
  const { name, logo, type, description } = req.body;
  const chain = new Chain({ name, logo, type, description });
  await chain.save();
  res.json(chain);
});

// Update chain (admin only)
router.put('/:id', auth, async (req, res) => {
  const { name, logo, type, description } = req.body;
  const chain = await Chain.findByIdAndUpdate(
    req.params.id,
    { name, logo, type, description },
    { new: true }
  );
  res.json(chain);
});

// Delete chain (admin only)
router.delete('/:id', auth, async (req, res) => {
  await Chain.findByIdAndDelete(req.params.id);
  res.json({ message: 'Chain deleted' });
});

module.exports = router; 