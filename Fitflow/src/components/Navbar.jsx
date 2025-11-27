import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
    const { user, logout } = useAuth()
    const location = useLocation()

    const navItems = [
        { path: '/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/workouts', icon: '🏋️', label: 'Workouts' },
        { path: '/progress', icon: '📈', label: 'Progress' },
        { path: '/profile', icon: '👤', label: 'Profile' }
    ]

    return (
        <nav className="navbar">
            <div className="navbar-header">
                <div className="navbar-brand">
                    <span className="brand-icon">🏋️</span>
                    <div className="brand-text">
                        <h2>FitFlow</h2>
                        <p>Fitness Tracker</p>
                    </div>
                </div>
            </div>

            {user && (
                <div className="user-profile">
                    <div className="user-avatar">
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="user-info">
                        <p className="user-name">{user.username || 'User'}</p>
                        <p className="user-email">{user.email}</p>
                    </div>
                </div>
            )}

            <div className="nav-links">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                ))}
            </div>

            <div className="navbar-footer">
                <button className="nav-link logout-btn" onClick={logout}>
                    <span className="nav-icon">🚪</span>
                    <span className="nav-label">Log Out</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
