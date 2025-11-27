import React, { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Workouts from "./components/Workouts/Workouts";
import Progress from "./components/Progress/Progress";
import AuthModal from "./components/AuthModal/AuthModal";

function App() {
  // State to manage authentication modal visibility and user data
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      <h1>Fitflow App</h1>

      {/* Login Button which will have to be moved to the Navbar */}
      {!user && (
        <button onClick={() => setShowAuth(true)} style={{ marginBottom: "20px" }}>
          Login / Register
        </button>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={(user) => {
          setUser(user);
          setShowAuth(false);
        }}
      />

      {/* App Sections still with no routing */}
      <Dashboard user={user} />
      <Workouts user={user} />
      <Progress user={user} />
    </div>
  );
}

export default App;
