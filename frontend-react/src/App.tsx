import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminPanel from './pages/AdminPanel'
import './App.css'

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken')

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/admin" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App
