const axios = require('axios');
const { OLLAMA_URL, MODEL } = require('../config');

async function generateTitleWithOllama({ title, postContent = "", comments = [] }) {
  const context = `${title}\n\n${postContent}\n\n${comments.join("\n")}`;

  const prompt = `
Generate a short, SEO-optimized blog post title about this Reddit post:

"${context}"

Keep it under 12 words. Don't use hashtags or quotes. Stick to the actual topic.
  `;

  const response = await axios.post(OLLAMA_URL, {
    model: MODEL,
    prompt,
    stream: false
  });

  return response.data.response.trim();
}

module.exports = { generateTitleWithOllama };