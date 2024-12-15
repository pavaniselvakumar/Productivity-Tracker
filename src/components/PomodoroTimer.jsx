import React, { useState, useEffect } from "react";

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
    <div style={{
      fontFamily: 'Poppins', 
      textAlign: 'center', 
      padding: '30px', 
      background: 'linear-gradient(135deg, #1c1c1c, #333)', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: '#fff',
      position: 'relative'
    }}>
      {/* Background Animation */}
      <div className="background-animation" style={{
        position: 'absolute', 
        top: '0', 
        left: '0', 
        right: '0', 
        bottom: '0', 
        zIndex: '-1',
        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2), rgba(0, 0, 0, 0.5))',
        animation: 'background 10s infinite alternate'
      }}></div>

      <h2 style={{
        fontSize: '2.5rem', 
        marginBottom: '20px', 
        textShadow: '0 4px 10px rgba(0, 255, 255, 0.3)'
      }}>Pomodoro Timer</h2>

      <div style={{ width: '300px', marginBottom: '30px' }}>
        <p style={{
          fontSize: '3rem', 
          fontWeight: 'bold', 
          margin: '20px 0'
        }}>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>

        {/* Circular Progress Bar */}
        <div style={{
          position: 'relative', 
          width: '150px', 
          height: '150px', 
          borderRadius: '50%', 
          border: '10px solid #00ffcc', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          margin: '20px auto'
        }}>
          <div style={{
            width: '120px', 
            height: '120px', 
            background: '#222', 
            borderRadius: '50%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: '1.5rem', 
              color: '#fff'
            }}>{progress}%</p>
          </div>
        </div>

        <div style={{
          height: '10px', 
          width: '100%', 
          background: '#222', 
          borderRadius: '5px', 
          overflow: 'hidden', 
          margin: '10px 0'
        }}>
          <div style={{
            height: '10px', 
            background: '#00ffcc', 
            width: `${progress}%`, 
            transition: 'width 0.5s ease'
          }}></div>
        </div>

        <p style={{
          fontSize: '1rem', 
          color: '#00ffcc'
        }}>{progress}%</p>
      </div>

      <div style={{ margin: '20px 0' }}>
        <button 
          style={{
            backgroundColor: '#00ffcc', 
            color: '#fff', 
            padding: '10px 25px', 
            borderRadius: '30px', 
            border: 'none', 
            fontSize: '1.2rem', 
            cursor: 'pointer', 
            margin: '0 10px', 
            transition: 'background-color 0.3s, transform 0.2s',
          }} 
          onClick={handleStartPause}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>

        <button 
          style={{
            backgroundColor: '#ff3d3d', 
            color: '#fff', 
            padding: '10px 25px', 
            borderRadius: '30px', 
            border: 'none', 
            fontSize: '1.2rem', 
            cursor: 'pointer', 
            margin: '0 10px', 
            transition: 'background-color 0.3s, transform 0.2s',
          }} 
          onClick={handleReset}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Reset
        </button>
      </div>

      <form onSubmit={handleSetTimer} style={{ marginTop: '20px' }}>
        <input 
          type="number" 
          value={inputMinutes} 
          onChange={(e) => setInputMinutes(Number(e.target.value))} 
          placeholder="Minutes" 
          style={{
            display: 'inline-block', 
            margin: '5px', 
            padding: '10px', 
            width: '80px', 
            borderRadius: '5px', 
            border: '1px solid #ccc', 
            background: '#222', 
            color: '#fff'
          }} 
          min="0" 
        />
        <input 
          type="number" 
          value={inputSeconds} 
          onChange={(e) => setInputSeconds(Number(e.target.value))} 
          placeholder="Seconds" 
          style={{
            display: 'inline-block', 
            margin: '5px', 
            padding: '10px', 
            width: '80px', 
            borderRadius: '5px', 
            border: '1px solid #ccc', 
            background: '#222', 
            color: '#fff'
          }} 
          min="0" 
          max="59" 
        />
        <button type="submit" style={{
          backgroundColor: '#00ffcc', 
          color: '#fff', 
          padding: '10px 15px', 
          borderRadius: '30px', 
          border: 'none', 
          fontSize: '1rem', 
          cursor: 'pointer', 
          marginTop: '10px', 
          transition: 'background-color 0.3s'
        }}>Set Timer</button>
      </form>
    </div>
  );
};

export default PomodoroTimer;
