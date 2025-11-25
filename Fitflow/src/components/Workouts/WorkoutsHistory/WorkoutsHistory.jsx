import React from "react";

const sampleWorkouts = [
  { id: 1, name: "Chest Day", date: "2025-01-01", duration: 45, calories_burned: 300 },
  { id: 2, name: "Leg Day", date: "2025-01-03", duration: 60, calories_burned: 450 },
  { id: 3, name: "Cardio", date: "2025-01-05", duration: 30, calories_burned: 250 },
];

const WorkoutHistory = () => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Workout History</h2>

      <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration (min)</th>
              <th>Kcal Burned</th>
            </tr>
          </thead>

          <tbody>
            {sampleWorkouts.map((w) => (
              <tr key={w.id}>
                <td>{w.name}</td>
                <td>{w.date}</td>
                <td>{w.duration}</td>
                <td>{w.calories_burned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutHistory;
