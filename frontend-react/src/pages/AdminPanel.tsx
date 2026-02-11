import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  username: string
  role: string
}

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Get user info from localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setUser(JSON.parse(userStr))
    }
  }, [])

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    // Redirect to login
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{user?.username}</span>
                <span className="ml-2 inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-medium">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Admin Dashboard</h2>
              <p className="text-gray-600 text-lg mb-8">
                Hello <span className="font-semibold text-indigo-600">{user?.username}</span>!
              </p>
              <p className="text-gray-500">
                This is the admin panel. More features coming soon...
              </p>

              {/* Quick Stats Placeholder */}
              <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-2xl">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm font-medium mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-indigo-600">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm font-medium mb-2">Active Sessions</h3>
                  <p className="text-3xl font-bold text-green-600">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm font-medium mb-2">System Status</h3>
                  <p className="text-3xl font-bold text-blue-600">OK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
