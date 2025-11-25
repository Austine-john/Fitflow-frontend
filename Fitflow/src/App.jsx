import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Workouts from './components/Workouts/Workouts';
import Progress from './components/Progress/Progress';

function App() {
  return (
    <div>
      <h1>Fitflow App</h1>
      <Dashboard />
      <Workouts />
      <Progress />
    </div>
  );
}

export default App;
