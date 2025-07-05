// backend/models/Post.js
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  wordCount: Number,
  status: { type: String, enum: ["generated", "published"], default: "generated" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
