  const express = require('express');
  const cors = require('cors');
  const app = express();
  const { startAutoPosting } = require('./utils/scheduler');
  const rssRoute = require('./api/rss');


  require('dotenv').config();

  startAutoPosting();

  //CORS 

  app.use(cors({
    origin: 'http://192.168.1.2:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true
  }));

  app.use('/api/model', require('./api/model'));

  app.use(express.json());
  app.use("/api/stats", require("./api/stats"));
  app.use('/api/rss', rssRoute);
  app.use('/api/topics', require('./api/topics'));
  app.use('/api/generate', require('./api/generate'));
  app.use('/api/publish', require('./api/publish'));
  app.use('/api/seo-title', require('./api/seoTitle')); 

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ API running at http://192.168.1.2:${PORT}`);
  });
  

  app.get('/', (req, res) => {
    res.send('API is working!');
  });
