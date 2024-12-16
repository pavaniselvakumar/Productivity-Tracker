import React, { useState, useEffect } from "react";

const WeeklyOverview = () => {
  const [plans, setPlans] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [newPlan, setNewPlan] = useState({
    day: "",
    time: "",
    activity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (newPlan.day && newPlan.time && newPlan.activity) {
      const updatedPlans = {
        ...plans,
        [newPlan.day]: [...plans[newPlan.day], newPlan],
      };
      setPlans(updatedPlans);

      // Save to sessionStorage
      sessionStorage.setItem("weeklyPlans", JSON.stringify(updatedPlans));

      // Save to cookies
      document.cookie = `weeklyPlans=${JSON.stringify(updatedPlans)}; path=/;`;

      // Reset the form after adding the plan
      setNewPlan({ day: "", time: "", activity: "" });
    } else {
      alert("Please fill in all the fields!");
    }
  };

  const handleDeletePlan = (day, index) => {
    const updatedPlans = {
      ...plans,
      [day]: plans[day].filter((_, i) => i !== index),
    };
    setPlans(updatedPlans);

    // Save the updated plans to sessionStorage and cookies
    sessionStorage.setItem("weeklyPlans", JSON.stringify(updatedPlans));
    document.cookie = `weeklyPlans=${JSON.stringify(updatedPlans)}; path=/;`;
  };

  useEffect(() => {
    const sessionPlans = sessionStorage.getItem("weeklyPlans");
    if (sessionPlans) {
      setPlans(JSON.parse(sessionPlans));
    } else {
      const cookies = document.cookie.split("; ");
      const cookiePlans = cookies.find(cookie => cookie.startsWith("weeklyPlans="));
      if (cookiePlans) {
        const plansData = cookiePlans.split("=")[1];
        setPlans(JSON.parse(plansData));
      }
    }
  }, []);

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
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "30px",
    },
    input: {
      padding: "10px",
      margin: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "300px",
      background: "#1c1c1c",
      color: "#fff",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      background: "#00ffcc",
      color: "#111",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    buttonHover: {
      background: "#00d1b2",
    },
    weeklySchedule: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "20px",
      width: "100%",
      maxWidth: "1200px",
    },
    dayCard: {
      padding: "20px",
      background: "#1c1c1c",
      borderRadius: "10px",
      color: "#fff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
      display: "flex",
      flexDirection: "column",
    },
    dayTitle: {
      fontSize: "1.4rem",
      fontWeight: "600",
      color: "#00ffcc",
      textAlign: "center",
    },
    plan: {
      marginTop: "10px",
      background: "#333",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "10px",
    },
    deleteButton: {
      marginTop: "5px",
      padding: "5px 10px",
      background: "#ff4d4d",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Weekly Overview</h1>
        <p style={styles.subtitle}>
          Plan your activities and tasks for the entire week.
        </p>
      </div>

      {/* Form to add a new plan */}
      <form onSubmit={handleAddPlan} style={styles.form}>
        <input
          type="text"
          name="time"
          placeholder="Time"
          value={newPlan.time}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="activity"
          placeholder="Activity"
          value={newPlan.activity}
          onChange={handleInputChange}
          style={styles.input}
        />
        <select
          name="day"
          value={newPlan.day}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">Select Day</option>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.target.style.background = styles.buttonHover.background}
          onMouseOut={(e) => e.target.style.background = styles.button.background}
        >
          Add Plan
        </button>
      </form>

      {/* Display the weekly schedule */}
      <div style={styles.weeklySchedule}>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <div key={day} style={styles.dayCard}>
            <h3 style={styles.dayTitle}>{day}</h3>
            {plans[day].length === 0 ? (
              <p>No plans for today!</p>
            ) : (
              plans[day].map((plan, index) => (
                <div key={index} style={styles.plan}>
                  <p><strong>Time:</strong> {plan.time}</p>
                  <p><strong>Activity:</strong> {plan.activity}</p>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeletePlan(day, index)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyOverview;
