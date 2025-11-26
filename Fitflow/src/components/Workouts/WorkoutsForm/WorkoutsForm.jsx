import React from "react";
import "../Workouts.css";


export default function WorkoutsForm() {
  return (
    <div className="card-section">
      <h2 className="section-title">Create New Workout</h2>

      <form className="styled-form">
        <div className="form-row">
          <div className="form-group">
            <label>Workout Name</label>
            <input type="text" placeholder="Leg Day, Cardio Blast..." />
          </div>

          <div className="form-group">
            <label>Workout Type</label>
            <select>
              <option>Strength</option>
              <option>Cardio</option>
              <option>Flexibility</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Duration (mins)</label>
            <input type="number" placeholder="45" />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" />
          </div>
        </div>

        <button className="primary-btn">Create Workout</button>
      </form>
    </div>
  );
}
