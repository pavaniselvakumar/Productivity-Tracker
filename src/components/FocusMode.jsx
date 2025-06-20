import React, { useState, useEffect, useRef } from "react";

const FocusMode = () => {
  // Load initial data from localStorage with better error handling
  const getInitialTimer = () => {
    const saved = localStorage.getItem("focusTimer");
    return saved && !isNaN(Number(saved)) ? Number(saved) : 25 * 60;
  };

  const getInitialTasks = () => {
    try {
      const saved = localStorage.getItem("focusTasks");
      return saved ? JSON.parse(saved) : ["Finish React Project", "Read a Book"];
    } catch (error) {
      console.error("Error parsing tasks:", error);
      return ["Finish React Project", "Read a Book"];
    }
  };

  const getInitialCompletedTasks = () => {
    try {
      const saved = localStorage.getItem("focusCompletedTasks");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing completed tasks:", error);
      return [];
    }
  };

  // State initialization with proper defaults
  const [timer, setTimer] = useState(getInitialTimer());
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState(getInitialTasks());
  const [completedTasks, setCompletedTasks] = useState(getInitialCompletedTasks());
  const [newTask, setNewTask] = useState("");
  const [focusMode, setFocusMode] = useState("pomodoro"); // "pomodoro", "short", "long"
  const countdown = useRef(null);
  const audioRef = useRef(null);

  // Effect to initialize audio for timer completion
  useEffect(() => {
    audioRef.current = new Audio("https://cdnjs.cloudflare.com/ajax/libs/sound-effects/1.0.1/alert.mp3");
    
    // Cleanup function
    return () => {
      if (countdown.current) clearInterval(countdown.current);
    };
  }, []);

  // Effect to store timer in localStorage
  useEffect(() => {
    localStorage.setItem("focusTimer", timer);
  }, [timer]);

  // Effect to store tasks and completed tasks in localStorage
  useEffect(() => {
    localStorage.setItem("focusTasks", JSON.stringify(tasks));
    localStorage.setItem("focusCompletedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      countdown.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown.current);
            setIsRunning(false);
            playSound();
            
            // Different alerts based on focus mode
            if (focusMode === "pomodoro") {
              alert("Focus session complete! Take a short break.");
              return 5 * 60; // Set to short break time
            } else if (focusMode === "short") {
              alert("Break time over! Ready for another focus session?");
              return 25 * 60; // Set back to focus time
            } else if (focusMode === "long") {
              alert("Long break complete! Ready to get back to work?");
              return 25 * 60; // Set back to focus time
            }
            return 25 * 60; // Default fallback
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(countdown.current);
      setIsRunning(false);
    }
  };

  const restartTimer = () => {
    stopTimer();
    // Set timer based on current mode
    if (focusMode === "pomodoro") {
      setTimer(25 * 60);
    } else if (focusMode === "short") {
      setTimer(5 * 60);
    } else if (focusMode === "long") {
      setTimer(15 * 60);
    }
  };

  const updateTimer = (minutes) => {
    if (minutes > 0 && minutes <= 120) {
      stopTimer();
      setTimer(minutes * 60);
    }
  };

  const setTimerMode = (mode) => {
    stopTimer();
    setFocusMode(mode);
    
    if (mode === "pomodoro") {
      setTimer(25 * 60);
    } else if (mode === "short") {
      setTimer(5 * 60);
    } else if (mode === "long") {
      setTimer(15 * 60);
    }
  };

  const addTask = (e) => {
    e?.preventDefault(); // Handle form submission
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };

  const markTaskComplete = (index) => {
    const task = tasks[index];
    setCompletedTasks([...completedTasks, task]);
    setTasks(tasks.filter((_, i) => i !== index));
    
    // If all tasks completed, show congratulations
    if (tasks.length === 1) {
      setTimeout(() => {
        alert("Congratulations! You've completed all your tasks!");
      }, 500);
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearCompletedTasks = () => {
    setCompletedTasks([]);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Key press handler for task input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  // Progress bar calculation
  const calculateProgress = () => {
    let total;
    if (focusMode === "pomodoro") {
      total = 25 * 60;
    } else if (focusMode === "short") {
      total = 5 * 60;
    } else {
      total = 15 * 60;
    }
    
    const elapsed = total - timer;
    return (elapsed / total) * 100;
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
        FOCUS MODE
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
          width: "100%", 
          maxWidth: "600px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <button
            onClick={() => setTimerMode("pomodoro")}
            style={{
              margin: "0 5px",
              padding: "8px 16px",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: focusMode === "pomodoro" ? "#000" : "#00ffcc",
              background: focusMode === "pomodoro" ? "#00ffcc" : "transparent",
              border: "2px solid #00ffcc",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Pomodoro
          </button>
          <button
            onClick={() => setTimerMode("short")}
            style={{
              margin: "0 5px",
              padding: "8px 16px",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: focusMode === "short" ? "#000" : "#00ffcc",
              background: focusMode === "short" ? "#00ffcc" : "transparent",
              border: "2px solid #00ffcc",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Short Break
          </button>
          <button
            onClick={() => setTimerMode("long")}
            style={{
              margin: "0 5px",
              padding: "8px 16px",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: focusMode === "long" ? "#000" : "#00ffcc",
              background: focusMode === "long" ? "#00ffcc" : "transparent",
              border: "2px solid #00ffcc",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Long Break
          </button>
        </div>
        
        <h2 style={{ fontSize: "3rem", margin: "15px 0" }}>{formatTime(timer)}</h2>
        
        {/* Progress Bar */}
        <div 
          style={{ 
            width: "100%", 
            height: "8px", 
            background: "#333", 
            borderRadius: "4px",
            marginBottom: "20px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div 
            style={{ 
              width: `${calculateProgress()}%`, 
              height: "100%", 
              background: "#00ffcc",
              borderRadius: "4px",
              transition: "width 1s linear"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <button
            onClick={startTimer}
            disabled={isRunning}
            style={{
              margin: "0 10px",
              padding: "10px 20px",
              fontSize: "1rem",
              fontWeight: "600",
              color: isRunning ? "#666" : "#00ffcc",
              background: "transparent",
              border: `2px solid ${isRunning ? "#666" : "#00ffcc"}`,
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
              color: !isRunning ? "#666" : "#ff0000",
              background: "transparent",
              border: `2px solid ${!isRunning ? "#666" : "#ff0000"}`,
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
          <label style={{ marginRight: "10px" }}>Custom Timer (minutes):</label>
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
              width: "80px",
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
        <form 
          onSubmit={addTask}
          style={{ display: "flex", marginBottom: "15px" }}
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
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
            type="submit"
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
        </form>
        
        {tasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", padding: "20px" }}>
            All tasks completed! Add new tasks to continue.
          </p>
        ) : (
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
                <span style={{ fontSize: "1.2rem", flex: 1 }}>{task}</span>
                <div>
                  <button
                    onClick={() => markTaskComplete(index)}
                    style={{
                      color: "#00ffcc",
                      background: "transparent",
                      border: "none",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      marginRight: "10px"
                    }}
                    title="Mark Complete"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    style={{
                      color: "#ff0000",
                      background: "transparent",
                      border: "none",
                      fontSize: "1.2rem",
                      cursor: "pointer"
                    }}
                    title="Delete Task"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        {completedTasks.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
              <h3
                style={{
                  fontSize: "1.3rem",
                  color: "#00ffcc",
                  margin: 0
                }}
              >
                Completed Tasks ({completedTasks.length})
              </h3>
              <button
                onClick={clearCompletedTasks}
                style={{
                  padding: "5px 10px",
                  fontSize: "0.8rem",
                  color: "#ff0000",
                  background: "transparent",
                  border: "1px solid #ff0000",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Clear Completed
              </button>
            </div>
            <ul style={{ listStyle: "none", padding: 0, maxHeight: "200px", overflowY: "auto" }}>
              {completedTasks.map((task, index) => (
                <li
                  key={index}
                  style={{
                    padding: "10px",
                    background: "#333",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    color: "#aaa",
                    textDecoration: "line-through",
                  }}
                >
                  {task}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default FocusMode;