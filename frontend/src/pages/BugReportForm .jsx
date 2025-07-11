"use client"
import { useState } from "react"

const BugReportForm = () => {
  const [formData, setFormData] = useState({
    type: "bug",
    title: "",
    description: "",
    steps: "",
    expected: "",
    actual: "",
    priority: "medium",
    email: "",
    browser: "",
    os: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        type: "bug",
        title: "",
        description: "",
        steps: "",
        expected: "",
        actual: "",
        priority: "medium",
        email: "",
        browser: "",
        os: "",
      })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white border border-gray-300 rounded p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-green-500 text-6xl mb-4">✅</div>
            <h2 className="font-bold text-lg mb-2">Thank You!</h2>
            <p className="text-gray-600 text-sm">
              Your {formData.type === "bug" ? "bug report" : "improvement idea"} has been submitted successfully. We'll
              review it and get back to you soon.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}


      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white border border-gray-300 rounded">
          <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
            <h1 className="font-bold text-sm">Submit Bug Report or Improvement Idea</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Report Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="bug">🐛 Bug Report</option>
                  <option value="improvement">💡 Improvement Idea</option>
                  <option value="feature">✨ Feature Request</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief description of the issue or idea"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of the issue or improvement idea"
                  rows={4}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Bug-specific fields */}
              {formData.type === "bug" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Steps to Reproduce</label>
                    <textarea
                      name="steps"
                      value={formData.steps}
                      onChange={handleChange}
                      placeholder="1. Go to...&#10;2. Click on...&#10;3. See error"
                      rows={3}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expected Behavior</label>
                      <textarea
                        name="expected"
                        value={formData.expected}
                        onChange={handleChange}
                        placeholder="What should happen?"
                        rows={2}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Actual Behavior</label>
                      <textarea
                        name="actual"
                        value={formData.actual}
                        onChange={handleChange}
                        placeholder="What actually happens?"
                        rows={2}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="low">🟢 Low - Minor issue</option>
                  <option value="medium">🟡 Medium - Affects functionality</option>
                  <option value="high">🟠 High - Major issue</option>
                  <option value="critical">🔴 Critical - Blocks usage</option>
                </select>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email (optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Browser</label>
                  <input
                    type="text"
                    name="browser"
                    value={formData.browser}
                    onChange={handleChange}
                    placeholder="Chrome 120, Firefox 121, etc."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-sm font-medium"
                >
                  Submit {formData.type === "bug" ? "Bug Report" : "Idea"}
                </button>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BugReportForm
