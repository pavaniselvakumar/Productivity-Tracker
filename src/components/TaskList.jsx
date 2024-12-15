import React, { useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: Date.now(), name: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      style={{
        fontFamily: "Poppins",
        textAlign: "center",
        padding: "30px",
        background: "linear-gradient(135deg, #f4f4f4, #e0e0e0)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          textShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          color: "#333",
        }}
      >
        Task List
      </h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px", color: "#555" }}>
        Manage your tasks here.
      </p>
      <div style={{ marginBottom: "20px", width: "80%" }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style={{
            padding: "10px",
            width: "70%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </div>
      {tasks.length > 0 ? (
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            width: "80%",
            textAlign: "left",
          }}
        >
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 20px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginBottom: "10px",
                background: task.completed ? "#d4edda" : "#fff",
                color: task.completed ? "#155724" : "#333",
                transition: "background-color 0.3s",
              }}
            >
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                  flex: "1",
                }}
              >
                {task.name}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  background: "#ff6f6f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  padding: "5px 10px",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "1.2rem", color: "#777" }}>
          No tasks yet. Start by adding a new task above!
        </p>
      )}
    </div>
  );
};

export default TaskList;
