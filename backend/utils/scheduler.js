const cron = require("node-cron");
const axios = require("axios");
const { isAlreadyPublished, markAsPublished } = require("./publishedStore");

const API_BASE = "http://localhost:5000";

// 🔁 Reddit post scheduler
function scheduleRedditPost(cronTime) {
  cron.schedule(cronTime, async () => {
    console.log(`⏰ [Reddit @ ${cronTime}] Auto-post triggered...`);

    try {
      const redditRes = await axios.get(`${API_BASE}/api/topics?subreddit=games`);
      const redditTopics = redditRes.data;

      if (!Array.isArray(redditTopics) || redditTopics.length === 0) {
        return console.log("⚠️ [Reddit] No topics found.");
      }

      const random = redditTopics[Math.floor(Math.random() * redditTopics.length)];
      console.log("🎯 [Reddit] Selected topic:", random.title);

      if (isAlreadyPublished(random.title)) {
        console.log("⛔ [Reddit] Already published:", random.title);
        return;
      }

      const genRes = await axios.post(`${API_BASE}/api/generate`, {
        title: random.title,
        postContent: random.postContent,
        comments: random.topComments,
      });

      const genData = genRes.data;
      if (!genData.html) return console.log("❌ [Reddit] Failed to generate blog.");

      const firstImageUrl = genData.images?.[0]?.url;

      const pubRes = await axios.post(`${API_BASE}/api/publish`, {
        title: genData.title,
        html: genData.html,
        image: firstImageUrl,
      });

      console.log("✅ [Reddit] Published:", pubRes.data.url);
      markAsPublished(genData.title);

    } catch (err) {
      console.error("❌ [Reddit] Error:", err.message || err);
    }
  });
}

// 🔁 RSS post scheduler
function scheduleRSSPost(cronTime) {
  cron.schedule(cronTime, async () => {
    console.log(`⏰ [RSS @ ${cronTime}] Auto-post triggered...`);

    try {
      const rssRes = await axios.get(`${API_BASE}/api/rss`);
      const rssItems = rssRes.data;

      if (!Array.isArray(rssItems) || rssItems.length === 0) {
        return console.log("⚠️ [RSS] No items found.");
      }

      const random = rssItems[Math.floor(Math.random() * rssItems.length)];
      console.log("🎯 [RSS] Selected item:", random.title);

      if (isAlreadyPublished(random.title)) {
        console.log("⛔ [RSS] Already published:", random.title);
        return;
      }

      const genRes = await axios.post(`${API_BASE}/api/generate`, {
        title: random.title,
        postContent: random.content || random.summary || "",
        comments: [],
      });

      const genData = genRes.data;
      if (!genData.html) return console.log("❌ [RSS] Failed to generate blog.");

      const firstImageUrl = genData.images?.[0]?.url;

      const pubRes = await axios.post(`${API_BASE}/api/publish`, {
        title: genData.title,
        html: genData.html,
        image: firstImageUrl,
      });

      console.log("✅ [RSS] Published:", pubRes.data.url);
      markAsPublished(genData.title);

    } catch (err) {
      console.error("❌ [RSS] Error:", err.message || err);
    }
  });
}

// 🧠 Start all 6 scheduled tasks
function startAutoPosting() {
  // Reddit posts at 00:00, 12:00, 18:00
  scheduleRedditPost("0 0 * * *");
  scheduleRedditPost("0 12 * * *");
  scheduleRedditPost("0 18 * * *");

  // RSS posts at 00:30, 12:30, 18:30
  scheduleRSSPost("30 0 * * *");
  scheduleRSSPost("30 12 * * *");
  scheduleRSSPost("30 18 * * *");
}

module.exports = { startAutoPosting };
