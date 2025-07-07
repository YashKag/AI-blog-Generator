# 🧠 Ollama Blog Writer

> AI-Powered SEO Blog Generator using Local LLM (Ollama) + Blogger API  


> ✍️ Write, save, and auto-publish fully optimized human-like blog posts — all offline.

---

## 📌 Features

- 🧠 Local AI blog generation using **Ollama** (`llama3`, `mistral`, etc.)
- 🔥 Title source options:
  - Reddit (top trending posts)
  - Google Trends
  - Custom titles
- 📝 Reddit post enrichment: grabs post body + top comments
- 💬 Custom instruction prompt per post (or default SEO prompt)
- 🧠 Flesch reading ease score ~80 + engaging tone
- 📁 Save post as `.html` (and optional `.txt`) in `outputs/`
- 🌐 One-click post to Blogger using Google OAuth2

---
# 🧠 AI Blogger Automation Tool

## 🧠 Writing Style Guidelines (Built Into Prompt)
An end-to-end AI blogging automation system that fetches topics from Reddit and RSS feeds, generates content using Ollama (LLaMA model), selects relevant images from Unsplash, and automatically publishes SEO-optimized blog posts to Blogger — all through a simple frontend dashboard.

- Conversational tone with mild emotional cues
- Use idioms, contractions, rhetorical questions
- Structure:
  - Headings: `<h2>`, `<h3>`
  - Paragraphs: `<p>`
  - Lists: `<ul>`, `<li>`
- Avoid buzzwords like "unlock", "transformative", etc.
- Vary sentence length and punctuation
- Digress naturally, like a human
- Mild redundancy and imperfection encouraged
- Logical flow and rhythm between sections
![AI Blogger Automation](./preview.png)

---

## 🛠️ Tech Stack

| Tool           | Role                                 |
|----------------|--------------------------------------|
| Node.js        | Backend runner                       |
| Ollama         | Local LLM content generation         |
| Axios          | API requests                         |
| `readline-sync`| CLI input handling                   |
| Google API     | Blogger authentication/posting       |
| `open`         | Auto-launch blog in browser          |
## 🚀 Features

---

## 📦 Folder Structure

```
ollama-blog-writer/
├── main.js
├── .env
├── credentials.json
├── /auth
│   └── googleAuth.js
├── /utils
│   ├── titleFetcher.js
│   ├── promptBuilder.js
│   ├── fileWriter.js
│   ├── bloggerPoster.js
│   └── ollamaClient.js
├── /outputs
│   └── YYYY-MM-DD_Title.html
```
- 🤖 **AI-Powered Content** — Generates full blog posts using LLaMA (via Ollama)
- 🌐 **Reddit + RSS Input** — Auto-fetches topics and headlines to generate from
- 🖼️ **Image Automation** — Adds Unsplash images using AI-generated prompts
- 📈 **Stats Dashboard** — Real-time metrics for posts, images, words, etc.
- 📅 **Auto Scheduling** — 4 blog posts daily with 30 min gap (cron jobs)
- ✍️ **SEO Titles** — Auto-generated optimized titles
- 🌍 **Frontend + Backend** — Fullstack system with Docker support

---

## ⚙️ Requirements

- Node.js `>=18`
- Ollama installed + a model pulled (e.g., `ollama run llama3`)
- Blogger API credentials JSON (`credentials.json`)
- `.env` file with the following:
## 🏗️ Tech Stack

```
BLOG_ID=YOUR_BLOG_ID
OLLAMA_URL=http://localhost:11434/api/generate
MODEL=llama3
```
| Layer       | Tech                                             |
|-------------|--------------------------------------------------|
| Backend     | Node.js, Express, Axios, Cron, Blogger API       |
| Frontend    | React + Vite + Tailwind CSS                      |
| AI Model    | [Ollama](https://ollama.com) + LLaMA3            |
| Images      | Unsplash API                                     |
| Deployment  | Docker, Docker Compose, Netlify (frontend), Ubuntu Server (backend) |

---

## 🚀 How to Run
## 🧪 Local Setup

```bash
npm install
node main.js
```
### 📦 Prerequisites

1. Choose title source (Reddit, Trends, or Custom)
2. Add optional custom prompt
3. Wait for local LLM to generate content
4. Saves post to `/outputs/`
5. Optionally auto-post to Blogger
- Node.js (v18+)
- Docker & Docker Compose
- Ollama model running locally (`ollama serve`)
- Unsplash + Blogger API keys
- Netlify or similar hosting (optional for frontend)

---

## 🧪 Example Output

File: `/outputs/2025-07-02_Trump_calls_for_deporting_US_citizens.html`
### ⚙️ Backend Setup

Includes:
- Strong opening
- `<h2>`, `<p>`, `<ul>` structure
- Emotional transitions + natural tone
- 2500+ words, SEO-optimized, human-quality

---

## 🔐 Authentication

- You must create OAuth2 credentials from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- Enable the **Blogger API**
- Place the downloaded `credentials.json` in the root directory

---

## ✅ To Do
```bash
cd backend
cp .env.example .env  # set your API keys
docker-compose up --build -d

- [ ] Add image generation from Unsplash
- [ ] Scheduled post queue (via `cron`)
- [ ] Admin dashboard to preview/edit posts before publishing
- [ ] Multi-model support (e.g., `gemma`, `mistral`, `phi`)

---
✅ Make sure Ollama is accessible at http://localhost:11434

## 📄 License

MIT — Free to use, share, and modify.
🌐 Frontend Setup

---
cd frontend
cp .env.example .env
npm install
npm run dev           # For development
npm run build          # For production

Made by Kartikey
  