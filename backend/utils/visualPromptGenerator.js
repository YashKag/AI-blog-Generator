const { generateFromOllama } = require('./ollamaClient');

async function generateVisualPrompt({ title, summary, content }) {
  const base = `
You are an AI that creates descriptive prompts for image search.
Given a blog post, suggest a short image prompt someone could use to find a relevant Unsplash photo.

Title: ${title}
Summary: ${summary}
Content: ${content.slice(0, 400)}...

Return a very short and highly visual prompt (e.g. "Close-up of an Apple Watch on a wrist").
Do NOT include any extra words.
`;

  const visualPrompt = await generateFromOllama("visual", base);
  return visualPrompt?.trim() || title;
}

module.exports = { generateVisualPrompt };
