// api/topics.js
const express = require('express');
const router = express.Router();
const axios = require('axios'); // ✅ using axios instead of fetch

router.get('/', async (req, res) => {
  const subreddit = req.query.subreddit || 'popular';

  try {
    const url = `https://www.reddit.com/r/${subreddit}/top.json?limit=10&t=day`;
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'BlogBot/1.0' }
    });

    const titles = response.data.data.children.map(post => ({
      title: post.data.title,
      permalink: `https://reddit.com${post.data.permalink}`,
    }));

    res.json(titles);
  } catch (err) {
    console.error('❌ Reddit fetch error:', err.message);
    res.status(500).json({ error: 'Unable to fetch Reddit posts' });
  }
});

module.exports = router;
