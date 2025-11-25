import "./Dashboard.css";
import VisualDisplay from "./VisualDisplay/VisualDisplay";
import RecentActions from "./RecentActions/RecentActions";
import QuickActions from "./QuickActions/QuickActions";

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <VisualDisplay />
      <div className="actions-row">
      <RecentActions />
      <QuickActions />
      </div>
    </div>
  );
}
