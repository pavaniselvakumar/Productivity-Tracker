import React, { useState } from "react";

const HabitTracker = () => {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  const addHabit = () => {
    setHabits([...habits, habit]);
    setHabit("");
  };

  return (
    <div>
      <h2>Habit Tracker</h2>
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Enter a habit"
      />
      <button onClick={addHabit}>Add Habit</button>
      <ul>
        {habits.map((h, index) => (
          <li key={index}>{h}</li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;
