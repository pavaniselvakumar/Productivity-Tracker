<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';  // Importing chart.js

const PerformanceAnalytics = () => {
  const [cookies, setCookies] = useCookies(["goals", "streaks", "weekStart"]);
  const [goals, setGoals] = useState(cookies.goals || []);
  const [streaks, setStreaks] = useState(cookies.streaks || Array(7).fill(false));
  const [weekStart, setWeekStart] = useState(cookies.weekStart || new Date().getDay());
  const [newGoal, setNewGoal] = useState({ name: "", category: "", completed: false });
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    setCookies("goals", goals);
    setCookies("streaks", streaks);
    setCookies("weekStart", weekStart);
  }, [goals, streaks, weekStart, setCookies]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Weekly Goals Completion Data
  const weeklyGoalsCompleted = goals.filter((goal) => goal.completed).length;
  const totalGoals = goals.length;
  const completionPercentage = totalGoals ? Math.round((weeklyGoalsCompleted / totalGoals) * 100) : 0;

  // Data for Line Chart: Weekly Streak Performance
  const streakData = streaks.map((streak, index) => (streak ? 1 : 0));
  const chartData = {
    labels: Array.from({ length: 7 }, (_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: 'Streak Progress',
        data: streakData,
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1,
      },
    ],
  };

  // Pie chart for Goal Category Distribution
  const goalCategories = goals.reduce((acc, goal) => {
    acc[goal.category] = (acc[goal.category] || 0) + 1;
    return acc;
  }, {});
  
  const categoryData = {
    labels: Object.keys(goalCategories),
    datasets: [
      {
        data: Object.values(goalCategories),
        backgroundColor: ['#ff5733', '#33ff57', '#3357ff'],
      },
    ],
  };

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.category) {
      alert("Please enter goal name and category");
      return;
    }

    setGoals([...goals, newGoal]);
    setNewGoal({ name: "", category: "", completed: false });
  };

  const handleDeleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleEditGoal = (index) => {
    setEditingGoal(index);
    setNewGoal(goals[index]);
  };

  const handleUpdateGoal = () => {
    if (!newGoal.name || !newGoal.category) {
      alert("Please enter goal name and category");
      return;
    }

    const updatedGoals = [...goals];
    updatedGoals[editingGoal] = newGoal;
    setGoals(updatedGoals);
    setEditingGoal(null);
    setNewGoal({ name: "", category: "", completed: false });
  };

  const handleGoalCompletion = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setGoals(updatedGoals);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", padding: "50px", background: "#111", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", color: "#fff" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#00ffcc", textShadow: "0 4px 10px rgba(0, 255, 255, 0.5)" }}>Performance Analytics</h1>
      <h2 style={{ marginBottom: "30px", color: "#aaa" }}>{today}</h2>

      {/* Weekly Goals Progress */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Weekly Goals Progress</h3>
        <p style={{ color: "#aaa" }}>
          Goals completed this week: {weeklyGoalsCompleted}/{totalGoals}
        </p>
        <p style={{ color: "#aaa" }}>Completion: {completionPercentage}%</p>
      </section>

      {/* Line Chart - Streak Performance */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Streak Progress (Last 7 Days)</h3>
        <Line data={chartData} />
      </section>

      {/* Pie Chart - Goal Category Distribution */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Goal Categories</h3>
        <div style={{ width: "100%", maxWidth: "600px", height: "300px" }}>
          <Pie data={categoryData} />
        </div>
      </section>

      {/* Goal Management Section */}
      <section style={{ marginTop: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Manage Goals</h3>
        <input
          type="text"
          placeholder="Enter goal name"
          value={newGoal.name}
          onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
          style={{ padding: "10px", marginBottom: "10px", width: "100%", maxWidth: "600px", border: "1px solid #ccc", borderRadius: "5px" }}
        />
        <input
          type="text"
          placeholder="Enter category"
          value={newGoal.category}
          onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
          style={{ padding: "10px", marginBottom: "10px", width: "100%", maxWidth: "600px", border: "1px solid #ccc", borderRadius: "5px" }}
        />
        <button
          onClick={editingGoal !== null ? handleUpdateGoal : handleAddGoal}
          style={{ backgroundColor: "#00ffcc", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          {editingGoal !== null ? "Update Goal" : "Add Goal"}
        </button>

        {/* Goal List */}
        <ul style={{ marginTop: "20px", padding: "0", listStyleType: "none", width: "100%", maxWidth: "600px" }}>
          {goals.map((goal, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#222",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{goal.name} ({goal.category})</span>
              <div>
                <button
                  onClick={() => handleGoalCompletion(index)}
                  style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: goal.completed ? "#4CAF50" : "#ff5733", color: "#fff", border: "none", borderRadius: "5px" }}
                >
                  {goal.completed ? "Completed" : "Mark as Completed"}
                </button>
                <button
                  onClick={() => handleEditGoal(index)}
                  style={{ padding: "5px 10px", backgroundColor: "#ffcc00", color: "#fff", border: "none", borderRadius: "5px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteGoal(index)}
                  style={{ marginLeft: "10px", padding: "5px 10px", backgroundColor: "#e74c3c", color: "#fff", border: "none", borderRadius: "5px" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PerformanceAnalytics;
=======
import React from "react";

const PerformanceAnalytics = () => {
  return (
    <div>
      <h2>Performance Analytics</h2>
      <p>Analyze your productivity and performance here.</p>
    </div>
  );
};

export default PerformanceAnalytics;
>>>>>>> b57fd23e636ddf0fdb0ab11a2ae72db3408766e2
