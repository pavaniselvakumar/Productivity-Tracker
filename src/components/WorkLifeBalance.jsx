import React from "react";

const WorkLifeBalance = () => {
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
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    title: {
      fontSize: "3rem",
      marginBottom: "10px",
      textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
      letterSpacing: "3px",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#00ffcc",
      textTransform: "uppercase",
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "30px",
      width: "100%",
      maxWidth: "1200px",
    },
    card: {
      padding: "20px",
      background: "#1c1c1c",
      borderRadius: "20px",
      border: "2px solid transparent",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.4s ease",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    },
    cardHover: {
      transform: "scale(1.05)",
      boxShadow: "0 6px 18px rgba(0, 255, 255, 0.4)",
      border: "2px solid #00ffcc",
    },
    cardTitle: {
      fontSize: "1.4rem",
      textAlign: "center",
      fontWeight: "600",
      color: "#00ffcc",
      textTransform: "uppercase",
    },
    cardText: {
      fontSize: "0.9rem",
      color: "#ddd",
      lineHeight: "1.4",
      marginTop: "10px",
    },
    cardGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(to right, #00ffcc, #00d1b2)",
      opacity: 0.1,
      transition: "opacity 0.4s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Work-Life Balance for Students</h1>
        <p style={styles.subtitle}>
          Plan your time effectively and strike the right balance between studies, activities, and personal life.
        </p>
      </div>
      <div style={styles.cardsContainer}>
        <div
          style={styles.card}
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
          <h3 style={styles.cardTitle}>Academic Goals</h3>
          <p style={styles.cardText}>
            Track your assignments, projects, and exam preparations to stay on top of your studies.
          </p>
          <div style={styles.cardGradient}></div>
        </div>
        <div
          style={styles.card}
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
          <h3 style={styles.cardTitle}>Personal Time</h3>
          <p style={styles.cardText}>
            Dedicate time for relaxation, hobbies, and self-improvement to stay motivated and stress-free.
          </p>
          <div style={styles.cardGradient}></div>
        </div>
        <div
          style={styles.card}
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
          <h3 style={styles.cardTitle}>Health & Well-being</h3>
          <p style={styles.cardText}>
            Schedule time for physical activities, mental health breaks, and a good sleep routine.
          </p>
          <div style={styles.cardGradient}></div>
        </div>
      </div>
    </div>
  );
};

export default WorkLifeBalance;
