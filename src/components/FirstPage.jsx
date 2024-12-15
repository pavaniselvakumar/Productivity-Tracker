import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // Change this route if your LoginRegister page has a different path
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
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "4rem",
          marginBottom: "20px",
          color: "#00ffcc",
          textShadow: "0 4px 10px rgba(0, 255, 255, 0.5)",
          letterSpacing: "3px",
        }}
      >
        Welcome to Your Productivity Hub
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          marginBottom: "40px",
          color: "#ddd",
          maxWidth: "600px",
        }}
      >
        Boost your productivity and track your daily habits, goals, and tasks 
        with ease. Start your journey to a better you!
      </p>

      {/* Get Started Button */}
      <button
        onClick={handleGetStarted}
        style={{
          padding: "15px 40px",
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#00ffcc",
          background: "transparent",
          border: "3px solid #00ffcc",
          borderRadius: "30px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "#00ffcc";
          e.currentTarget.style.color = "#111";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#00ffcc";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
