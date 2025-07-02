const fs = require('fs');
const path = require('path');
const axios = require('axios');
const readline = require('readline-sync');

const OLLAMA_URL = 'http://192.168.1.2:11434/api/generate';
const MODEL = 'llama3:latest';

// === 1. Get Trending Titles ===

async function getRedditTitle() {
  const url = 'https://www.reddit.com/r/popular/top.json?limit=5&t=day';
  const res = await axios.get(url, { headers: { 'User-Agent': 'BlogBot/1.0' } });
  const posts = res.data.data.children;
  return posts.map(post => post.data.title);
}

async function getGoogleTrends() {
  const url = 'https://trends.google.com/trends/hottrends/visualize/internal/data';
  const res = await axios.get(url);
  const flatList = res.data.flat();
  return flatList.slice(0, 5); // top 5 trending
}

async function getCustomTitle() {
  const title = readline.question('Enter your custom title: ');
  return [title];
}

// === 2. Choose Title Source ===

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

// === 3. Generate Blog Content ===

async function generateFromOllama(title, prompt) {
  const fullPrompt = `# ${title}\n\n${prompt}`;
  const response = await axios.post(OLLAMA_URL, {
    model: MODEL,
    prompt: fullPrompt,
    stream: false
  });
  return response.data.response;
}

// === 4. Save to File ===

function saveToFile(title, content) {
  const filename = title.replace(/\s+/g, '_') + '.md';
  const dir = path.join(__dirname, 'outputs');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, filename), content, 'utf8');
  console.log(`✅ Saved: outputs/${filename}`);
}

// === 5. Run ===

(async () => {
  const title = await chooseTitle();
  const prompt = readline.question('\nEnter blog prompt (e.g., SEO blog, list, story):\n');
  const content = await generateFromOllama(title, prompt);
  saveToFile(title, content);
})();
