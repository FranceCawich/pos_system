import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  id: string
  username: string
  status: 'Active' | 'Inactive' | 'Banned' | 'Pending'
  role: 'Admin' | 'User' | 'Moderator' | 'Guest'
  joinedDate: string
  lastActive: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch users from your API
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Active: 'bg-green-100 text-green-800',
      Inactive: 'bg-gray-100 text-gray-800',
      Banned: 'bg-red-100 text-red-800',
      Pending: 'bg-blue-100 text-blue-800',
      Suspended: 'bg-orange-100 text-orange-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => navigate('/admin')} className="text-indigo-600 hover:text-indigo-700 mr-4">
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-indigo-600">User Management</h1>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg">
              + Add User
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800">Manage all users in one place</h2>
            <p className="text-gray-600 text-sm">Control access, assign roles, and monitor activity across your platform.</p>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200 flex gap-4">
            <input type="text" placeholder="Search" className="px-4 py-2 border border-gray-300 rounded-lg w-64" />
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Role</option>
              <option>Admin</option>
              <option>User</option>
              <option>Moderator</option>
              <option>Guest</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Banned</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
             {/*      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th> */}
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Joined Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Active</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-indigo-600">{user.username}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.joinedDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.lastActive}</td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button className="text-indigo-600 hover:text-indigo-900">✎</button>
                      <button className="text-red-600 hover:text-red-900">🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-600">140 rows</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 border border-gray-300 rounded">«</button>
              <button className="px-2 py-1 border border-gray-300 rounded">‹</button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">1</button>
              <button className="px-2 py-1 border border-gray-300 rounded">›</button>
              <button className="px-2 py-1 border border-gray-300 rounded">»</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}