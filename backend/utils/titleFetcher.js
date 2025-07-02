const axios = require('axios');
const readline = require('readline-sync');

async function getRedditTitles() {
  const url = 'https://www.reddit.com/r/popular/top.json?limit=5&t=day';
  const res = await axios.get(url, { headers: { 'User-Agent': 'BlogBot/1.0' } });

  return res.data.data.children.map(p => ({
    title: p.data.title,
    permalink: p.data.permalink || null,
  }));
}

async function getGoogleTrends() {
  const res = await axios.get('https://trends.google.com/trends/hottrends/visualize/internal/data');
  return res.data.flat().slice(0, 5).map(t => ({
    title: t,
    permalink: null,
  }));
}

async function getCustomTitle() {
  const title = readline.question('Enter custom title: ');
  return [{ title, permalink: null }];
}

async function fetchRedditPost(permalink) {
  const url = `https://www.reddit.com${permalink}.json`;
  const res = await axios.get(url, { headers: { 'User-Agent': 'BlogBot/1.0' } });

  const post = res.data[0].data.children[0].data;
  const topComments = res.data[1].data.children.slice(0, 3)
    .map(c => c.data.body)
    .filter(Boolean)
    .join('\n- ');

  return {
    content: post.selftext || '[No post content — might be a link or image post]',
    comments: topComments || '[No comments]',
  };
}

async function chooseTitle() {
  console.log('\nChoose title source:\n1. Reddit\n2. Google Trends\n3. Custom');
  const choice = readline.question('Enter choice (1/2/3): ');
  let titles = [];

  if (choice === '1') titles = await getRedditTitles();
  else if (choice === '2') titles = await getGoogleTrends();
  else titles = await getCustomTitle();

  titles.forEach((t, i) => {
    console.log(`${i + 1}. ${t.title}`);
  });

  const selected = readline.question('Select title number: ');
  return titles[parseInt(selected) - 1];
}

module.exports = { chooseTitle, fetchRedditPost };
