import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Plus, LineChart as LineChartIcon, BarChart as BarChartIcon, Scale, Ruler, Activity } from 'lucide-react'
import { progressAPI } from '../services/api'
import Navbar from '../components/Navbar'
import './Progress.css'

const Progress = () => {
    const [progressData, setProgressData] = useState([])
    const [chartType, setChartType] = useState('line')
    const [metric, setMetric] = useState('weight')
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        weight: '',
        bodyFat: '',
        measurements: {
            chest: '',
            waist: '',
            hips: '',
            arms: ''
        }
    })

    useEffect(() => {
        loadProgress()
    }, [])

    const loadProgress = async () => {
        try {
            const data = await progressAPI.getAll()
            setProgressData(data)
        } catch (error) {
            console.error('Failed to load progress:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name in formData.measurements) {
            setFormData({
                ...formData,
                measurements: {
                    ...formData.measurements,
                    [name]: value
                }
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // FIXED: Transform data to match backend field names
            const backendData = {
                log_date: formData.date,  // Renamed: date → log_date
                weight: formData.weight || null,
                body_fat: formData.bodyFat || null,  // Now supported by backend
                chest: formData.measurements.chest || null,
                waist: formData.measurements.waist || null,
                hips: formData.measurements.hips || null,
                biceps: formData.measurements.arms || null,  // Renamed: arms → biceps
            }

            await progressAPI.create(backendData)
            setShowForm(false)
            setFormData({
                date: new Date().toISOString().split('T')[0],
                weight: '',
                bodyFat: '',
                measurements: {
                    chest: '',
                    waist: '',
                    hips: '',
                    arms: ''
                }
            })
            loadProgress()
        } catch (error) {
            console.error('Failed to add progress:', error)
            alert('Failed to add progress: ' + error.message)
        }
    }

    const chartData = progressData
        .sort((a, b) => new Date(a.log_date) - new Date(b.log_date))
        .map(p => {
            // Debug log to check incoming data
            console.log('Processing progress entry:', p)
            return {
                date: new Date(p.log_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                weight: p.weight || 0,
                bodyFat: p.body_fat || 0,  // FIXED: Use body_fat from backend
                chest: p.chest || 0,
                waist: p.waist || 0
            }
        })

    const ChartComponent = chartType === 'line' ? LineChart : BarChart

    return (
        <div className="page-container">
            <Navbar />
            <div className="main-content">
                <div className="progress-page">
                    <div className="page-header">
                        <h1>Progress Tracking</h1>
                        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Cancel' : <><Plus size={18} /> Add Progress</>}
                        </button>
                    </div>

                    {showForm && (
                        <div className="progress-form-card">
                            <h2>Log Your Progress</h2>
                            <form onSubmit={handleSubmit} className="progress-form">
                                <div className="form-row">
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
                                    <div className="form-group">
                                        <label htmlFor="weight">Weight (kg)</label>
                                        <input
                                            type="number"
                                            id="weight"
                                            name="weight"
                                            step="0.1"
                                            placeholder="e.g., 75.5"
                                            value={formData.weight}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="bodyFat">Body Fat (%)</label>
                                        <input
                                            type="number"
                                            id="bodyFat"
                                            name="bodyFat"
                                            step="0.1"
                                            placeholder="e.g., 18.5"
                                            value={formData.bodyFat}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <h3>Measurements (cm)</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="chest">Chest</label>
                                        <input
                                            type="number"
                                            id="chest"
                                            name="chest"
                                            step="0.1"
                                            placeholder="e.g., 95"
                                            value={formData.measurements.chest}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="waist">Waist</label>
                                        <input
                                            type="number"
                                            id="waist"
                                            name="waist"
                                            step="0.1"
                                            placeholder="e.g., 80"
                                            value={formData.measurements.waist}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="hips">Hips</label>
                                        <input
                                            type="number"
                                            id="hips"
                                            name="hips"
                                            step="0.1"
                                            placeholder="e.g., 95"
                                            value={formData.measurements.hips}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="arms">Arms</label>
                                        <input
                                            type="number"
                                            id="arms"
                                            name="arms"
                                            step="0.1"
                                            placeholder="e.g., 35"
                                            value={formData.measurements.arms}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                        Save Progress
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="progress-chart-card">
                        <div className="chart-controls">
                            <div className="metric-selector">
                                <button
                                    className={`metric-btn ${metric === 'weight' ? 'active' : ''}`}
                                    onClick={() => setMetric('weight')}
                                >
                                    <Scale size={16} /> Weight
                                </button>
                                <button
                                    className={`metric-btn ${metric === 'bodyFat' ? 'active' : ''}`}
                                    onClick={() => setMetric('bodyFat')}
                                >
                                    <Activity size={16} /> Body Fat
                                </button>
                                <button
                                    className={`metric-btn ${metric === 'chest' ? 'active' : ''}`}
                                    onClick={() => setMetric('chest')}
                                >
                                    <Ruler size={16} /> Chest
                                </button>
                                <button
                                    className={`metric-btn ${metric === 'waist' ? 'active' : ''}`}
                                    onClick={() => setMetric('waist')}
                                >
                                    <Ruler size={16} /> Waist
                                </button>
                            </div>
                            <div className="chart-type-selector">
                                <button
                                    className={`type-btn ${chartType === 'line' ? 'active' : ''}`}
                                    onClick={() => setChartType('line')}
                                >
                                    <LineChartIcon size={16} /> Line
                                </button>
                                <button
                                    className={`type-btn ${chartType === 'bar' ? 'active' : ''}`}
                                    onClick={() => setChartType('bar')}
                                >
                                    <BarChartIcon size={16} /> Bar
                                </button>
                            </div>
                        </div>

                        <div className="chart-wrapper">
                            {chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={400}>
                                    <ChartComponent data={chartData}>
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
                                        {chartType === 'line' ? (
                                            <Line
                                                type="monotone"
                                                dataKey={metric}
                                                stroke="#3ecf8e"
                                                strokeWidth={3}
                                                dot={{ fill: '#3ecf8e', r: 6 }}
                                            />
                                        ) : (
                                            <Bar dataKey={metric} fill="#3ecf8e" />
                                        )}
                                    </ChartComponent>
                                </ResponsiveContainer>
                            ) : (
                                <div className="empty-chart">
                                    <p>No progress data yet. Start tracking your progress!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {progressData.length > 0 && (
                        <div className="progress-table-card">
                            <h2>Progress History</h2>
                            <table className="progress-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Weight (kg)</th>
                                        <th>Body Fat (%)</th>
                                        <th>Chest (cm)</th>
                                        <th>Waist (cm)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {progressData.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{new Date(entry.log_date).toLocaleDateString()}</td>
                                            <td>{entry.weight || '-'}</td>
                                            <td>{entry.body_fat || '-'}</td>
                                            <td>{entry.chest || '-'}</td>
                                            <td>{entry.waist || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Progress
