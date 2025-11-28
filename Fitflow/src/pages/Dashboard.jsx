import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Dumbbell, Clock, Flame, Trophy, Activity } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { workoutsAPI, progressAPI } from '../services/api'
import Navbar from '../components/Navbar'
import './Dashboard.css'

const Dashboard = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [stats, setStats] = useState({
        workoutsThisWeek: 0,
        totalTime: '0h 0m',
        caloriesBurned: 0,
        personalRecords: 0
    })
    const [recentWorkouts, setRecentWorkouts] = useState([])
    const [chartData, setChartData] = useState([])
    const [chartMetric, setChartMetric] = useState('weight')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboardData()

        // Reload data when user returns to this page
        const handleFocus = () => {
            loadDashboardData()
        }

        window.addEventListener('focus', handleFocus)
        return () => window.removeEventListener('focus', handleFocus)
    }, [location])  // Re-run when location changes (navigating back to dashboard)

    const loadDashboardData = async () => {
        try {
            const [workoutsData, progressData] = await Promise.all([
                workoutsAPI.getAll(),
                progressAPI.getAll()
            ])

            // Calculate stats
            const now = new Date()
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

            const workoutsThisWeek = workoutsData.filter(w =>
                new Date(w.date) >= weekAgo
            ).length

            const totalMinutes = workoutsData.reduce((sum, w) => sum + (w.duration || 0), 0)
            const hours = Math.floor(totalMinutes / 60)
            const minutes = totalMinutes % 60

            const caloriesBurned = workoutsData.reduce((sum, w) => sum + (w.calories_burned || 0), 0)

            setStats({
                workoutsThisWeek,
                totalTime: `${hours}h ${minutes} m`,
                caloriesBurned,
                personalRecords: progressData.filter(p => p.isRecord).length || 1
            })

            // Set recent workouts
            setRecentWorkouts(workoutsData.slice(0, 4))

            // Prepare chart data
            const chartPoints = progressData
                .sort((a, b) => new Date(a.log_date) - new Date(b.log_date))
                .slice(-10)
                .map(p => ({
                    date: new Date(p.log_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    weight: p.weight || 0,
                    duration: p.duration || 0,
                    calories: p.calories || 0
                }))

            setChartData(chartPoints)
        } catch (error) {
            console.error('Failed to load dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (date.toDateString() === today.toDateString()) {
            return 'Today'
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday'
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }
    }

    if (loading) {
        return (
            <div className="page-container">
                <Navbar />
                <div className="main-content">
                    <div className="loading">Loading dashboard...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="page-container">
            <Navbar />
            <div className="main-content">
                <div className="dashboard">
                    <div className="dashboard-header">
                        <div>
                            <h1>Welcome back, {user?.username || 'User'}!</h1>
                            <p className="text-secondary">
                                Today is {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <button className="btn btn-primary" onClick={() => navigate('/workouts')}>
                            Start New Workout
                        </button>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon-wrapper">
                                <Dumbbell size={24} color="#4a90e2" />
                            </div>
                            <div>
                                <h3>Workouts This Week</h3>
                                <p className="stat-value">{stats.workoutsThisWeek}</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon-wrapper">
                                <Clock size={24} color="#f5a623" />
                            </div>
                            <div>
                                <h3>Total Time</h3>
                                <p className="stat-value">{stats.totalTime}</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon-wrapper">
                                <Flame size={24} color="#e05435" />
                            </div>
                            <div>
                                <h3>Calories Burned</h3>
                                <p className="stat-value">{stats.caloriesBurned.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="stat-card highlight">
                            <div className="stat-icon-wrapper">
                                <Trophy size={24} color="#f8e71c" />
                            </div>
                            <div>
                                <h3>Personal Records</h3>
                                <p className="stat-value stat-highlight">{stats.personalRecords} New PR</p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <div className="workout-history-card">
                            <div className="card-header">
                                <h2>Workout History</h2>
                                <button className="link-btn" onClick={() => navigate('/workouts')}>
                                    View All
                                </button>
                            </div>
                            <div className="workout-list">
                                {recentWorkouts.length > 0 ? (
                                    recentWorkouts.map((workout, index) => (
                                        <div key={workout.id || index} className="workout-item">
                                            <div className="workout-icon">
                                                <Activity size={20} />
                                            </div>
                                            <div className="workout-details">
                                                <h4>{workout.name}</h4>
                                                <p>{workout.duration} min • {workout.calories_burned} kcal</p>
                                            </div>
                                            <div className="workout-date">
                                                {formatDate(workout.date)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="empty-state">No workouts yet. Start your first workout!</p>
                                )}
                            </div>
                        </div>

                        <div className="progress-chart-card">
                            <div className="card-header">
                                <h2>Progress Chart</h2>
                                <div className="chart-tabs">
                                    <button
                                        className={`tab - btn ${chartMetric === 'weight' ? 'active' : ''} `}
                                        onClick={() => setChartMetric('weight')}
                                    >
                                        Weight
                                    </button>
                                    <button
                                        className={`tab - btn ${chartMetric === 'duration' ? 'active' : ''} `}
                                        onClick={() => setChartMetric('duration')}
                                    >
                                        Duration
                                    </button>
                                    <button
                                        className={`tab - btn ${chartMetric === 'calories' ? 'active' : ''} `}
                                        onClick={() => setChartMetric('calories')}
                                    >
                                        Calories
                                    </button>
                                </div>
                            </div>
                            <div className="chart-container">
                                {chartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                                            <XAxis
                                                dataKey="date"
                                                stroke="#8892a6"
                                                style={{ fontSize: '0.875rem' }}
                                            />
                                            <YAxis
                                                stroke="#8892a6"
                                                style={{ fontSize: '0.875rem' }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    background: '#2d3548',
                                                    border: '1px solid #4a5568',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey={chartMetric}
                                                stroke="#4a90e2"
                                                strokeWidth={3}
                                                dot={{ fill: '#4a90e2', r: 5 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="empty-chart">
                                        <p>No progress data yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
