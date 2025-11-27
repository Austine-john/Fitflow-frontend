import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem('token')
        if (token) {
            authAPI.getCurrentUser()
                .then(data => setUser(data.user))
                .catch(() => {
                    localStorage.removeItem('token')
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    const login = async (credentials) => {
        const data = await authAPI.login(credentials)
        localStorage.setItem('token', data.token)
        setUser(data.user)
        return data
    }

    const register = async (userData) => {
        const data = await authAPI.register(userData)
        localStorage.setItem('token', data.token)
        setUser(data.user)
        return data
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    const value = {
        user,
        loading,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
