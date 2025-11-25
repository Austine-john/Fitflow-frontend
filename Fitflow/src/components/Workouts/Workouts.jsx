import React from "react";
import WorkoutHistory from "./WorkoutsHistory/WorkoutsHistory";
import WorkoutForm from "./WorkoutsForm/WorkoutsForm";
import ExerciseForm from "./ExerciseForm/ExerciseForm";

const Workouts = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Workouts</h1>

      {/* Workout History Table */}
      <WorkoutHistory />

      {/* Workout Creation Form */}
      <WorkoutForm />

      {/* Exercise Form */}
      <ExerciseForm />
    </div>
  );
};

export default Workouts;
