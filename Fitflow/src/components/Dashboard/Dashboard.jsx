import React from "react";
import VisualDisplay from "./VisualDisplay/VisualDisplay";
import RecentActions from "./RecentActions/RecentActions";
import QuickActions from "./QuickActions/QuickActions";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <VisualDisplay />
      <RecentActions />
      <QuickActions />
    </div>
  );
}

export default Dashboard;
