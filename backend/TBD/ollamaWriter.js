const fs = require('fs');
const path = require('path');
const axios = require('axios');
const readline = require('readline');

// === CONFIG ===
const OLLAMA_URL = 'http://192.168.1.2:11434/api/generate';
const MODEL = 'llama3:latest'; // model you're running

// ===  Choose Title Source ===

async function chooseTitle() {
    console.log('\nChoose title source:');
    console.log('1. Reddit Trending');
    console.log('2. Google Trends');
    console.log('3. Custom');
  
    const choice = readline.question('Enter choice (1/2/3): ');
    let titles = [];
  
    if (choice === '1') titles = await getRedditTitle();
    else if (choice === '2') titles = await getGoogleTrends();
    else titles = await getCustomTitle();
  
    console.log('\nFetched Titles:');
    titles.forEach((t, i) => console.log(`${i + 1}. ${t}`));
  
    const selected = readline.question('Select title number to use: ');
    return titles[parseInt(selected) - 1];
  }
  

// === MAIN FUNCTION ===
async function generateBlogPost(title, customPrompt) {
    const fullPrompt = `# ${title}\n\n${customPrompt}`;
  
    try {
      const response = await axios.post(OLLAMA_URL, {
        model: MODEL,
        prompt: fullPrompt,
        stream: false
      });
  
      const result = response.data.response;
      const filename = title.replace(/\s+/g, '_') + '.md';
      const outputDir = path.join(__dirname, 'outputs');
      const filePath = path.join(outputDir, filename);
  
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  
      fs.writeFileSync(filePath, result, 'utf8');
      console.log(`✅ Saved to: ${filePath}`);
    } catch (err) {
      console.error('❌ Error communicating with Ollama:', err.message);
    }
  }

  // === USAGE EXAMPLE ===
const title = "10 Ways to Use AI for Blogging";
const prompt = "Write a detailed and engaging blog post with headings, lists, and friendly tone. Suitable for beginners.";

generateBlogPost(title, prompt);