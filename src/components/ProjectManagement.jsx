import React, { useState } from "react";

const ProjectManagement = () => {
  // State to hold the list of projects
  const [projects, setProjects] = useState([]);
  // State for input fields (name, description, and deadline)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to add a new project
  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProject.name && newProject.description && newProject.deadline) {
      setProjects([...projects, newProject]);
      // Reset the form after adding the project
      setNewProject({ name: "", description: "", deadline: "" });
    } else {
      alert("Please fill in all the fields!");
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
    projectList: {
      width: "100%",
      maxWidth: "1200px",
      marginTop: "20px",
    },
    projectCard: {
      padding: "20px",
      background: "#1c1c1c",
      borderRadius: "10px",
      marginBottom: "20px",
      color: "#fff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    },
    projectTitle: {
      fontSize: "1.6rem",
      fontWeight: "600",
      color: "#00ffcc",
    },
    projectDescription: {
      marginTop: "10px",
      fontSize: "1rem",
      color: "#ddd",
    },
    projectDeadline: {
      marginTop: "10px",
      fontSize: "1rem",
      color: "#00d1b2",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Project Management</h1>
        <p style={styles.subtitle}>
          Keep track of your ongoing and upcoming projects.
        </p>
      </div>

      {/* Form to add new project */}
      <form onSubmit={handleAddProject} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={newProject.name}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="description"
          placeholder="Project Description"
          value={newProject.description}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="date"
          name="deadline"
          value={newProject.deadline}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.target.style.background = styles.buttonHover.background}
          onMouseOut={(e) => e.target.style.background = styles.button.background}
        >
          Add Project
        </button>
      </form>

      {/* Display the list of added projects */}
      <div style={styles.projectList}>
        {projects.map((project, index) => (
          <div key={index} style={styles.projectCard}>
            <h3 style={styles.projectTitle}>{project.name}</h3>
            <p style={styles.projectDescription}>{project.description}</p>
            <p style={styles.projectDeadline}>
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
