import { useState } from "react";

function ExerciseForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("distance"); // distance | weight | both
  const [distance, setDistance] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      duration,
      distance: type === "weight" ? 0 : Number(distance || 0),
      weight: type === "distance" ? 0 : Number(weight || 0),
    };

    onSubmit(payload);

    // Clear after submit
    setName("");
    setDistance("");
    setWeight("");
    setDuration("");
  }

  return (
    <form onSubmit={handleSubmit} className="exercise-form">

      <div>
        <label>Exercise Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Input Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="distance">Distance Only</option>
          <option value="weight">Weight Only</option>
          <option value="both">Both</option>
        </select>
      </div>

      {type !== "weight" && (
        <div>
          <label>Distance (km):</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            min="0"
          />
        </div>
      )}

      {type !== "distance" && (
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
          />
        </div>
      )}

      <div>
        <label>Duration (min):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min="1"
          required
        />
        <div>
            <label>Sets:</label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              min="1"
            />
        </div>
        <div>
            <label>Reps:</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              min="1"
            />
        </div>
      </div>

      <button type="submit">Save Exercise</button>
    </form>
  );
}

export default ExerciseForm;
