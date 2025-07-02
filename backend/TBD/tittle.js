// Get Trending Titles

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
  

