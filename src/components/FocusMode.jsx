import React, { useState, useEffect, useRef } from "react";

const FocusMode = () => {
  // Load initial data from sessionStorage or localStorage
  const initialTimer = sessionStorage.getItem("timer") || 25 * 60; // Default focus time in seconds
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || ["Finish React Project", "Read a Book"];
  const initialCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

  const [timer, setTimer] = useState(Number(initialTimer));
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [completedTasks, setCompletedTasks] = useState(initialCompletedTasks);
  const [newTask, setNewTask] = useState("");
  const countdown = useRef(null); // Use ref to store the timer ID

  // Effect to store timer in sessionStorage
  useEffect(() => {
    sessionStorage.setItem("timer", timer);
  }, [timer]);

  // Effect to store tasks and completed tasks in localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      countdown.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 0) {
            clearInterval(countdown.current);
            setIsRunning(false);
            alert("Focus session complete! Take a short break.");
            return 25 * 60; // Reset to default focus time
          }
          return prev - 1;
        });
      }, 1000); // Countdown in seconds
    }
  };

  const stopTimer = () => {
    clearInterval(countdown.current);
    setIsRunning(false);
  };

  const restartTimer = () => {
    stopTimer(); // Stops the timer before restarting
    setTimer(25 * 60); // Reset to default focus time
  };

  const updateTimer = (minutes) => {
    stopTimer(); // Stops the timer before updating
    setTimer(minutes * 60);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };

  const markTaskComplete = (index) => {
    const task = tasks[index];
    setCompletedTasks([...completedTasks, task]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
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
        <h2 style={{ fontSize: "2rem", margin: 0 }}>{formatTime(timer)}</h2>
        <div style={{ marginTop: "15px" }}>
          <button
            onClick={startTimer}
            disabled={isRunning}
            style={{
              margin: "0 10px",
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
            Start
          </button>
          <button
            onClick={stopTimer}
            disabled={!isRunning}
            style={{
              margin: "0 10px",
              padding: "10px 20px",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#ff0000",
              background: "transparent",
              border: "2px solid #ff0000",
              borderRadius: "8px",
              cursor: !isRunning ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Stop
          </button>
          <button
            onClick={restartTimer}
            style={{
              margin: "0 10px",
              padding: "10px 20px",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#ffcc00",
              background: "transparent",
              border: "2px solid #ffcc00",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Restart
          </button>
        </div>
        <div style={{ marginTop: "15px" }}>
          <label style={{ marginRight: "10px" }}>Set Timer (minutes):</label>
          <input
            type="number"
            min="1"
            max="120"
            onChange={(e) => updateTimer(Number(e.target.value))}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #00ffcc",
              background: "#1c1c1c",
              color: "#fff",
            }}
          />
        </div>
      </div>

      {/* Task Management */}
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
        <div style={{ display: "flex", marginBottom: "15px" }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #333",
              background: "#1c1c1c",
              color: "#fff",
              marginRight: "10px",
            }}
          />
          <button
            onClick={addTask}
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
          >
            Add
          </button>
        </div>
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
                  color: "#ffcc00",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                ✓
              </button>
            </li>
          ))}
        </ul>
        <h3
          style={{
            fontSize: "1.3rem",
            marginTop: "20px",
            color: "#00ffcc",
          }}
        >
          Completed Tasks
        </h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {completedTasks.map((task, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                background: "#333",
                borderRadius: "8px",
                marginBottom: "10px",
                color: "#fff",
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
