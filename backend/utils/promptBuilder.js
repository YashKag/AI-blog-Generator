function buildPrompt({ title, postContent = '', comments = [], customPrompt = '' }) {
  // 🧠 Convert array of comments to bullet points
  let formattedComments = '[No comments found]';
  if (Array.isArray(comments) && comments.length > 0) {
    formattedComments = comments.map(c => `- ${c}`).join('\n');
  } else if (typeof comments === 'string' && comments.trim() !== '') {
    formattedComments = '- ' + comments.replace(/\n/g, '\n- ');
  }

  return `
  # ${title}
  
  ## Reddit Post Summary:
  ${postContent || '[No post body found — may be a link/image post]'}
  
  ## Top Comments:
  ${formattedComments}
  
  ## Instruction:
  ${customPrompt || 'Write an SEO-friendly blog post using the above Reddit content. Use headings, lists, and a human-like tone.'}
  
  # ROLE
  You are a world-class SEO content writer...
  
  # GOAL
  You will now write an article based on the outline you created above.
  
  ARTICLE TYPE: Blog post  
  TARGET AUDIENCE: General public  
  NUMBER OF WORDS: ~2500  
  
  # REQUIREMENTS
  - Keep reading ease score ~80
  - Conversational tone with digressions
  - Mix casual and professional language
  - Avoid generic buzzwords
  - Use subheadings: <h2>, <h3>
  - Paragraphs: <p>
  - Lists: <ul>, <li>
  - Use contractions and idioms
  - Add emotional and rhetorical cues
  - Include mild redundancy like humans do
  - Use varied punctuation and sentence length
  - Mimic human rhythm and logic
  
  # STRUCTURE
  - Strong opening paragraph
  - Subheadings: <h2>, <h3>
  - Paragraphs: <p>
  - Lists: <ul>, <li>
  - Include a final conclusion
  - Output HTML only — no markdown or extra explanation
  
  ## Final Instruction:
  Write the blog article in valid HTML. Output the blog content only.
  `;
}

module.exports = { buildPrompt };
