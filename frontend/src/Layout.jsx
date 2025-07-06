// src/components/Layout.jsx
import { Outlet, Link } from "react-router-dom"

const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Reddit-style Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center h-12 px-4">
            {/* Logo */}
            <div className="flex items-center gap-2 mr-8">
              <Link to="/" className="font-bold text-lg">Sārathi</Link>
            </div>
            {/* Navigation */}
            <nav className="flex items-center gap-6 text-sm">
              <Link to="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link to="/bug-report" className="text-gray-600 hover:text-blue-600">
                BugReport
              </Link>
              <Link to="/founder" className="text-gray-600 hover:text-blue-600">
                Kartikey
              </Link>
              <Link to="/help-faq" className="text-gray-600 hover:text-blue-600">
                HelpFAQ
              </Link>
            </nav>
            {/* User actions */}
            <div className="ml-auto flex items-center gap-4 text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Login
              </a>
              <a href="#" className="text-blue-600 hover:underline">
                Register
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet /> {/* This is where page content will be rendered */}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-300 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>© 2025 Sārathi</span>
              <Link to="/help-faq" className="hover:text-blue-600">
                help
              </Link>
              <a href="#" className="hover:text-blue-600">
                privacy
              </a>
              <a href="#" className="hover:text-blue-600">
                terms
              </a>
              <a href="#" className="hover:text-blue-600">
                advertise
              </a>
            </div>
            <div className="text-gray-400">powered by OLLAMA • Reddit API • RSS feeds</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout