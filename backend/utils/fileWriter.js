// const fs = require('fs');
// const path = require('path');

// function saveToFile(title, content) {
//     const filename = title.replace(/\s+/g, '_') + '.html';
//     const dir = path.join(__dirname, '../outputs');

//     if (!fs.existsSync(dir)) fs.mkdirSync(dir);
//     fs.writeFileSync(path.join(dir, filename), content, 'utf8');
//     console.log(`✅ Saved to outputs/${filename}`);
//   }
  
//   module.exports = { saveToFile };



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

    // 5. Optionally save plain text
    // if (saveTxtToo) {
    //   const stripped = content.replace(/<[^>]+>/g, ''); // remove HTML tags
    //   fs.writeFileSync(txtPath, stripped, 'utf-8');
    //   console.log(`📝 Also saved plain text to outputs/${filenameBase}.txt`);
    // }

    // 6. Open in browser
    // open(htmlPath);
  } catch (err) {
    console.error('❌ Error saving file:', err.message);
  }
}

module.exports = { saveToFile };
