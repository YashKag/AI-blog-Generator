"use client"

import { useState } from "react"

const Dashboard = () => {
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState([])
  const [subreddit, setSubreddit] = useState("technology")

  const apiBase = import.meta.env.VITE_API_URL

  const fetchTopics = async () => {
    try {
      const res = await fetch(`${apiBase}/api/topics?subreddit=${subreddit}`)
      const data = await res.json()
      console.log("🧠 Reddit Topics:", data)
      setTopics(data)
    } catch (err) {
      console.error("❌ Failed to load Reddit topics:", err)
    }
  }

  const handlePost = async () => {
    if (!output || !title) {
      alert("⚠️ Missing title or content")
      return
    }

    try {
      console.log("📤 Posting to Blogger:", `${apiBase}/api/publish`)
      const res = await fetch(`${apiBase}/api/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, html: output }),
      })

      const data = await res.json()
      console.log("🌐 Publish status:", res.status)
      console.log("🌐 Publish response:", data)

      if (!res.ok) {
        throw new Error(data.error || `Status ${res.status}`)
      }

      alert(`✅ Blog posted!\n📎 URL: ${data.url}`)
    } catch (err) {
      console.error("❌ Publish error:", err)
      alert("❌ Failed to publish: " + err.message)
    }
  }

  const handleGenerate = async () => {
    if (!title) {
      alert("⚠️ Please enter a title.")
      return
    }

    setLoading(true)
    setOutput("")

    try {
      console.log("🚀 Sending request to:", `${apiBase}/api/generate`)
      const res = await fetch(`${apiBase}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          postContent: "",
          comments: "",
          customPrompt: prompt,
        }),
      })

      const data = await res.json()
      console.log("✅ Response received:", data)

      if (!res.ok) {
        throw new Error(data.error || "Unknown error")
      }

      setOutput(data.html || "⚠️ No content generated.")
    } catch (err) {
      console.error("❌ Generation Error:", err)
      setOutput(`❌ Failed to generate: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Mock data for the dashboard
  const mockStats = [
    { title: "AI Blog Post", status: "Generated", progress: "98%", color: "bg-blue-500" },
    { title: "SEO Optimization", status: "Ready to publish", progress: "92%", color: "bg-green-500" },
    { title: "Content Analysis", status: "Processing...", progress: "67%", color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gradient Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/25 via-cyan-500/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-orange-500/20 via-yellow-500/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-tl from-green-500/20 via-emerald-500/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
        </div>
        <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
          Join the beta
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your daily list of
            <br />
            <span className="text-gray-400">fresh AI content</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            AI Blogger is an agent that <span className="text-white font-medium">generates blog content</span> for you.
            So you can focus on doing great work, not writing for it.
          </p>

          {/* Input Section */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 h-12 px-4 rounded-lg flex-1"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !title}
              className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white h-12 px-8 rounded-lg transition-colors"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
          <p className="text-gray-500 text-sm">First 100 sign-ups get a lifetime discount.</p>
        </div>

        {/* Dashboard Widget */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 w-full max-w-md mb-16 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Generating content</h3>
              <p className="text-gray-400 text-sm">{mockStats.length} posts found today</p>
            </div>
          </div>

          <div className="space-y-3">
            {mockStats.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className={`p-2 ${item.color}/20 rounded-lg`}>
                  <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.title}</p>
                  <p className="text-gray-400 text-xs">{item.status}</p>
                </div>
                <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded text-xs">
                  {item.progress}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Controls */}
        <div className="w-full max-w-2xl space-y-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter subreddit (e.g. ai, webdev)"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 px-4 py-2 rounded-lg"
              />
              <button
                onClick={fetchTopics}
                className="w-full bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-1.25 1.25 1.25 1.25 0 0 1-1.25-1.25 1.25 1.25 0 0 1 1.25-1.249zm1.259 10.09c-.329 1.29-1.703 2.233-3.055 2.233-1.739 0-3.14-1.401-3.14-3.14 0-1.739 1.401-3.14 3.14-3.14 1.353 0 2.727.943 3.055 2.233.329-1.29 1.703-2.233 3.055-2.233 1.739 0 3.14 1.401 3.14 3.14 0 1.739-1.401 3.14-3.14 3.14-1.353 0-2.727-.943-3.055-2.233z" />
                </svg>
                Load Reddit Titles
              </button>
            </div>

            <div className="space-y-2">
              <textarea
                placeholder="Custom prompt (optional)"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={2}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 px-4 py-2 rounded-lg resize-none"
              />
              <button
                onClick={handlePost}
                disabled={!output}
                className="w-full bg-green-600/20 backdrop-blur-sm border border-green-500/30 text-green-300 hover:bg-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                  />
                </svg>
                Publish to Blogger
              </button>
            </div>
          </div>

          {topics.length > 0 && (
            <select
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg"
            >
              <option value="">Select a Reddit title</option>
              {topics.map((t, i) => (
                <option key={i} value={t.title} className="bg-gray-900 text-white">
                  {t.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-gray-400 mb-8">
            One dashboard. <span className="text-white">All the AI content.</span>
          </p>

          {/* Brand Logos */}
          <div className="flex items-center justify-center gap-12 opacity-60">
            <div className="text-gray-400 font-semibold text-lg">OpenAI</div>
            <div className="text-gray-400 font-semibold text-lg">Anthropic</div>
            <div className="text-gray-400 font-semibold text-lg">Blogger</div>
            <div className="text-gray-400 font-semibold text-lg">Reddit</div>
          </div>
        </div>
      </div>

      {/* Output Section */}
      {output && (
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16">
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h3 className="text-white text-xl font-semibold mb-6">Generated Content</h3>
            <div
              className="bg-white p-6 rounded-lg prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          </div>
        </div>
      )}

      {/* Problem Section */}
      <div className="relative z-10 text-center py-20 px-6">
        <p className="text-gray-500 text-sm mb-4">The problem</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Being great{" "}
          <span className="text-gray-400">
            at what
            <br />
            you do
          </span>{" "}
          isn't enough
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          You're not alone. <span className="text-white font-medium">66% of content creators</span> say content
          generation is their #1 problem.
        </p>

        {/* Illustration placeholder */}
        <div className="max-w-lg mx-auto">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
            <div className="space-y-4">
              <div className="text-left">
                <h4 className="text-white font-semibold mb-2">Content is scattered</h4>
                <p className="text-gray-400 text-sm">
                  Social media posts, blog articles, Reddit discussions — you're wasting hours just{" "}
                  <span className="text-orange-400">finding</span> potential topics.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="h-8 bg-red-500/30 rounded"></div>
                <div className="h-8 bg-orange-500/30 rounded"></div>
                <div className="h-8 bg-red-500/30 rounded"></div>
                <div className="h-8 bg-orange-500/30 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
