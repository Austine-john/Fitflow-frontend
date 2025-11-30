import { useState, useEffect } from 'react'
import { workoutsAPI } from '../services/api'
import { Plus, Clock, Flame, Trash2, Edit2, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import './Workouts.css'

const Workouts = () => {
    const [workouts, setWorkouts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
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

    const handleEdit = (workout) => {
        setEditingId(workout.id)
        setFormData({
            name: workout.name,
            date: workout.date,
            duration: workout.duration,
            calories: workout.calories_burned || '',
            exercises: [{ name: 'Bench Press', sets: 3, reps: 8, weight: 80 }]
        })
        setShowForm(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // FIXED: Transform data to match backend field names
            const backendData = {
                name: formData.name,
                date: formData.date,
                duration: formData.duration,
                calories_burned: formData.calories,  // Renamed: calories → calories_burned
                // Note: exercises are handled separately via workout_exercises endpoint
            }

            if (editingId) {
                // Update existing workout
                await workoutsAPI.update(editingId, backendData)
            } else {
                // Create new workout
                await workoutsAPI.create(backendData)
            }

            setShowForm(false)
            setEditingId(null)
            setFormData({
                name: '',
                date: new Date().toISOString().split('T')[0],
                duration: 60,
                calories: '',
                exercises: [{ name: 'Bench Press', sets: 3, reps: 8, weight: 80 }]
            })
            loadWorkouts()
        } catch (error) {
            console.error('Failed to save workout:', error)
            alert('Failed to save workout: ' + error.message)
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
                            {showForm ? 'Cancel' : <><Plus size={18} /> Create New Workout</>}
                        </button>
                    </div>

                    {showForm && (
                        <div className="workout-form-card">
                            <h2>{editingId ? 'Edit Workout' : 'Log a New Workout'}</h2>
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
                                            <Plus size={14} /> Add Exercise
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
                                                    <X size={16} />
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
                                        {editingId ? 'Update Workout' : 'Save Workout'}
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
                                            <td><Clock size={14} className="inline-icon" /> {workout.duration} min</td>
                                            <td><Flame size={14} className="inline-icon" /> {workout.calories_burned} kcal</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="action-btn edit-btn"
                                                        onClick={() => handleEdit(workout)}
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        className="action-btn delete-btn"
                                                        onClick={() => handleDelete(workout.id)}
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
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