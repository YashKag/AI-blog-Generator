const express = require("express");
const router = express.Router();
const { generateFromOllama } = require("../utils/ollamaClient");
const { buildPrompt } = require("../utils/promptBuilder");
const { generateTitleWithOllama } = require("../utils/generateTitleWithOllama");
const { getImagesForPrompt } = require("../utils/getImageForPrompt");
const { generateVisualPrompt } = require("../utils/visualPromptGenerator");
const { updateStats } = require("../utils/updateStats");




router.post("/", async (req, res) => {
  const {
    title: fallbackTitle,
    postContent = "",
    summary = "",
    comments = "",
    customPrompt = "",
  } = req.body;

  try {


    const context = `${postContent}\n\n${Array.isArray(comments) ? comments.join("\n") : comments
      }`;

    const generatedTitle = await generateTitleWithOllama({
      title: fallbackTitle,
      postContent,
      comments: Array.isArray(comments) ? comments : [comments],
      summary: summary,
    });


    const finalTitle = generatedTitle || fallbackTitle;
    const imageSearchPrompt = await generateVisualPrompt({
      title: finalTitle,
      summary,
      content: postContent,
    });

    console.log("🔍 Image search prompt:", imageSearchPrompt);


    const images = await getImagesForPrompt(imageSearchPrompt);
    


    const prompt = buildPrompt({
      title: finalTitle,
      postContent,
      comments,
      customPrompt,
      summary,
    });
    console.log("🖼️ images:", images);

    console.log("🧠 Incoming request to /api/generate");
    console.log("👉 Original Title:", fallbackTitle);
    console.log("👉 Final SEO Title:", finalTitle);
    console.log(
      "👉 Post content:",
      postContent.slice(0, 100) + (postContent.length > 100 ? "..." : "")
    );
    console.log("👉 Top comments:", comments);
    console.log("👉 Custom prompt:", customPrompt);
    console.log("📝 Final prompt sent to Ollama:\n", prompt);

    const html = await generateFromOllama(finalTitle, prompt);

    updateStats({ title: finalTitle, html, images });
    
    res.json({
      title: finalTitle, html, images,
    });
  } catch (err) {
    console.error("❌ Generation error:", err);
    res.status(500).json({ error: "Failed to generate blog post." });
  }
});

module.exports = router;
