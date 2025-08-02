module.exports = (req, res) => {
  res.json({
    message: 'Hello from Vercel!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}; 