const axios = require('axios');
const { OLLAMA_URL, MODEL } = require('../config');

async function generateTitleWithOllama(context) {
  const prompt = `
Generate a short, catchy, SEO-optimized blog post title for the following topic or content:

"${context}"

Keep it under 12 words. Don't use hashtags or quotes.
  `;

  const response = await axios.post(OLLAMA_URL, {
    model: MODEL,
    prompt,
    stream: false
  });

  return response.data.response.trim();
}

module.exports = { generateTitleWithOllama };
