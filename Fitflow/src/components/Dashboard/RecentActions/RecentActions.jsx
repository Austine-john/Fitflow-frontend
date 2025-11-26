import React, { useEffect, useState } from "react";
import "./RecentActions.css";

function RecentActions() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
      {/* fuction on fetching data */}
}, []);

  return (
    <div className="recent-card">
      <h2>Recent Workouts</h2>
      <table className="recent-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Kcal</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((w) => (
            <tr key={w.id}>
              <td>{w.name}</td>
              <td>{new Date(w.date).toLocaleDateString()}</td>
              <td>{w.duration} min</td>
              <td>{w.calories_burned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentActions;
