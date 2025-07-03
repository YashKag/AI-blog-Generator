const express = require('express');
const router = express.Router();
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
        'User-Agent': 'BlogBot/1.0 by u/kartikeygaming',
      },
    }
  );

  cachedToken = res.data.access_token;
  tokenExpiresAt = Date.now() + res.data.expires_in * 1000;

  return cachedToken;
}

function cleanText(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "").trim(); // remove HTML tags
}

router.get('/', async (req, res) => {
  const subreddit = req.query.subreddit || 'popular';

  try {
    const token = await getRedditToken();

    const url = `https://oauth.reddit.com/r/${subreddit}/top?t=day&limit=25`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'BlogBot/1.0 by yourRedditUsername',
      },
    });

    const posts = await Promise.all(
      response.data.data.children.map(async (post) => {
        const postData = post.data;

        // Skip non-text posts
        if (!postData.is_self || !postData.selftext?.trim()) return null;

        // Handle thumbnail image
        const hasValidThumb = postData.thumbnail?.startsWith('http');
        const image = hasValidThumb
          ? postData.thumbnail
          : postData.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&') || null;

        let topComments = [];

        try {
          const commentsRes = await axios.get(
            `https://oauth.reddit.com${postData.permalink}?limit=15`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'BlogBot/1.0 by yourRedditUsername',
              },
            }
          );

          const comments = commentsRes.data[1]?.data?.children || [];

          topComments = comments
            .filter(c => c.kind === 't1' && c.data.body)
            .slice(0, 10)
            .map(c => {
              const replies = c.data.replies?.data?.children
                ?.filter(r => r.kind === 't1' && r.data.body)
                .slice(0, 2)
                .map(r => `↪️ ${cleanText(r.data.body)}`);

              return {
                author: c.data.author,
                upvotes: c.data.ups,
                body: cleanText(c.data.body),
                replies: replies || [],
              };
            });
        } catch (err) {
          console.warn("⚠️ Couldn't load comments for", postData.permalink);
        }

        return {
          title: postData.title,
          permalink: `https://reddit.com${postData.permalink}`,
          postContent: cleanText(postData.selftext),
          topComments,
          image,
        };
      })
    );

    res.json(posts.filter(Boolean));
  } catch (err) {
    console.error('❌ Reddit fetch error:', err.message);
    res.status(500).json({ error: 'Unable to fetch Reddit posts' });
  }
});

module.exports = router;
