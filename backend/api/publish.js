// // api/publish.js
// const express = require('express');
// const router = express.Router();
// const { postToBlogger } = require('../main'); // import from your existing code

// router.post('/', async (req, res) => {
//   const { title, html } = req.body;
//   try {
//     const url = await postToBlogger(title, html);
//     res.json({ success: true, url });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { postToBloggerWithAuth } = require('../utils/bloggerPoster');
const { loadAuthClient } = require('../auth/googleAuth');

const BLOG_ID = process.env.BLOGGER_BLOG_ID;

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
