import React, { useState } from "react";
import "../Workouts.css";

export default function WorkoutsForm() {
const [formData, setFormData] = useState({
name: "",
workout_type: "Strength",
duration: "",
calories_burned: "",
description: ""
});

function handleChange(e) {
setFormData({
...formData,
[e.target.name]: e.target.value
});
}

function handleSubmit(e) {
e.preventDefault();


fetch("/workouts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
  body: JSON.stringify(formData)
})
  .then((r) => r.json())
  .then((data) => {
    console.log("Workout created:", data);
  });

}

return ( <div className="card-section"> <h2 className="section-title">Create New Workout</h2>


  <form className="styled-form" onSubmit={handleSubmit}>
    <div className="form-row">
      <div className="form-group">
        <label>Workout Name</label>
        <input
          type="text"
          name="name"
          placeholder="Leg Day, Cardio Blast..."
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Workout Type</label>
        <select
          name="workout_type"
          value={formData.workout_type}
          onChange={handleChange}
        >
          <option>Strength</option>
          <option>Cardio</option>
          <option>Flexibility</option>
        </select>
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Duration (mins)</label>
        <input
          type="number"
          name="duration"
          placeholder="45"
          value={formData.duration}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Calories Burned</label>
        <input
          type="number"
          name="calories_burned"
          placeholder="300"
          value={formData.calories_burned}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="form-group">
      <label>Description</label>
      <textarea
        name="description"
        placeholder="Optional notes..."
        value={formData.description}
        onChange={handleChange}
      />
    </div>

    <button className="primary-btn">Create Workout</button>
  </form>
</div>

);
}
