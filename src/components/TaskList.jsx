import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const TaskList = () => {
  // Initialize state with tasks from cookies (if available)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = Cookies.get("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, text: "Complete React project", priority: "High", schedule: "2024-12-16", completed: false },
      { id: 2, text: "Plan team meeting", priority: "Medium", schedule: "2024-12-17", completed: false },
    ];
  });

  const [newTask, setNewTask] = useState({ text: "", priority: "Low", schedule: "" });

  // Update the cookie whenever tasks are updated
  useEffect(() => {
    Cookies.set("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.text && newTask.schedule) {
      const newTaskObject = {
        id: tasks.length + 1,
        text: newTask.text,
        priority: newTask.priority,
        schedule: newTask.schedule,
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask({ text: "", priority: "Low", schedule: "" });
    }
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
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "30px",
          color: "#00ffcc",
          textShadow: "0 4px 10px rgba(0, 255, 255, 0.5)",
          letterSpacing: "2px",
        }}
      >
        Task List
      </h1>

      <div style={{ width: "100%", maxWidth: "800px" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "20px" }}>Your Tasks</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                padding: "20px",
                borderRadius: "10px",
                background: "#1c1c1c",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                borderLeft: `5px solid ${
                  task.priority === "High"
                    ? "red"
                    : task.priority === "Medium"
                    ? "orange"
                    : "green"
                }`,
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  style={{ marginRight: "10px" }}
                />
                <span
                  style={{
                    fontSize: "1.2rem",
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#4CAF50" : "#fff",
                  }}
                >
                  {task.text}
                </span>
              </div>
              <p style={{ fontSize: "0.9rem", margin: "5px 0", color: "#aaa" }}>
                Priority: <span style={{ fontWeight: "bold" }}>{task.priority}</span>
              </p>
              <p style={{ fontSize: "0.9rem", margin: "5px 0", color: "#aaa" }}>
                Scheduled: {task.schedule}
              </p>
            </div>
          ))}
        </div>

        {/* Add New Task Form */}
        <form
          onSubmit={addTask}
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#1c1c1c",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          }}
        >
          <input
            type="text"
            name="text"
            value={newTask.text}
            onChange={handleInputChange}
            placeholder="Task description"
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#222",
              color: "#fff",
            }}
            required
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#222",
              color: "#fff",
            }}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input
            type="date"
            name="schedule"
            value={newTask.schedule}
            onChange={handleInputChange}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#222",
              color: "#fff",
            }}
            required
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
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#00ffcc";
              e.currentTarget.style.color = "#111";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#00ffcc";
            }}
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskList;
