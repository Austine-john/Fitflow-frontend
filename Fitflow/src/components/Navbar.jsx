import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, Dumbbell, TrendingUp, User, LogOut, Activity } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
    const { user, logout } = useAuth()
    const location = useLocation()

    const navItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/workouts', icon: <Dumbbell size={20} />, label: 'Workouts' },
        { path: '/progress', icon: <TrendingUp size={20} />, label: 'Progress' },
        { path: '/profile', icon: <User size={20} />, label: 'Profile' }
    ]

    return (
        <nav className="navbar">
            <div className="navbar-header">
                <div className="navbar-brand">
                    <span className="brand-icon"><Activity size={28} /></span>
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
                    <span className="nav-icon"><LogOut size={20} /></span>
                    <span className="nav-label">Log Out</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
