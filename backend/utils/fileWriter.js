
const fs = require('fs');
const path = require('path');
const open = require('open'); // open the file in browser

function saveToFile(title, content, saveTxtToo = false) {
  // 1. Sanitize title for file
  const cleanTitle = title
    .replace(/[^\w\s-]/g, '')     // remove invalid characters
    .replace(/\s+/g, '_')         // spaces to underscores
    .slice(0, 80);                // truncate to 80 chars

  // 2. Add date prefix
  const datePrefix = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const filenameBase = `${datePrefix}_${cleanTitle || 'blog_post'}`;

  // 3. Paths
  const htmlPath = path.join(__dirname, '../outputs', `${filenameBase}.html`);
  const txtPath = path.join(__dirname, '../outputs', `${filenameBase}.md`);

  try {
    // 4. Save HTML
    fs.writeFileSync(htmlPath, content, 'utf-8');
    console.log(`✅ Saved HTML to outputs/${filenameBase}.html`);

  } catch (err) {
    console.error('❌ Error saving file:', err.message);
  }
}

module.exports = { saveToFile };
