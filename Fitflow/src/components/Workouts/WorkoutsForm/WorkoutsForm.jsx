import React, { useState } from "react";

const WorkoutForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    duration: "",
    calories_burned: "",
    workout_type: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Workout Submitted:", form);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Create Workout</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Workout Name" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input type="date" name="date" onChange={handleChange} />
        <input type="number" name="duration" placeholder="Duration (min)" onChange={handleChange} />
        <input type="number" name="calories_burned" placeholder="Calories Burned" onChange={handleChange} />

        <input name="workout_type" placeholder="Workout Type" onChange={handleChange} />

        <button type="submit">Save Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
