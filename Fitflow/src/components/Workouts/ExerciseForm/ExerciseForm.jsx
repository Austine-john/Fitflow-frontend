import React from "react";
import "../Workouts.css";


export default function ExerciseForm() {
  return (
    <div className="card-section">
      <h2 className="section-title">Add Exercise</h2>

      <form className="styled-form">
        <div className="form-row">
          <div className="form-group">
            <label>Exercise Name</label>
            <input type="text" placeholder="Bench Press, Squats..." />
          </div>

          <div className="form-group">
            <label>Sets</label>
            <input type="number" placeholder="4" />
          </div>

          <div className="form-group">
            <label>Reps</label>
            <input type="number" placeholder="12" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Weight (kg)</label>
            <input type="number" placeholder="60" />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <input type="text" placeholder="Optional notes" />
          </div>
        </div>

        <button className="secondary-btn">Add Exercise</button>
      </form>
    </div>
  );
}
