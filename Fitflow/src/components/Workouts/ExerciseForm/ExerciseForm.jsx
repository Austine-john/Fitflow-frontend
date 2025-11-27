import React, { useState, useEffect } from "react";
import "../Workouts.css";

export default function ExerciseForm() {
const [formData, setFormData] = useState({
workout_id: "",
exercise_id: "",
sets: "",
reps: "",
weight: "",
duration: "",
distance: "",
notes: "",
order: ""
});

const [exercises, setExercises] = useState([]);
const [workouts, setWorkouts] = useState([]);

// Fetch exercises
useEffect(() => {
fetch("/exercises", {
headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
})
.then((r) => r.json())
.then((data) => setExercises(data))
.catch((err) => console.error(err));
}, []);

// Fetch workouts
useEffect(() => {
fetch("/workouts", {
headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
})
.then((r) => r.json())
.then((data) => setWorkouts(data))
.catch((err) => console.error(err));
}, []);

function handleChange(e) {
setFormData({ ...formData, [e.target.name]: e.target.value });
}

function handleSubmit(e) {
e.preventDefault();

const payload = {
  ...formData,
  workout_id: Number(formData.workout_id),
  exercise_id: Number(formData.exercise_id)
};

fetch("/workout-exercises", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
  body: JSON.stringify(payload)
})
  .then((r) => r.json())
  .then((data) => {
    console.log("Exercise added:", data);
    // Reset form
    setFormData({
      workout_id: "",
      exercise_id: "",
      sets: "",
      reps: "",
      weight: "",
      duration: "",
      distance: "",
      notes: "",
      order: ""
    });
  })
  .catch((err) => console.error(err));

}

return ( <div className="card-section"> <h2 className="section-title">Add Exercise</h2>

  <form className="styled-form" onSubmit={handleSubmit}>
    <div className="form-row">
      <div className="form-group">
        <label>Workout</label>
        <select
          name="workout_id"
          value={formData.workout_id}
          onChange={handleChange}
          required
        >
          <option value="">Select workout</option>
          {workouts.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name} ({w.workout_type})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Exercise</label>
        <select
          name="exercise_id"
          value={formData.exercise_id}
          onChange={handleChange}
          required
        >
          <option value="">Select exercise</option>
          {/* Gets data for dropdown box */}
          {exercises.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name} ({ex.category})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Sets</label>
        <input
          type="number"
          name="sets"
          placeholder="4"
          value={formData.sets}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Reps</label>
        <input
          type="number"
          name="reps"
          placeholder="12"
          value={formData.reps}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Weight (kg)</label>
        <input
          type="number"
          name="weight"
          placeholder="60"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Duration (secs)</label>
        <input
          type="number"
          name="duration"
          placeholder="Optional"
          value={formData.duration}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Distance (m)</label>
        <input
          type="number"
          name="distance"
          placeholder="Optional"
          value={formData.distance}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Notes</label>
        <input
          type="text"
          name="notes"
          placeholder="Optional notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Order</label>
        <input
          type="number"
          name="order"
          placeholder="1"
          value={formData.order}
          onChange={handleChange}
        />
      </div>
    </div>

    <button className="primary-btn">Add Exercise</button>
  </form>
</div>

);
}
