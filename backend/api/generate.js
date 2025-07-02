// api/generate.js

const express = require('express');
const router = express.Router();
const { generateFromOllama } = require('../utils/ollamaClient');
const { buildPrompt } = require('../utils/promptBuilder');

router.post('/', async (req, res) => {
  const { title, postContent = '', comments = '', customPrompt = '' } = req.body;

  try {
    const prompt = buildPrompt({ title, postContent, comments, customPrompt });
    const html = await generateFromOllama(title, prompt);

    res.json({ title, html });
  } catch (err) {
    console.error('Generation error:', err);
    res.status(500).json({ error: 'Failed to generate blog post.' });
  }
});

module.exports = router;

