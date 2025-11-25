import "./WeeklyProgress.css";

export default function WeeklyProgress() {
  const progress = 100; // <== change this dynamically later

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="visual-card weekly-progress-card">
      <p className="stat-title">Weekly Progress</p>

      <div className="circle-wrapper">
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring-bg"
            cx="60"
            cy="60"
            r={radius}
          />

          <circle
            className="progress-ring-fill"
            cx="60"
            cy="60"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="progress-text">{progress}%</div>
      </div>
    </div>
  );
}
