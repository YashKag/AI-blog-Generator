// routes/image.js
const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY

router.get('/', async (req, res) => {
  const query = req.query.q
  if (!query) return res.status(400).json({ error: 'Missing search query' })

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&client_id=${UNSPLASH_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    const images = data.results.map(img => ({
      url: img.urls.small,
      alt: img.alt_description || query,
      photographer: img.user.name,
      link: img.links.html,
    }))

    res.json(images)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Unsplash images' })
  }
})

module.exports = router
