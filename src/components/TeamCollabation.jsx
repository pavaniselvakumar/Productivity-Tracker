import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs

const TeamCollaboration = () => {
  // State to hold team members (static list, no need for setMembers)
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

  // Handle input change for task and message
  const handleMessageChange = (e) => setNewMessage(e.target.value);
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.assignedTo) {
      setTasks([...tasks, { ...newTask, id: uuidv4() }]);
      setNewTask({ title: "", assignedTo: "", status: "Not Started" });
    } else {
      alert("Please fill out the task details.");
    }
  };

  // Add a new message to the discussion forum
  const handleAddMessage = (e) => {
    e.preventDefault();
    if (newMessage) {
      setMessages([...messages, { id: uuidv4(), sender: "You", text: newMessage }]);
      setNewMessage("");
    } else {
      alert("Please type a message.");
    }
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
    teamMembersList: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "800px",
      marginBottom: "30px",
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
    messageBox: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "800px",
      marginTop: "30px",
    },
    messageItem: {
      padding: "10px",
      background: "#1c1c1c",
      marginBottom: "10px",
      borderRadius: "8px",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Team Collaboration</h1>
        <p style={styles.subtitle}>
          Collaborate effectively with your team members on projects and tasks.
        </p>
      </div>

      {/* Team Members */}
      <div style={styles.teamMembersList}>
        <h2>Team Members</h2>
        {members.map((member) => (
          <div key={member.id} style={styles.taskItem}>
            <span>{member.name} ({member.role})</span>
          </div>
        ))}
      </div>

      {/* Task List */}
      <div style={styles.taskList}>
        <h2>Tasks</h2>
        {tasks.map((task) => (
          <div key={task.id} style={styles.taskItem}>
            <span>
              <strong>{task.title}</strong> - Assigned to {task.assignedTo} ({task.status})
            </span>
          </div>
        ))}
      </div>

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

      {/* Discussion Forum */}
      <div style={styles.messageBox}>
        <h2>Discussion Forum</h2>
        {messages.map((message) => (
          <div key={message.id} style={styles.messageItem}>
            <strong>{message.sender}</strong>: {message.text}
          </div>
        ))}

        {/* Add New Message */}
        <form onSubmit={handleAddMessage} style={styles.form}>
          <textarea
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Type your message here..."
            style={{ ...styles.input, height: "100px" }}
          />
          <button type="submit" style={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default TeamCollaboration;

