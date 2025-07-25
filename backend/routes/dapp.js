const express = require('express');
const Dapp = require('../models/Dapp');
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

// Get all dapps (optionally filter by chain or type)
router.get('/', async (req, res) => {
  const { chain, type } = req.query;
  const filter = {};
  if (chain) filter.chain = chain;
  if (type) filter.type = type;
  const dapps = await Dapp.find(filter).populate('chain');
  res.json(dapps);
});

// Create dapp (admin only)
router.post('/', auth, async (req, res) => {
  const { name, url, type, chain, description, logo } = req.body;
  const dapp = new Dapp({ name, url, type, chain, description, logo });
  await dapp.save();
  res.json(dapp);
});

// Update dapp (admin only)
router.put('/:id', auth, async (req, res) => {
  const { name, url, type, chain, description, logo } = req.body;
  const dapp = await Dapp.findByIdAndUpdate(
    req.params.id,
    { name, url, type, chain, description, logo },
    { new: true }
  );
  res.json(dapp);
});

// Delete dapp (admin only)
router.delete('/:id', auth, async (req, res) => {
  await Dapp.findByIdAndDelete(req.params.id);
  res.json({ message: 'Dapp deleted' });
});

module.exports = router; 