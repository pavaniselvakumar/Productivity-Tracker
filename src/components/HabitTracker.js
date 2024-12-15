import React, { useState } from "react";

const HabitTracker = () => {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  const addHabit = () => {
    if (habit.trim()) {
      setHabits([
        ...habits,
        { text: habit, completed: false, streak: 0, target: 7 },
      ]);
      setHabit("");
    }
  };

  const toggleComplete = (index) => {
    setHabits(
      habits.map((h, i) =>
        i === index
          ? {
              ...h,
              completed: !h.completed,
              streak: h.completed ? h.streak - 1 : h.streak + 1,
            }
          : h
      )
    );
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
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
        Habit Tracker
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
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          placeholder="Enter a habit"
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
          onClick={addHabit}
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
          Add Habit
        </button>
      </div>

      {/* Habits List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {habits.map((h, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              marginBottom: "10px",
              background: "#1c1c1c",
              color: h.completed ? "#00ffcc" : "#fff",
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
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                {h.text}
              </span>
              <p style={{ fontSize: "0.9rem", margin: "5px 0" }}>
                Streak: {h.streak}/{h.target} days
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => toggleComplete(index)}
                style={{
                  padding: "8px 15px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: h.completed ? "#ff4c4c" : "#00ffcc",
                  background: "transparent",
                  border: `2px solid ${h.completed ? "#ff4c4c" : "#00ffcc"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = h.completed
                    ? "#ff4c4c"
                    : "#00ffcc";
                  e.currentTarget.style.color = "#111";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = h.completed
                    ? "#ff4c4c"
                    : "#00ffcc";
                }}
              >
                {h.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => deleteHabit(index)}
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;
