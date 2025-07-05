

const express = require('express');
const router = express.Router();
const { postToBloggerWithAuth } = require('../utils/bloggerPoster');
const { loadAuthClient } = require('../auth/googleAuth');



const BLOG_ID = process.env.BLOGGER_BLOG_ID;



await Post.updateOne(
  { title }, // you can also match by `_id` if available
  { $set: { status: "published" } }
);




router.post('/', async (req, res) => {
  const { title, html } = req.body;

  try {
    const authClient = await new Promise((resolve, reject) => {
      loadAuthClient((auth) => {
        if (auth) resolve(auth);
        else reject(new Error('Google Auth failed'));
      });
    });

    const response = await postToBloggerWithAuth(authClient, {
      blogId: BLOG_ID,
      title,
      content: html
    });

    res.json({ success: true, url: response.url });
  } catch (err) {
    console.error('❌ Publish error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
