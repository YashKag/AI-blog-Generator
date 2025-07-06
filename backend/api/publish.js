const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const authenticate = require("../auth/googleAuth");

router.post("/", async (req, res) => {
  const { title, html, image } = req.body;

  console.log("📩 Publish Request:", { title, hasHtml: !!html, image });

  if (!title || !html) {
    return res.status(400).json({ error: "Missing title or content" });
  }

  try {
    const auth = await authenticate();
    const blogger = google.blogger({ version: "v3", auth });
    const blogId = process.env.BLOGGER_BLOG_ID;

    // 🔧 Inject the image into the content if provided
    let finalHtml = html;
    if (image) {
      finalHtml = `
        <div style="text-align:center; margin-bottom: 1rem;">
          <img src="${image}" alt="${title}" style="max-width:100%; height:auto;" />
        </div>
        ${html}
      `;
    }

    console.log("📝 Final HTML to Blogger:\n", finalHtml);

    const post = await blogger.posts.insert({
      blogId,
      requestBody: {
        title,
        content: finalHtml,
      },
    });

    console.log("✅ Post published New:", post.data.url);
    res.json({ url: post.data.url });
  } catch (err) {
    console.error("❌ Blogger publish failed:", err);
    res.status(500).json({ error: "Failed to publish to Blogger." });
  }
});

module.exports = router;
