// api/seoTitle.js
const express = require('express');
const router = express.Router();
const { generateTitleWithOllama } = require('../utils/generateTitleWithOllama'); 

router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Missing title' });
  }

  try {
    const seoTitle = await generateTitleWithOllama(title);
    res.json({ title: seoTitle });
  } catch (err) {
    console.error('❌ SEO Title Error:', err.message);
    res.status(500).json({ error: 'Failed to generate SEO title' });
  }
});

module.exports = router;
