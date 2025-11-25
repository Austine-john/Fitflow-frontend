import React from "react";
import TotalWorkouts from "./TotalWorkouts";
import TotalCalories from "./TotalCalories";
import DaysStreak from "./DaysStreak";
import WeeklyProgress from "./WeeklyProgress";
import "./VisualDisplay.css"

{/* Main component for handling the displays */}
function VisualDisplay() {
  return (
    <div className="visual-grid">
      <TotalWorkouts />
      <TotalCalories />
      <DaysStreak />
      <WeeklyProgress />
    </div>
  );
}

export default VisualDisplay;
