const express = require('express');
const router = express.Router();
const axios = require('axios');

// Clean HTML tags from text
function cleanText(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

router.get('/', async (req, res) => {
  const subreddit = req.query.subreddit || 'popular';

  try {
    // ✅ Use the public Reddit API (no token required)
    const url = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=25`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'kartikey-bot/1.0 by u/kartikeygaming',
      },
    });

    const posts = await Promise.all(
      response.data.data.children.map(async (post) => {
        const postData = post.data;

        // 🛑 Skip unwanted or removed content
        if (
          !postData.is_self ||
          !postData.selftext?.trim() ||
          postData.selftext === '[removed]' ||
          postData.author === '[deleted]' ||
          postData.archived
        ) {
          return null;
        }

        // 🖼️ Handle image fallback
        const hasValidThumb = postData.thumbnail?.startsWith('http');
        const image = hasValidThumb
          ? postData.thumbnail
          : postData.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&') || null;

        let topComments = [];

        try {
          // ✅ Fetch comments using public endpoint
          const commentsRes = await axios.get(
            `https://www.reddit.com${postData.permalink}.json?limit=15`,
            {
              headers: {
                'User-Agent': 'kartikey-bot/1.0 by u/kartikeygaming',
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
          console.warn("⚠️ Couldn't load comments for", postData.permalink, err.message);
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

    res.json(posts.filter(Boolean)); // filter out nulls
  } catch (err) {
    console.error('❌ Reddit fetch error:', err.config?.url || '', err.message);
    res.status(500).json({ error: 'Unable to fetch Reddit posts' });
  }
});

module.exports = router;
