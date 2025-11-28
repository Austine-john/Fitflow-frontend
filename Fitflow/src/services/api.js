const API_BASE_URL = 'https://fitflow-backend-a27k.onrender.com'

// Helper function to handle fetch responses
async function handleResponse(response) {
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || data.message || 'Something went wrong')
    }

    return data
}

// Helper function to get auth headers
function getAuthHeaders() {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    }
}

// Auth API
export const authAPI = {
    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        return handleResponse(response)
    },

    login: async (credentials) => {
        console.log('🔐 Attempting login with:', { username: credentials.username })
        console.log('📡 API URL:', `${API_BASE_URL}/login`)

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(credentials)
            })

            console.log('📥 Response status:', response.status)
            console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()))

            return handleResponse(response)
        } catch (error) {
            console.error('❌ Login fetch error:', error)
            throw new Error(`Network error: ${error.message}`)
        }
    },

    getCurrentUser: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    }
}


// Workouts API
export const workoutsAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/workouts`, {
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    },

    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    },

    create: async (workoutData) => {
        const response = await fetch(`${API_BASE_URL}/workouts`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(workoutData)
        })
        return handleResponse(response)
    },

    update: async (id, workoutData) => {
        const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(workoutData)
        })
        return handleResponse(response)
    },

    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    }
}

// Progress API
export const progressAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/progress_logs`, {  // FIXED: Changed from /progress
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    },

    create: async (progressData) => {
        const response = await fetch(`${API_BASE_URL}/progress_logs`, {  // FIXED: Changed from /progress
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(progressData)
        })
        return handleResponse(response)
    },

    getStats: async () => {
        const response = await fetch(`${API_BASE_URL}/progress_logs/stats`, {  // FIXED: Changed from /progress
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    }
}

// Exercises API
export const exercisesAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/exercises`, {
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    },

    create: async (exerciseData) => {
        const response = await fetch(`${API_BASE_URL}/exercises`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(exerciseData)
        })
        return handleResponse(response)
    }
}
