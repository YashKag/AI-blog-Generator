
# 🧠 Ollama Blog Writer

> AI-Powered SEO Blog Generator using Local LLM (Ollama) + Blogger API  
> ✍️ Write, save, and auto-publish fully optimized human-like blog posts — all offline.



# 🧠 AI Blogger Automation Tool

An end-to-end AI blogging automation system that fetches topics from Reddit and RSS feeds, generates content using Ollama (LLaMA model), selects relevant images from Unsplash, and automatically publishes SEO-optimized blog posts to Blogger — all through a simple frontend dashboard.

![AI Blogger Automation](./preview.png)

---

## 🚀 Features

- 🤖 **AI-Powered Content** — Generates full blog posts using LLaMA (via Ollama)
- 🌐 **Reddit + RSS Input** — Auto-fetches topics and headlines to generate from
- 🖼️ **Image Automation** — Adds Unsplash images using AI-generated prompts
- 📈 **Stats Dashboard** — Real-time metrics for posts, images, words, etc.
- 📅 **Auto Scheduling** — 4 blog posts daily with 30 min gap (cron jobs)
- ✍️ **SEO Titles** — Auto-generated optimized titles
- 🌍 **Frontend + Backend** — Fullstack system with Docker support

---

## 🏗️ Tech Stack

| Layer       | Tech                                             |
|-------------|--------------------------------------------------|
| Backend     | Node.js, Express, Axios, Cron, Blogger API       |
| Frontend    | React + Vite + Tailwind CSS                      |
| AI Model    | [Ollama](https://ollama.com) + LLaMA3            |
| Images      | Unsplash API                                     |
| Deployment  | Docker, Docker Compose, Netlify (frontend), Ubuntu Server (backend) |

---

## 🧪 Local Setup

### 📦 Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- Ollama model running locally (`ollama serve`)
- Unsplash + Blogger API keys
- Netlify or similar hosting (optional for frontend)

---

### ⚙️ Backend Setup

```bash
cd backend
cp .env.example .env  # set your API keys
docker-compose up --build -d


✅ Make sure Ollama is accessible at http://localhost:11434


🌐 Frontend Setup

cd frontend
cp .env.example .env
npm install
npm run dev           # For development
npm run build          # For production

    Deployed with Netlify or use Docker static server