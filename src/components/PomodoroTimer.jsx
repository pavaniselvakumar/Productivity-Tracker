import React, { useState, useEffect } from "react";
import "./styles.css"; // Ensure you have the CSS styles defined here

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(25);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalSeconds = inputMinutes * 60 + inputSeconds;

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            playAudioAlert();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
        const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
        setProgress(((elapsedSeconds / totalSeconds) * 100).toFixed(2));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setProgress(0);
  };

  const handleSetTimer = (e) => {
    e.preventDefault();
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setProgress(0);
  };

  const playAudioAlert = () => {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
  };

  return (
    <div className="pomodoro-container">
      <h2 className="pomodoro-header">Pomodoro Timer</h2>
      <div className="progress-container">
        <p className="timer-display">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-percentage">{progress}%</p>
      </div>
      <div className="buttons">
        <button className="control-button" onClick={handleStartPause}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="control-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <form onSubmit={handleSetTimer} className="timer-form">
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(Number(e.target.value))}
          placeholder="Minutes"
          className="form-input"
          min="0"
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(Number(e.target.value))}
          placeholder="Seconds"
          className="form-input"
          min="0"
          max="59"
        />
        <button type="submit" className="form-submit-button">
          Set Timer
        </button>
      </form>
    </div>
  );
};

export default PomodoroTimer;

/* Add the CSS styling for Pomodoro Timer below */
<style>
.pomodoro-container {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #1c1c1c, #333);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.pomodoro-header {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-shadow: 0 4px 10px rgba(0, 255, 255, 0.3);
}

.timer-display {
  font-size: 3rem;
  font-weight: bold;
  margin: 20px 0;
}

.progress-container {
  width: 300px;
  margin-bottom: 30px;
}

.progress-bar {
  height: 10px;
  width: 100%;
  background: #222;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0;
}

.progress {
  height: 10px;
  background: #00ffcc;
  width: 0;
  transition: width 0.5s ease;
}

.progress-percentage {
  font-size: 1rem;
  color: #00ffcc;
}

.buttons {
  margin: 20px 0;
}

.control-button {
  background-color: #00ffcc;
  color: #fff;
  padding: 10px 25px;
  border-radius: 30px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 0 10px;
  transition: background-color 0.3s;
}

.control-button:hover {
  background-color: #00ccaa;
}

.timer-form {
  margin-top: 20px;
}

.form-input {
  display: inline-block;
  margin: 5px;
  padding: 10px;
  width: 80px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #222;
  color: #fff;
}

.form-submit-button {
  background-color: #00ffcc;
  color: #fff;
  padding: 10px 15px;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.form-submit-button:hover {
  background-color: #00ccaa;
}
</style>
