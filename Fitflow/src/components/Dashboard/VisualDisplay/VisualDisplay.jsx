import React from "react";
import TotalWorkouts from "./TotalWorkouts";
import TotalCalories from "./TotalCalories";
import DaysStreak from "./DaysStreak";
import WeeklyProgress from "./WeeklyProgress";

function VisualDisplay() {
  return (
    <div className="visual-display">
      <TotalWorkouts />
      <TotalCalories />
      <DaysStreak />
      <WeeklyProgress />
    </div>
  );
}

export default VisualDisplay;
