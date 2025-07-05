"use client"

import { useState,useEffect } from "react"

const Dashboard = () => {
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState([])
  const [subreddit, setSubreddit] = useState("technology")
  const [postContent, setPostContent] = useState("")
  const [summary, setSummary] = useState([])
  const [comments, setComments] = useState("")
  const [images, setImages] = useState([])

  
  const [rssArticles, setRssArticles] = useState([])

  const apiBase = import.meta.env.VITE_API_URL



  const fetchTopics = async () => {
    try {


      const res = await fetch(`${apiBase}/api/topics?subreddit=${subreddit}`)
      const data = await res.json()
  
      // ✅ Make sure it's always an array
      setTopics(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("❌ Failed to load Reddit topics:", err)
      setTopics([]) // ✅ fallback
    }
  }
  



  const fetchImages = async (query) => {
    try {
      const res = await fetch(`${apiBase}/api/image?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setImages(data)
    } catch (err) {
      console.error("❌ Unsplash image fetch failed:", err)
    }
  }

  useEffect(() => {
    fetchRss()
  }, [])

  const fetchRss = async () => {
    try {
      const res = await fetch(`${apiBase}/api/rss`)
      const data = await res.json()
      console.log("datarss",data)
      setRssArticles(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("❌ RSS fetch failed:", err)
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

    console.log("Generation Data:", {
      title,
      summary: summary || "NO SUMMARY",
      postContent: postContent ? `${postContent.substring(0, 50)}...` : "NO CONTENT",
      comments: comments ? `${comments.substring(0, 50)}...` : "NO COMMENTS"
    });
  }

  const handleGenerate = async () => {
    if (!title) {
      alert("⚠️ Please enter a title.")
      return
    }
  
    // Try to find selected topic from dropdown
    const selectedTopic = topics.find(t => t.title === title)
  
    // If not found, treat it as a custom prompt with minimal context
    const finalPostContent = selectedTopic?.postContent || postContent
    const finalComments = selectedTopic?.topComments || comments
  
    setLoading(true)
    setOutput("")
  
    try {
      console.log("🚀 Sending request to:", `${apiBase}/api/generate`)
      const res = await fetch(`${apiBase}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          postContent: finalPostContent,
          comments: finalComments,
          customPrompt: prompt,
          summary: summary,

         
        })
      })
     

      const data = await res.json()
      console.log("✅ Response received:", data)
    
      if (!res.ok) {
        throw new Error(data.error || "Unknown error")
      }
    
      setOutput(data.html || "⚠️ No content generated.")
      fetchImages(data.title || title) 
      setTitle(data.title || title)
      
      
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
      {/* Optimized Background Effects */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-0 w-72 h-72 bg-gradient-to-bl from-blue-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-tr from-orange-500/15 via-yellow-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Compact Header */}
      <div className="relative z-10 flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <span className="text-white font-semibold">AI Blogger</span>
        </div>
        <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm">
          Join Beta
        </button>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section - More Compact */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Your daily list of
            <br />
            <span className="text-gray-400">fresh AI content</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            AI Blogger is an agent that <span className="text-white font-medium">generates blog content</span> for you.
            So you can focus on doing great work.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left Column - Main Controls */}
          <div className="space-y-6">
            {/* Primary Input */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Generate Content</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 h-12 px-4 rounded-lg"
                />
                <button
                  onClick={handleGenerate}
                  disabled={loading || !title}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white h-12 px-8 rounded-lg transition-colors font-medium"
                >
                  {loading ? "Generating..." : "Generate Content"}
                </button>
              </div>
            </div>

            {/* Reddit Integration */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-1.25 1.25 1.25 1.25 0 0 1-1.25-1.25 1.25 1.25 0 0 1 1.25-1.249zm1.259 10.09c-.329 1.29-1.703 2.233-3.055 2.233-1.739 0-3.14-1.401-3.14-3.14 0-1.739 1.401-3.14 3.14-3.14 1.353 0 2.727.943 3.055 2.233.329-1.29 1.703-2.233 3.055-2.233 1.739 0 3.14 1.401 3.14 3.14 0 1.739-1.401 3.14-3.14 3.14-1.353 0-2.727-.943-3.055-2.233z" />
                </svg>
                Reddit Topics
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Subreddit (e.g. technology)"
                    value={subreddit}
                    onChange={(e) => setSubreddit(e.target.value)}
                    className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 px-4 py-2 rounded-lg"
                  />
                  <button
                    onClick={fetchTopics}
                    className="bg-orange-600/20 backdrop-blur-sm border border-orange-500/30 text-orange-300 hover:bg-orange-600/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    Load
                  </button>
                </div>

                {images.length > 0 && (
  <div className="flex gap-4 mb-6 overflow-auto">
    {images.map((img, i) => (
      <a key={i} href={img.link} target="_blank" rel="noopener noreferrer">
        <img
          src={img.url}
          alt={img.alt}
          className="rounded-lg w-48 h-32 object-cover border border-white/10"
        />
      </a>
    ))}
  </div>
)}
                
                {topics.length > 0 && (
                 <select
                 onChange={(e) => {
                   const selectedIndex = parseInt(e.target.value)
                   const topic = topics[selectedIndex]
                   if (topic) {
                     setTitle(topic.title)
                     setPostContent(topic.postContent || "")
                     setComments(Array.isArray(topic.topComments) ? topic.topComments.join("\n") : "")
                     setSummary('')
                   }
                 }}
                 className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg"
               >
                 <option value="">Select a Reddit title</option>
                 {topics.map((t, i) => (
                   <option key={i} value={i} className="bg-gray-900 text-white">
                     {t.title}
                   </option>
                 ))}
               </select>
                
                )}
              </div>
            </div>

{/* RSS FEED */}
<select
  onChange={(e) => {
    const index = parseInt(e.target.value);
    const article = rssArticles[index];
    if (article) {
      setTitle(article.title);
      setPostContent(article.content || ""); 
      setSummary(article.description || ""); 
      setComments("");
      fetchImages(article.title);
    }
  }}
  className="w-full bg-black/10 text-white px-4 py-2 rounded-lg"
>
  <option value="">Select RSS title</option>
  {rssArticles.map((item, i) => (
    <option key={i} value={i}>{item.title}</option>
  ))}
</select>


            {/* Advanced Options */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Advanced Options</h3>
              <div className="space-y-3">
                <textarea
                  placeholder="Custom prompt (optional)"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
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
          </div>

          {/* Right Column - Dashboard Widget */}
          <div className="space-y-6">
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
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
                  <h3 className="text-white font-semibold">Content Pipeline</h3>
                  <p className="text-gray-400 text-sm">{mockStats.length} items in progress</p>
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

            {/* Stats Card */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Today's Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">12</div>
                  <div className="text-gray-400 text-sm">Posts Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">3.2k</div>
                  <div className="text-gray-400 text-sm">Words Created</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        {output && (
          <div className="mb-12">
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4">Generated Content</h3>
              <div
                className="bg-white p-6 rounded-lg prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </div>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="text-center py-12 border-t border-gray-800/50">
          <p className="text-gray-400 mb-6">
            One dashboard. <span className="text-white font-medium">All the AI content.</span>
          </p>
          <p className="text-gray-500 text-sm mb-6">First 100 sign-ups get a lifetime discount.</p>
          
          {/* Brand Logos */}
          <div className="flex items-center justify-center gap-8 opacity-40">
            <div className="text-gray-400 font-medium">OpenAI</div>
            <div className="text-gray-400 font-medium">Anthropic</div>
            <div className="text-gray-400 font-medium">Blogger</div>
            <div className="text-gray-400 font-medium">Reddit</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard