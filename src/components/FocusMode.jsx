import React, { useState } from "react";

const FocusMode = () => {
  const [timer, setTimer] = useState(25); // Default focus time is 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState(["Finish React Project", "Read a Book"]); // Sample tasks for focus mode
  const [completedTasks, setCompletedTasks] = useState([]);

  const startTimer = () => {
    setIsRunning(true);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(countdown);
          setIsRunning(false);
          alert("Focus session complete! Take a short break.");
          return 25; // Reset to default focus time
        }
        return prev - 1;
      });
    }, 60000); // Countdown in minutes
  };

  const markTaskComplete = (index) => {
    const task = tasks[index];
    setCompletedTasks([...completedTasks, task]);
    setTasks(tasks.filter((_, i) => i !== index));
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
        Focus Mode
      </h1>

      {/* Timer Section */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          background: "#1c1c1c",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        }}
      >
        <h2 style={{ fontSize: "2rem", margin: 0 }}>
          {timer}:00 {isRunning ? "(Running...)" : ""}
        </h2>
        <button
          onClick={startTimer}
          disabled={isRunning}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: "600",
            color: "#00ffcc",
            background: "transparent",
            border: "2px solid #00ffcc",
            borderRadius: "8px",
            cursor: isRunning ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Start Focus Timer
        </button>
      </div>

      {/* Current Tasks */}
      <div style={{ width: "100%", maxWidth: "600px", marginBottom: "30px" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "15px",
            color: "#fff",
            borderBottom: "2px solid #00ffcc",
            paddingBottom: "5px",
          }}
        >
          Tasks for Focus
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task, index) => (
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
              <span style={{ fontSize: "1.2rem" }}>{task}</span>
              <button
                onClick={() => markTaskComplete(index)}
                style={{
                  padding: "8px 15px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#4CAF50",
                  background: "transparent",
                  border: "2px solid #4CAF50",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#4CAF50";
                  e.currentTarget.style.color = "#111";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#4CAF50";
                }}
              >
                Complete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Completed Tasks */}
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "15px",
            color: "#fff",
            borderBottom: "2px solid #4CAF50",
            paddingBottom: "5px",
          }}
        >
          Completed Tasks
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {completedTasks.map((task, index) => (
            <li
              key={index}
              style={{
                padding: "15px",
                marginBottom: "10px",
                background: "#1c1c1c",
                color: "#4CAF50",
                borderRadius: "8px",
                border: "2px solid #4CAF50",
                textAlign: "center",
              }}
            >
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FocusMode;
