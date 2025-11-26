import React from "react";
import "../Workouts.css";


export default function WorkoutsHistory() {
  return (
    <div className="card-section">
      <h2 className="section-title">Workout History</h2>

      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {/* Placeholder rows – replace with fetched data later */}
            <tr>
              <td>2025-02-10</td>
              <td>Strength</td>
              <td>45 min</td>
              <td>350</td>
              <td>Great session</td>
            </tr>

            <tr>
              <td>2025-02-09</td>
              <td>Cardio</td>
              <td>30 min</td>
              <td>220</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
