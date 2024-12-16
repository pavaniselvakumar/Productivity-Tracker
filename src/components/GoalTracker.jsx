import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const GoalTracker = () => {
  const [cookies, setCookies] = useCookies(["goals", "streaks", "weekStart"]);
  const [goals, setGoals] = useState(cookies.goals || []);
  const [goal, setGoal] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Personal");
  const [streaks, setStreaks] = useState(cookies.streaks || Array(7).fill(false));
  const [weekStart, setWeekStart] = useState(cookies.weekStart || new Date().getDay());
  const [notificationPermission, setNotificationPermission] = useState(false);

  useEffect(() => {
    setCookies("goals", goals);
    setCookies("streaks", streaks);
    setCookies("weekStart", weekStart);
    if (Notification.permission === "granted") {
      setNotificationPermission(true);
    }
  }, [goals, streaks, weekStart, setCookies]);

  const addGoal = () => {
    if (goal.trim()) {
      const newGoal = {
        text: goal,
        completed: false,
        priority,
        category,
      };
      setGoals([...goals, newGoal]);
      setGoal("");
      setPriority("Medium");
      setCategory("Personal");
    }
  };

  const toggleGoal = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setGoals(updatedGoals);
    if (updatedGoals[index].completed && notificationPermission) {
      // Notify the user if goal is completed
      new Notification(`Goal Completed: ${updatedGoals[index].text}`);
    }
  };

  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const resetStreak = () => {
    setStreaks(Array(7).fill(false));
  };

  const completeStreak = (index) => {
    const updatedStreaks = [...streaks];
    updatedStreaks[index] = !updatedStreaks[index];
    setStreaks(updatedStreaks);
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const weeklyGoalsCompleted = goals.filter((goal) => goal.completed).length;
  const totalGoals = goals.length;
  const completionPercentage = totalGoals ? Math.round((weeklyGoalsCompleted / totalGoals) * 100) : 0;

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        padding: "50px",
        background: "#111",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
      }}
    >
      {/* Date and Title */}
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          color: "#00ffcc",
          textShadow: "0 4px 10px rgba(0, 255, 255, 0.5)",
        }}
      >
        Goal Tracker
      </h1>
      <h2 style={{ marginBottom: "30px", color: "#aaa" }}>{today}</h2>

      {/* Streak Section */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Daily Streak</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {streaks.map((streak, index) => (
            <div
              key={index}
              onClick={() => completeStreak(index)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: streak ? "#4CAF50" : "#aaa",
                border: "2px solid #333",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <button
          onClick={resetStreak}
          style={{
            padding: "10px 20px",
            background: "transparent",
            color: "red",
            border: "2px solid red",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Reset Streak
        </button>
      </section>

      {/* Weekly Goals Progress */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Weekly Goals Progress</h3>
        <p style={{ color: "#aaa" }}>
          Goals completed this week: {weeklyGoalsCompleted}/{totalGoals}
        </p>
        <p style={{ color: "#aaa" }}>Completion: {completionPercentage}%</p>
      </section>

      {/* Goal Priority and Category */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Set Goal Priority and Category</h3>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "15px",
            borderRadius: "8px",
            border: "2px solid #333",
            background: "#1c1c1c",
            color: "#fff",
          }}
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #333",
            background: "#1c1c1c",
            color: "#fff",
          }}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Fitness">Fitness</option>
        </select>
      </section>

      {/* Daily Goals */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Daily Goals</h3>
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter your goal"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #333",
              background: "#1c1c1c",
              color: "#fff",
            }}
          />
          <button
            onClick={addGoal}
            style={{
              padding: "10px 20px",
              background: "transparent",
              color: "#00ffcc",
              border: "2px solid #00ffcc",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Goal
          </button>
        </div>

        {/* Goal List */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {goals.map((goal, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#333",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ color: goal.completed ? "#4CAF50" : "#fff" }}>
                {goal.text} - <b>{goal.priority}</b> | <i>{goal.category}</i>
              </div>
              <div>
                <button
                  onClick={() => toggleGoal(index)}
                  style={{
                    marginRight: "10px",
                    backgroundColor: goal.completed ? "#4CAF50" : "#bbb",
                    padding: "10px",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {goal.completed ? "Completed" : "Mark as Completed"}
                </button>
                <button
                  onClick={() => deleteGoal(index)}
                  style={{
                    backgroundColor: "#f44336",
                    padding: "10px",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default GoalTracker;
