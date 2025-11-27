import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Workouts from './pages/Workouts'
import Progress from './pages/Progress'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    const { user } = useAuth()

    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />

            <Route path="/workouts" element={
                <ProtectedRoute>
                    <Workouts />
                </ProtectedRoute>
            } />

            <Route path="/progress" element={
                <ProtectedRoute>
                    <Progress />
                </ProtectedRoute>
            } />

            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />

            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
    )
}

export default App
