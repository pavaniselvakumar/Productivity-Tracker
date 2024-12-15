import React, { useState } from "react";

const TimeLogging = () => {
  // State to track current task, time, and task logs
  const [currentTask, setCurrentTask] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeLogs, setTimeLogs] = useState([]);

  // Start or stop the timer
  const handleToggleTimer = () => {
    if (isTimerRunning) {
      const endTime = new Date();
      const timeSpent = (endTime - startTime) / 1000 / 60; // in minutes
      const newLog = {
        task: currentTask,
        timeSpent: timeSpent.toFixed(2),
        startTime: startTime.toLocaleTimeString(),
        endTime: endTime.toLocaleTimeString(),
      };
      setTimeLogs([...timeLogs, newLog]);
      setIsTimerRunning(false);
      setStartTime(null);
    } else {
      setStartTime(new Date());
      setIsTimerRunning(true);
    }
  };

  // Reset the timer
  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setStartTime(null);
  };

  // Handle task change
  const handleTaskChange = (e) => setCurrentTask(e.target.value);

  // Styles for the UI
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: "50px",
      background: "#111",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
    },
    title: {
      fontSize: "3rem",
      marginBottom: "10px",
      textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
      letterSpacing: "3px",
    },
    form: {
      marginBottom: "20px",
      textAlign: "center",
    },
    input: {
      padding: "10px",
      margin: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      background: "#1c1c1c",
      color: "#fff",
      width: "300px",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      background: "#00ffcc",
      color: "#111",
      cursor: "pointer",
      margin: "10px",
    },
    timerDisplay: {
      fontSize: "1.5rem",
      margin: "20px 0",
    },
    logContainer: {
      marginTop: "30px",
      maxWidth: "600px",
      width: "100%",
    },
    logItem: {
      padding: "15px",
      background: "#1c1c1c",
      marginBottom: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Time Logging</h1>
      
      {/* Task Input Form */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter Task"
          value={currentTask}
          onChange={handleTaskChange}
          style={styles.input}
        />
      </div>
      
      {/* Timer Controls */}
      <div style={styles.timerDisplay}>
        {isTimerRunning ? (
          <div>
            <span>Timer Running...</span>
            <br />
            <button onClick={handleToggleTimer} style={styles.button}>
              Stop Timer
            </button>
          </div>
        ) : startTime ? (
          <div>
            <span>Time Spent: </span>
            {Math.floor((new Date() - startTime) / 1000 / 60)} minutes
            <br />
            <button onClick={handleToggleTimer} style={styles.button}>
              Log Time
            </button>
            <button onClick={handleResetTimer} style={styles.button}>
              Reset Timer
            </button>
          </div>
        ) : (
          <div>
            <button onClick={handleToggleTimer} style={styles.button}>
              Start Timer
            </button>
          </div>
        )}
      </div>

      {/* Task Logs */}
      <div style={styles.logContainer}>
        <h2>Logged Time</h2>
        {timeLogs.map((log, index) => (
          <div key={index} style={styles.logItem}>
            <strong>{log.task}</strong>
            <p>
              Time Spent: {log.timeSpent} minutes
              <br />
              Started: {log.startTime} | Ended: {log.endTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeLogging;

