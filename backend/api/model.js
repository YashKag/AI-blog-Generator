const express = require('express');
const router = express.Router();
const { MODEL, OLLAMA_URL } = require('../config');

// Developers who worked on /api/model
const developers = [
  {
    name: "Kartikey Septa",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    contribution: "API Architecture & Model Integration",
    github: "https://github.com/alexjohnson"
  },
  {
    name: "Manish Panwar",
    role: "Full Stack Developer", 
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c7c1?w=200&h=200&fit=crop&crop=face",
    contribution: "Endpoint Configuration & Testing",
    github: "https://github.com/sarahchen"
  },
  {
    name: "Abhishek Pawar",
    role: "DevOps Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    contribution: "Deployment & Model Optimization",
    github: "https://github.com/mikerodriguez"
  }
];

// Original JSON API endpoint
router.get('/', (req, res) => {
  res.json({
    model: MODEL,
    endpoint: OLLAMA_URL,
    developers: developers
  });
});

// HTML page showing developers
router.get('/developers', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Model Developers</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            
            .header {
                background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
                color: white;
                padding: 40px;
                text-align: center;
            }
            
            .header h1 {
                font-size: 2.5em;
                margin-bottom: 10px;
                font-weight: 300;
            }
            
            .header p {
                font-size: 1.2em;
                opacity: 0.9;
            }
            
            .api-info {
                background: #f8f9fa;
                padding: 20px 40px;
                border-bottom: 1px solid #e9ecef;
            }
            
            .api-info h3 {
                color: #2c3e50;
                margin-bottom: 10px;
            }
            
            .api-details {
                display: flex;
                gap: 30px;
                flex-wrap: wrap;
            }
            
            .api-detail {
                background: white;
                padding: 15px 20px;
                border-radius: 10px;
                border-left: 4px solid #3498db;
                flex: 1;
                min-width: 200px;
            }
            
            .api-detail strong {
                color: #2c3e50;
            }
            
            .developers-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 30px;
                padding: 40px;
            }
            
            .developer-card {
                background: white;
                border-radius: 15px;
                padding: 30px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                border: 1px solid #e9ecef;
            }
            
            .developer-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            }
            
            .developer-image {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                margin: 0 auto 20px;
                object-fit: cover;
                border: 4px solid #3498db;
            }
            
            .developer-name {
                font-size: 1.4em;
                font-weight: 600;
                color: #2c3e50;
                margin-bottom: 5px;
            }
            
            .developer-role {
                color: #3498db;
                font-weight: 500;
                margin-bottom: 15px;
                font-size: 1.1em;
            }
            
            .developer-contribution {
                color: #666;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            
            .github-link {
                display: inline-block;
                background: #333;
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 500;
                transition: background 0.3s ease;
            }
            
            .github-link:hover {
                background: #555;
            }
            
            .footer {
                background: #2c3e50;
                color: white;
                padding: 30px;
                text-align: center;
            }
            
            @media (max-width: 768px) {
                .developers-grid {
                    grid-template-columns: 1fr;
                    padding: 20px;
                }
                
                .api-details {
                    flex-direction: column;
                }
                
                .header {
                    padding: 20px;
                }
                
                .header h1 {
                    font-size: 2em;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 API Model Development Team</h1>
                <p>Meet the talented developers behind /api/model</p>
            </div>
            
            <div class="api-info">
                <h3>API Information</h3>
                <div class="api-details">
                    <div class="api-detail">
                        <strong>Model:</strong> ${MODEL}
                    </div>
                    <div class="api-detail">
                        <strong>Endpoint:</strong> ${OLLAMA_URL}
                    </div>
                    <div class="api-detail">
                        <strong>Team Size:</strong> ${developers.length} Developers
                    </div>
                </div>
            </div>
            
            <div class="developers-grid">
                ${developers.map(dev => `
                    <div class="developer-card">
                        <img src="${dev.image}" alt="${dev.name}" class="developer-image">
                        <div class="developer-name">${dev.name}</div>
                        <div class="developer-role">${dev.role}</div>
                        <div class="developer-contribution">${dev.contribution}</div>
                        <a href="${dev.github}" class="github-link" target="_blank">View GitHub</a>
                    </div>
                `).join('')}
            </div>
            
            <div class="footer">
                <p>© 2025 API Model Development Team | Built with ❤️ for awesome APIs</p>
            </div>
        </div>
    </body>
    </html>
  `;
  
  res.send(html);
});

module.exports = router;