// backend/routes/stats.js
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const postsToday = await Post.find({ createdAt: { $gte: today } });

  const postCount = postsToday.length;
  const wordCount = postsToday.reduce((sum, post) => sum + post.wordCount, 0);

  const pipeline = postsToday.map((post) => ({
    title: post.title,
    status: post.status,
    progress: post.status === "published" ? "100%" : "80%",
    color: post.status === "published" ? "bg-green-500" : "bg-yellow-500",
  }));

  res.json({ postCount, wordCount, pipeline });
});

module.exports = router;
