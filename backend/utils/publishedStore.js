const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../data/published.json");

function loadPublished() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8");
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("⚠️ Failed to read published.json:", err.message);
    return [];
  }
}

function savePublished(titles) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(titles, null, 2));
  } catch (err) {
    console.error("❌ Failed to write to published.json:", err.message);
  }
}

function isAlreadyPublished(title) {
  const all = loadPublished();
  return all.includes(title);
}

function markAsPublished(title) {
  const all = loadPublished();
  if (!all.includes(title)) {
    all.push(title);
    savePublished(all);
  }
}

module.exports = {
  isAlreadyPublished,
  markAsPublished,
};
