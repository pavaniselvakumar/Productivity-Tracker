<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie"; // Import js-cookie for cookie management

const TeamCollaboration = () => {
  // Get tasks and team members visibility from session storage or set default
  const savedTasks = JSON.parse(sessionStorage.getItem("tasks")) || [];
  const savedShowData = JSON.parse(sessionStorage.getItem("showData")) || false;

  const [tasks, setTasks] = useState(savedTasks);
  const [showData, setShowData] = useState(savedShowData);
  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "",
    status: "Not Started",
  });

  // Handle task input change
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Add a new task and save to sessionStorage
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.assignedTo) {
      const updatedTasks = [...tasks, { ...newTask, id: uuidv4() }];
      setTasks(updatedTasks);
      setNewTask({ title: "", assignedTo: "", status: "Not Started" });
      setShowData(true);
      sessionStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save tasks to sessionStorage
      sessionStorage.setItem("showData", JSON.stringify(true)); // Set showData to true
      Cookies.set("showData", true, { expires: 1 }); // Save showData in cookies for persistence across sessions
    } else {
      alert("Please fill out the task details.");
    }
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    sessionStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save updated tasks to sessionStorage
  };

  // Styles for the UI
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
    taskList: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "800px",
      marginBottom: "30px",
    },
    taskItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      marginBottom: "15px",
      background: "#1c1c1c",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
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
    },
    deleteButton: {
      padding: "5px 10px",
      backgroundColor: "#ff4d4d",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Team Collaboration</h1>
        <p style={styles.subtitle}>
          Collaborate effectively with your team members on tasks.
        </p>
      </div>

      {/* Task List (conditionally rendered based on showData) */}
      {showData && (
        <div style={styles.taskList}>
          <h2>Tasks</h2>
          {tasks.map((task) => (
            <div key={task.id} style={styles.taskItem}>
              <span>
                <strong>{task.title}</strong> - Assigned to {task.assignedTo} ({task.status})
              </span>
              <button 
                onClick={() => handleDeleteTask(task.id)} 
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Task Form */}
      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleTaskChange}
          style={styles.input}
        />
        <input
          type="text"
          name="assignedTo"
          placeholder="Assign to (Team Member)"
          value={newTask.assignedTo}
          onChange={handleTaskChange}
          style={styles.input}
        />
        <select
          name="status"
          value={newTask.status}
          onChange={handleTaskChange}
          style={styles.input}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" style={styles.button}>Add Task</button>
      </form>
    </div>
  );
};

export default TeamCollaboration;
=======
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TeamCollaboration = () => {
  const members = [
    { id: uuidv4(), name: "John Doe", role: "Team Lead" },
    { id: uuidv4(), name: "Jane Smith", role: "Developer" },
    { id: uuidv4(), name: "Alice Johnson", role: "Designer" },
  ];

  const [tasks, setTasks] = useState([
    { id: uuidv4(), title: "Design Homepage", assignedTo: "Alice", status: "In Progress" },
    { id: uuidv4(), title: "Develop API", assignedTo: "John", status: "Not Started" },
  ]);

  const [messages, setMessages] = useState([
    { id: uuidv4(), sender: "John", text: "Can we finalize the homepage design?" },
    { id: uuidv4(), sender: "Alice", text: "Sure, I'll send the design by tomorrow." },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [newTask, setNewTask] = useState({ title: "", assignedTo: "", status: "Not Started" });

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.assignedTo) {
      setTasks([...tasks, { ...newTask, id: uuidv4() }]);
      setNewTask({ title: "", assignedTo: "", status: "Not Started" });
    } else {
      alert("Please fill out the task details.");
    }
  };

  const handleAddMessage = (e) => {
    e.preventDefault();
    if (newMessage) {
      setMessages([...messages, { id: uuidv4(), sender: "You", text: newMessage }]);
      setNewMessage("");
    } else {
      alert("Please type a message.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        padding: "50px",
        background: "#111",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "3rem", textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)" }}>
          Team Collaboration
        </h1>
        <p style={{ fontSize: "1rem", color: "#00ffcc", textTransform: "uppercase" }}>
          Collaborate effectively with your team.
        </p>
      </header>

      {/* Team Members Section */}
      <section style={{ width: "100%", maxWidth: "800px", marginBottom: "30px" }}>
        <h2>Team Members</h2>
        {members.map((member) => (
          <div
            key={member.id}
            style={{
              padding: "10px 20px",
              marginBottom: "10px",
              background: "#1c1c1c",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {member.name} <span>({member.role})</span>
          </div>
        ))}
      </section>

      {/* Task Management Section */}
      <section style={{ width: "100%", maxWidth: "800px", marginBottom: "30px" }}>
        <h2>Tasks</h2>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              padding: "10px 20px",
              marginBottom: "10px",
              background: task.status === "Completed" ? "#d4edda" : "#1c1c1c",
              color: task.status === "Completed" ? "#155724" : "#fff",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              <strong>{task.title}</strong> - {task.assignedTo} ({task.status})
            </span>
          </div>
        ))}

        {/* Add New Task */}
        <form onSubmit={handleAddTask} style={{ marginTop: "20px" }}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleTaskChange}
            style={{
              marginBottom: "10px",
              padding: "10px",
              width: "100%",
              maxWidth: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#1c1c1c",
              color: "#fff",
            }}
          />
          <input
            type="text"
            name="assignedTo"
            placeholder="Assign to"
            value={newTask.assignedTo}
            onChange={handleTaskChange}
            style={{
              marginBottom: "10px",
              padding: "10px",
              width: "100%",
              maxWidth: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#1c1c1c",
              color: "#fff",
            }}
          />
          <select
            name="status"
            value={newTask.status}
            onChange={handleTaskChange}
            style={{
              marginBottom: "10px",
              padding: "10px",
              width: "100%",
              maxWidth: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#1c1c1c",
              color: "#fff",
            }}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              background: "#00ffcc",
              color: "#111",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </form>
      </section>

      {/* Discussion Forum Section */}
      <section style={{ width: "100%", maxWidth: "800px" }}>
        <h2>Discussion Forum</h2>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              padding: "10px",
              marginBottom: "10px",
              background: "#1c1c1c",
              borderRadius: "8px",
              color: "#fff",
            }}
          >
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}

        {/* Add New Message */}
        <form onSubmit={handleAddMessage} style={{ marginTop: "20px" }}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              marginBottom: "10px",
              padding: "10px",
              width: "100%",
              maxWidth: "800px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#1c1c1c",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              background: "#00ffcc",
              color: "#111",
              cursor: "pointer",
            }}
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default TeamCollaboration;
>>>>>>> b57fd23e636ddf0fdb0ab11a2ae72db3408766e2
