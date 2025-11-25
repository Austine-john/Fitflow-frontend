import React from "react";

const sampleData = [
  { id: 1, title: "Chest Day", date: "24 Nov", duration: "45 min", kcal: 350 },
  { id: 2, title: "Leg Day", date: "23 Nov", duration: "50 min", kcal: 420 },
  { id: 3, title: "Back Workout", date: "22 Nov", duration: "40 min", kcal: 300 },
  { id: 4, title: "Full Body", date: "21 Nov", duration: "60 min", kcal: 500 },
  { id: 5, title: "Cardio", date: "20 Nov", duration: "30 min", kcal: 220 },
];

function RecentActions() {
  return (
    <div className="recent-actions">
      <h2>Recent Workouts</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Kcal</th>
          </tr>
        </thead>

        <tbody>
          {sampleData.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>{item.duration}</td>
              <td>{item.kcal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentActions;
