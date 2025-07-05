// routes/rss.js
const express = require('express');
const router = express.Router();
const { getRssTitles } = require('../utils/rss/rssFetcher');

router.get('/', async (req, res) => {
  try {
    const articles = await getRssTitles(5); // can change the limit via query too
    res.json(articles);
  } catch (error) {
    console.error('❌ RSS API error:', error.message);
    res.status(500).json({ error: 'Unable to fetch RSS articles' });
  }
});

module.exports = router;
