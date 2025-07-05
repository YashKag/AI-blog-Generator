// utils/redditAuth.js
const axios = require('axios');
const qs = require('qs');

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

let cachedToken = null;
let tokenExpiresAt = 0;

async function getRedditToken() {
  if (cachedToken && Date.now() < tokenExpiresAt - 10_000) {
    return cachedToken;
  }

  const data = qs.stringify({ grant_type: 'client_credentials' });

  try {
    const res = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      data,
      {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'kartikey-bot/1.0 by u/kartikeygaming',
        },
      }
    );

    cachedToken = res.data.access_token;
    tokenExpiresAt = Date.now() + res.data.expires_in * 1000;

    console.log('✅ Got Reddit token');
    return cachedToken;
  } catch (err) {
    console.error('❌ Failed to get Reddit token:', err.response?.data || err.message);
    throw err;
  }
}


module.exports = { getRedditToken };
