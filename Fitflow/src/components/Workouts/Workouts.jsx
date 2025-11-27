import React from "react";
import WorkoutsHistory from "../../components/Workouts/WorkoutsHistory/WorkoutsHistory.jsx";
import WorkoutsForm from "../../components/Workouts/WorkoutsForm/WorkoutsForm.jsx";
import ExerciseForm from "../../components/Workouts/ExerciseForm/ExerciseForm.jsx";
import "../../components/Workouts/Workouts.css";


export default function Workouts() {
  return (
    <div className="workouts-wrapper">
      <WorkoutsHistory />
      <WorkoutsForm />
      <ExerciseForm />
    </div>
  );
}
