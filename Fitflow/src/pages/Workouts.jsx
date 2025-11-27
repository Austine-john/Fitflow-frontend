import { useState, useEffect } from 'react'
import { workoutsAPI } from '../services/api'
import Navbar from '../components/Navbar'
import './Workouts.css'

const Workouts = () => {
    const [workouts, setWorkouts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        date: new Date().toISOString().split('T')[0],
        duration: 60,
        calories: '',
        exercises: [{ name: 'Bench Press', sets: 3, reps: 8, weight: 80 }]
    })

    useEffect(() => {
        loadWorkouts()
    }, [])

    const loadWorkouts = async () => {
        try {
            const data = await workoutsAPI.getAll()
            setWorkouts(data)
        } catch (error) {
            console.error('Failed to load workouts:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleExerciseChange = (index, field, value) => {
        const newExercises = [...formData.exercises]
        newExercises[index][field] = value
        setFormData({ ...formData, exercises: newExercises })
    }

    const addExercise = () => {
        setFormData({
            ...formData,
            exercises: [...formData.exercises, { name: 'Pull Ups', sets: 4, reps: 12, weight: 15 }]
        })
    }

    const removeExercise = (index) => {
        const newExercises = formData.exercises.filter((_, i) => i !== index)
        setFormData({ ...formData, exercises: newExercises })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await workoutsAPI.create(formData)
            setShowForm(false)
            setFormData({
                name: '',
                date: new Date().toISOString().split('T')[0],
                duration: 60,
                calories: '',
                exercises: [{ name: 'Bench Press', sets: 3, reps: 8, weight: 80 }]
            })
            loadWorkouts()
        } catch (error) {
            console.error('Failed to create workout:', error)
            alert('Failed to create workout: ' + error.message)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this workout?')) return

        try {
            await workoutsAPI.delete(id)
            loadWorkouts()
        } catch (error) {
            console.error('Failed to delete workout:', error)
            alert('Failed to delete workout')
        }
    }

    return (
        <div className="page-container">
            <Navbar />
            <div className="main-content">
                <div className="workouts-page">
                    <div className="page-header">
                        <h1>Workout History</h1>
                        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Cancel' : 'Create New Workout'}
                        </button>
                    </div>

                    {showForm && (
                        <div className="workout-form-card">
                            <h2>Log a New Workout</h2>
                            <form onSubmit={handleSubmit} className="workout-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Workout Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="e.g., Morning Cardio"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="duration">Duration (15-120 min)</label>
                                        <input
                                            type="range"
                                            id="duration"
                                            name="duration"
                                            min="15"
                                            max="120"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                        />
                                        <span className="range-value">{formData.duration} min</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="calories">Calories Burned</label>
                                        <input
                                            type="number"
                                            id="calories"
                                            name="calories"
                                            placeholder="e.g., 350"
                                            value={formData.calories}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="exercises-section">
                                    <div className="exercises-header">
                                        <h3>Exercises</h3>
                                        <button type="button" className="btn btn-success btn-sm" onClick={addExercise}>
                                            + Add Exercise
                                        </button>
                                    </div>

                                    {formData.exercises.map((exercise, index) => (
                                        <div key={index} className="exercise-row">
                                            <div className="form-group">
                                                <label>Exercise Name</label>
                                                <select
                                                    value={exercise.name}
                                                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                                >
                                                    <option value="Bench Press">Bench Press</option>
                                                    <option value="Pull Ups">Pull Ups</option>
                                                    <option value="Squats">Squats</option>
                                                    <option value="Deadlift">Deadlift</option>
                                                    <option value="Shoulder Press">Shoulder Press</option>
                                                    <option value="Bicep Curls">Bicep Curls</option>
                                                    <option value="Tricep Dips">Tricep Dips</option>
                                                    <option value="Lunges">Lunges</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Sets</label>
                                                <input
                                                    type="number"
                                                    value={exercise.sets}
                                                    onChange={(e) => handleExerciseChange(index, 'sets', parseInt(e.target.value))}
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Reps</label>
                                                <input
                                                    type="number"
                                                    value={exercise.reps}
                                                    onChange={(e) => handleExerciseChange(index, 'reps', parseInt(e.target.value))}
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Weight (kg)</label>
                                                <input
                                                    type="number"
                                                    value={exercise.weight}
                                                    onChange={(e) => handleExerciseChange(index, 'weight', parseInt(e.target.value))}
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                            {formData.exercises.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="remove-exercise-btn"
                                                    onClick={() => removeExercise(index)}
                                                    title="Remove exercise"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save Workout
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="workouts-table-card">
                        {loading ? (
                            <div className="loading">Loading workouts...</div>
                        ) : workouts.length > 0 ? (
                            <table className="workouts-table">
                                <thead>
                                    <tr>
                                        <th>DATE</th>
                                        <th>WORKOUT NAME</th>
                                        <th>DURATION</th>
                                        <th>CALORIES</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workouts.map((workout) => (
                                        <tr key={workout.id}>
                                            <td>{new Date(workout.date).toLocaleDateString()}</td>
                                            <td>{workout.name}</td>
                                            <td>{workout.duration} min</td>
                                            <td>{workout.calories} kcal</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="action-btn edit-btn" title="Edit">
                                                        ✏️
                                                    </button>
                                                    <button
                                                        className="action-btn delete-btn"
                                                        onClick={() => handleDelete(workout.id)}
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-state">
                                <p>No workouts logged yet. Create your first workout!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workouts