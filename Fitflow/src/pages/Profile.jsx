import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import './Profile.css'

const Profile = () => {
    const { user, logout } = useAuth()
    const [editing, setEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        fitnessGoal: 'Build Muscle',
        height: '',
        targetWeight: '',
        activityLevel: 'Moderate'
    })

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: Update profile via API
        setEditing(false)
        alert('Profile updated successfully!')
    }

    return (
        <div className="page-container">
            <Navbar />
            <div className="main-content">
                <div className="profile-page">
                    <h1>Profile Settings</h1>

                    <div className="profile-grid">
                        <div className="profile-card">
                            <div className="profile-header">
                                <div className="profile-avatar-large">
                                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <h2>{user?.username || 'User'}</h2>
                                    <p className="text-secondary">{user?.email}</p>
                                </div>
                            </div>

                            <div className="profile-stats">
                                <div className="profile-stat">
                                    <span className="stat-icon">🏋️</span>
                                    <div>
                                        <p className="stat-label">Level</p>
                                        <p className="stat-value">15 Athlete</p>
                                    </div>
                                </div>
                                <div className="profile-stat">
                                    <span className="stat-icon">🔥</span>
                                    <div>
                                        <p className="stat-label">Streak</p>
                                        <p className="stat-value">16 days</p>
                                    </div>
                                </div>
                                <div className="profile-stat">
                                    <span className="stat-icon">🎯</span>
                                    <div>
                                        <p className="stat-label">Goal</p>
                                        <p className="stat-value">{profileData.fitnessGoal}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-form-card">
                            <div className="card-header">
                                <h2>Personal Information</h2>
                                {!editing && (
                                    <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
                                        ✏️ Edit
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="profile-form">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={profileData.username}
                                        onChange={handleChange}
                                        disabled={!editing}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleChange}
                                        disabled={!editing}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="fitnessGoal">Fitness Goal</label>
                                    <select
                                        id="fitnessGoal"
                                        name="fitnessGoal"
                                        value={profileData.fitnessGoal}
                                        onChange={handleChange}
                                        disabled={!editing}
                                    >
                                        <option value="Lose Weight">Lose Weight</option>
                                        <option value="Build Muscle">Build Muscle</option>
                                        <option value="Maintain Fitness">Maintain Fitness</option>
                                        <option value="Improve Endurance">Improve Endurance</option>
                                    </select>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="height">Height (cm)</label>
                                        <input
                                            type="number"
                                            id="height"
                                            name="height"
                                            placeholder="e.g., 175"
                                            value={profileData.height}
                                            onChange={handleChange}
                                            disabled={!editing}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="targetWeight">Target Weight (kg)</label>
                                        <input
                                            type="number"
                                            id="targetWeight"
                                            name="targetWeight"
                                            placeholder="e.g., 75"
                                            value={profileData.targetWeight}
                                            onChange={handleChange}
                                            disabled={!editing}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="activityLevel">Activity Level</label>
                                    <select
                                        id="activityLevel"
                                        name="activityLevel"
                                        value={profileData.activityLevel}
                                        onChange={handleChange}
                                        disabled={!editing}
                                    >
                                        <option value="Sedentary">Sedentary</option>
                                        <option value="Light">Light</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Active">Active</option>
                                        <option value="Very Active">Very Active</option>
                                    </select>
                                </div>

                                {editing && (
                                    <div className="form-actions">
                                        <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    <div className="danger-zone">
                        <h2>Danger Zone</h2>
                        <div className="danger-actions">
                            <div>
                                <h3>Log Out</h3>
                                <p>Sign out of your account</p>
                            </div>
                            <button className="btn btn-secondary" onClick={logout}>
                                Log Out
                            </button>
                        </div>
                        <div className="danger-actions">
                            <div>
                                <h3>Delete Account</h3>
                                <p>Permanently delete your account and all data</p>
                            </div>
                            <button className="btn-danger">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
