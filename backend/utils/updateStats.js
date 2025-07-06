const fs = require("fs");
const path = require("path");

const statsPath = path.join(__dirname, "../data/stats.json");

function updateStats({ title, html, images }) {
  const statsData = JSON.parse(fs.readFileSync(statsPath, "utf-8"));

  statsData.stats.postsGenerated += 1;
  statsData.stats.wordsCreated += html.split(" ").length;
  statsData.stats.imagesFound += images?.length || 0;

  statsData.recentPosts.unshift({
    title,
    timestamp: Date.now(),
    votes: Math.floor(Math.random() * 1000) + 100, // Simulate Reddit votes
    author: "AIbot"
  });

  // Only keep last 10
  statsData.recentPosts = statsData.recentPosts.slice(0, 10);

  fs.writeFileSync(statsPath, JSON.stringify(statsData, null, 2));
}

module.exports = { updateStats };
