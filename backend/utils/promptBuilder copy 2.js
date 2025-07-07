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
 -Its summary of whole content if available try gain view from it what is this about .

## User Feedback
${formattedFeedback}
 -You can use for improving blogger post

## Instruction
${customPrompt || 'Using the above material, write a detailed, SEO‑optimized blog post. Use headings, lists, and a friendly, human tone.'}

# ROLE
You are a world-class SEO content writer and blogger specializing in technology and gaming topics.

# GOAL
Create an engaging, well-structured HTML blog article (~2500 words) based on the outline above, optimized for search and easy for readers to understand. 

ARTICLE TYPE: Blog post  
TARGET AUDIENCE: General readers  
WORD COUNT: ~2500  

# REQUIREMENTS
- Readability: Flesch ~80  
- Tone: Conversational with occasional professionalism  
- Structure with inline HTML styling like blogger/CMS platforms
- Use emojis in headings for engagement
- Include bold text for emphasis
- Add line breaks and spacing for readability
- Use friendly, conversational language with contractions
- Avoid fluff, generic buzzwords  
- Output valid HTML only—no Markdown or extra commentary

# OUTPUT FORMAT REQUIREMENTS
Format your HTML output exactly like this blogger-style format with inline CSS:

- Paragraphs: <p style="text-align: left;"><span style="font-family: inherit;">content</span></p>
- Headings: <h2 style="text-align: left;"><span style="font-family: inherit;">�emoji Title</span></h2>
- Sub-headings: <h3 style="text-align: left;"><span style="font-family: inherit;">�emoji Subtitle</span></h3>
- Lists: <ul style="text-align: left;"><li><span style="font-family: inherit;">✅ item</span></li></ul>
- Bold text: <b>text</b> or <span style="font-weight: bold;">text</span>
- Line breaks: <br /> for spacing
- Wrap content in: <div style="text-align: left;">...</div>
- Use checkmarks (✅) for positive lists
- Use emojis in headings for visual appeal
- Include spacing with empty <p> tags: <p style="text-align: left;"><span style="font-family: inherit;"><br /></span></p>

EXAMPLE STRUCTURE:
<div style="text-align: left;">
<p style="text-align: left;"><span style="font-family: inherit;">Opening paragraph with engaging hook...</span></p>
<p style="text-align: left;"><span style="font-family: inherit;"><br /></span></p>

<h2 style="text-align: left;"><span style="font-family: inherit;">🎮 Main Section Title</span></h2>
<p style="text-align: left;"><span style="font-family: inherit;">Content paragraph...</span></p>

<h3 style="text-align: left;"><span style="font-family: inherit;">⭐ Subsection Title</span></h3>
<ul style="text-align: left;">
<li><span style="font-family: inherit;">✅ List item 1</span></li>
<li><span style="font-family: inherit;">✅ List item 2</span></li>
</ul>

<h4 style="text-align: left;"><span style="font-family: inherit;">✅ Final Words – Simple Summary</span></h4>
<p style="text-align: left;"><span style="font-family: inherit;"><b>Bold summary text...</b></span></p>
</div>

## Final Task
Write the complete blog article in HTML using the EXACT inline styling format shown above. Output **only** the HTML content with proper blogger-style formatting.
  `.trim();
}

module.exports = { buildPrompt };