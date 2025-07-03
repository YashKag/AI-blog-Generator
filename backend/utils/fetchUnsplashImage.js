const axios = require('axios');

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function getImageForPrompt(prompt) {
  try {
    const res = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        query: prompt,
        orientation: 'landscape',
        content_filter: 'high',
        count: 1,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    // If count=1, response is an array
    const image = Array.isArray(res.data) ? res.data[0] : res.data;

    return {
        url: image.urls?.regular,
        alt: image.alt_description || prompt,
      photographer: image.user?.name,
      link: image.links?.html,
    };
  } catch (err) {
    console.error('❌ Unsplash fetch error:', err.message);
    return null;
  }
}

module.exports = { getImageForPrompt };


