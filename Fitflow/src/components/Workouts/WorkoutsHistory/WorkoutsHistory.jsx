import React from "react";
import "../Workouts.css";

export default function WorkoutsHistory({ history = [] }) {    /* history is the array conatining the data once fetched */
return ( <div className="card-section"> <h2 className="section-title">Workout History</h2>

  <div className="table-container">
    <table className="history-table">
      <thead>
        <tr>
          <th>Exercise</th>
          <th>Sets × Reps</th>
          <th>Weight (kg)</th>
          <th>Duration (min)</th>
          <th>Distance (km)</th>
          <th>Notes</th>
        </tr>
      </thead>

      <tbody>
        {history.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              No workout history yet
            </td>
          </tr>
        ) : (
          history.map((item) => (
            <tr key={item.id}>
              {/* Replace with actual exercise name once backend returns it */}
              <td>{item.exercise_name || "Exercise"}</td>

              <td>
                {item.sets} × {item.reps}
              </td>

              <td>{item.weight || "-"}</td>
              <td>{item.duration || "-"}</td>
              <td>{item.distance || "-"}</td>
              <td>{item.notes || "-"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

);
}
