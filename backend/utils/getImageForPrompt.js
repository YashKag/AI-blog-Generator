const axios = require("axios");

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// 🧼 Sanitize prompt to match Unsplash real photography content
function sanitizeForUnsplash(prompt = "") {
  return prompt
    .replace(/(anime|manga|drawing|illustration|game|persona|phantom|cartoon|sketch|art|render)/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

async function getImagesForPrompt(prompt) {
  try {
    const cleanedPrompt = sanitizeForUnsplash(prompt);

    if (!cleanedPrompt) {
      console.warn("⚠️ No valid prompt for Unsplash image search.");
      return [];
    }

    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: cleanedPrompt,
        per_page: 5,
        orientation: "landscape",
        content_filter: "high",
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const images = res.data.results.map((img) => ({
      url: img.urls?.regular,
      alt: img.alt_description || "Related image",
      link: img.links?.html || img.urls?.regular,
    }));

    return images;
  } catch (err) {
    console.error("🛑 Error fetching Unsplash images:", err.message);
    return [];
  }
}

module.exports = { getImagesForPrompt };
