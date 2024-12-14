import React, { useState } from "react";

const GoalTracker = () => {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);

  const addGoal = () => {
    setGoals([...goals, goal]);
    setGoal("");
  };

  return (
    <div>
      <h2>Goal Tracker</h2>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your goal"
      />
      <button onClick={addGoal}>Add Goal</button>
      <ul>
        {goals.map((g, index) => (
          <li key={index}>{g}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoalTracker;
