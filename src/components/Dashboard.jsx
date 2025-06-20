import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const features = [
    { name: "Task List", path: "/task-list" },
    { name: "Goal Tracker", path: "/goal-tracker" },
    { name: "Daily Planner", path: "/daily-planner" },
    { name: "Performance Analytics", path: "/performance-analytics" },
    { name: "Habit Tracker", path: "/habit-tracker" },
    { name: "Focus Mode", path: "/focus-mode" },
    { name: "Work-Life Balance", path: "/work-life-balance" },
    { name: "Weekly Overview", path: "/weekly-overview" },
    { name: "Reflection Journal", path: "/reflection-journal" },
  ];

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
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "40px",
          textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
          letterSpacing: "3px",
        }}
      >
        PRODUCTIVITY TRACKER - DASHBOARD
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.path}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              height: "150px",
              background: "#1c1c1c",
              borderRadius: "20px",
              border: "2px solid transparent",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.4s ease",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 255, 255, 0.4)";
              e.currentTarget.style.border = "2px solid #00ffcc";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
              e.currentTarget.style.border = "2px solid transparent";
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                textAlign: "center",
                fontWeight: "600",
                color: "#00ffcc",
                textTransform: "uppercase",
              }}
            >
              {feature.name}
            </h3>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(to right, #00ffcc, #00d1b2)",
                opacity: 0.1,
                transition: "opacity 0.4s ease",
              }}
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
