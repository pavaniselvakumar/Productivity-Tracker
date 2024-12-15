import React, { useState } from "react";

const GoalTracker = () => {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);

  const addGoal = () => {
    if (goal.trim()) {
      setGoals([...goals, goal]);
      setGoal("");
    }
  };

  const deleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

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
      {/* Title */}
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "30px",
          color: "#00ffcc",
          textShadow: "0 4px 10px rgba(0, 255, 255, 0.5)",
          letterSpacing: "2px",
        }}
      >
        Goal Tracker
      </h1>

      {/* Input Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "30px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter your goal"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "2px solid #00ffcc",
            outline: "none",
            color: "#fff",
            background: "#1c1c1c",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          }}
        />
        <button
          onClick={addGoal}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: "600",
            color: "#00ffcc",
            background: "transparent",
            border: "2px solid #00ffcc",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#00ffcc";
            e.currentTarget.style.color = "#111";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#00ffcc";
          }}
        >
          Add Goal
        </button>
      </div>

      {/* Goals List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {goals.map((g, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              marginBottom: "10px",
              background: "#1c1c1c",
              color: "#fff",
              borderRadius: "8px",
              border: "2px solid transparent",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = "2px solid #00ffcc";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = "2px solid transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{g}</span>
            <button
              onClick={() => deleteGoal(index)}
              style={{
                padding: "8px 15px",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#ff4c4c",
                background: "transparent",
                border: "2px solid #ff4c4c",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#ff4c4c";
                e.currentTarget.style.color = "#111";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ff4c4c";
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalTracker;
