import React, { useState } from "react";

const DailyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Work");

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, category }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
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
        Daily Planner
      </h1>

      {/* Input Section */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
          style={{
            flex: 1,
            padding: "15px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "2px solid #333",
            background: "#1c1c1c",
            color: "#fff",
            outline: "none",
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "15px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "2px solid #333",
            background: "#1c1c1c",
            color: "#fff",
            outline: "none",
          }}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
        <button
          onClick={addTask}
          style={{
            padding: "15px 20px",
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
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {tasks.map((t, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              background: t.category === "Work" ? "#003366" : t.category === "Personal" ? "#4CAF50" : "#FFA500",
              color: "#fff",
              border: "2px solid transparent",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = "2px solid #00ffcc";
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 255, 255, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = "2px solid transparent";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
            }}
          >
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>{t.text}</span>
            <span
              style={{
                fontSize: "0.9rem",
                fontStyle: "italic",
                marginLeft: "10px",
              }}
            >
              ({t.category})
            </span>
            <button
              onClick={() => deleteTask(index)}
              style={{
                padding: "8px 15px",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#ff6666",
                background: "transparent",
                border: "2px solid #ff6666",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#ff6666";
                e.currentTarget.style.color = "#111";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ff6666";
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

export default DailyPlanner;
