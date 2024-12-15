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
