import React, { useState } from "react";

const WorkLifeBalance = () => {
  const [activeTopic, setActiveTopic] = useState(null);

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
  };

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
      margin: "20px 0",
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
      color: "#fff",
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
    content: {
      fontSize: "1rem",
      color: "#ddd",
      lineHeight: "1.4",
      marginTop: "20px",
      textAlign: "center",
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
          onClick={() => handleTopicClick("Academic Goals")}
        >
          <h3 style={styles.cardTitle}>Academic Goals</h3>
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
          onClick={() => handleTopicClick("Personal Time")}
        >
          <h3 style={styles.cardTitle}>Personal Time</h3>
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
          onClick={() => handleTopicClick("Health & Well-being")}
        >
          <h3 style={styles.cardTitle}>Health & Well-being</h3>
          <div style={styles.cardGradient}></div>
        </div>
      </div>
      {activeTopic && (
        <div style={styles.content}>
          {activeTopic === "Academic Goals" && (
            <>
              <h2 style={{ color: "#00ffcc" }}>Academic Goals</h2>
              <p>Stay focused and achieve your academic objectives with these tips and tools.</p>
              <ul>
                <li>Track your assignments and deadlines effectively using a planner or digital tool.</li>
                <li>Set realistic study goals and break them down into manageable tasks.</li>
                <li>Utilize resources like textbooks, online courses, and libraries to enhance your learning.</li>
                <li>Participate actively in class and ask questions if you need clarification.</li>
                <li>Take regular breaks to maintain focus and avoid burnout.</li>
              </ul>
            </>
          )}
          {activeTopic === "Personal Time" && (
            <>
              <h2 style={{ color: "#00ffcc" }}>Personal Time</h2>
              <p>Balance your time between study and leisure with these tips.</p>
              <ul>
                <li>Dedicate time for hobbies that make you happy and relax your mind.</li>
                <li>Engage in physical activities like walking, yoga, or a workout to keep healthy.</li>
                <li>Set aside time for social interactions with friends and family.</li>
                <li>Read books, listen to music, or watch movies that you enjoy.</li>
                <li>Plan vacations or day trips to new places to break the monotony.</li>
              </ul>
            </>
          )}
          {activeTopic === "Health & Well-being" && (
            <>
              <h2 style={{ color: "#00ffcc" }}>Health & Well-being</h2>
              <p>Focus on your physical and mental health with these guidelines.</p>
              <ul>
                <li>Maintain a balanced diet with nutritious foods.</li>
                <li>Exercise regularly, whether through walking, gym, or other activities.</li>
                <li>Get enough sleep each night for better concentration and energy.</li>
                <li>Practice mindfulness and meditation to reduce stress.</li>
                <li>Stay hydrated by drinking plenty of water throughout the day.</li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkLifeBalance;
