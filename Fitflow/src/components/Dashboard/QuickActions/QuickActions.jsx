import React from "react";
import "./QuickActions.css"

function QuickActions() {
  return (
    <div className="quick-card">
      <h3>Quick Actions</h3>
      {/* Buttons should have onClick handlers*/}
      <button className="btn-blue">New Workout</button>
      <button className="btn-green">Add Progress</button>
    </div>
  );
}

export default QuickActions;
