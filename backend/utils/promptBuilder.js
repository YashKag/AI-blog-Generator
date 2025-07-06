function buildPrompt({ 
  title, 
  postContent = '', 
  summary = '', 
  comments = [], 
  customPrompt = '' 
}) {
  let formattedFeedback = '[No user feedback]';
  if (Array.isArray(comments) && comments.length) {
    formattedFeedback = comments.map(c => `- ${c}`).join('\n');
  } else if (typeof comments === 'string' && comments.trim()) {
    formattedFeedback = '- ' + comments.replace(/\n/g, '\n- ');
  }

  return `
# ${title}

## Reference Content
${postContent || '[Main content unavailable]'}

## Key Takeaways
${summary || '[No summary available]'}

## User Feedback
${formattedFeedback}

## Instruction
${customPrompt || 'Using the above material, write a detailed, SEO‑optimized blog post. Use headings, lists, and a friendly, human tone.'}

# ROLE
You are a professional SEO copywriter.

# GOAL
Craft a unique, high‑quality blog post inspired by the reference material.

ARTICLE TYPE: Blog post  
TARGET AUDIENCE: General readers  
WORD COUNT: ~2500  

# REQUIREMENTS
- Readability: Flesch ~80  
- Tone: Conversational with occasional professionalism  
- Structure:  
  - Subheadings: \`<h2>\`, \`<h3>\`  
  - Paragraphs: \`<p>\`  
  - Lists: \`<ul>\`, \`<li>\`  
- Use idioms, contractions, emotional cues, varied sentence lengths  
- Avoid fluff, generic buzzwords  
- Output valid HTML only—no Markdown or extra commentary

## Final Task
Write the complete blog article in HTML. Output **only** the HTML content.
  `.trim();
}

module.exports = { buildPrompt };
