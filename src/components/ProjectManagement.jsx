<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const ProjectManagement = () => {
  // Using cookies to store the list of projects
  const [cookies, setCookies] = useCookies(["projects"]);
  const [projects, setProjects] = useState(() => {
    // Check if there is a stored value in sessionStorage or cookies
    const savedProjects = sessionStorage.getItem("projects");
    if (savedProjects) {
      return JSON.parse(savedProjects);
    } else if (cookies.projects) {
      return JSON.parse(cookies.projects);
    } else {
      return [];
    }
  });

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  // Effect to update sessionStorage and cookies whenever the projects list changes
  useEffect(() => {
    // Save to sessionStorage
    sessionStorage.setItem("projects", JSON.stringify(projects));
    // Save to cookies (expires in 7 days)
    setCookies("projects", JSON.stringify(projects), { path: "/", maxAge: 7 * 24 * 60 * 60 });
  }, [projects, setCookies]);

  // Add a new project
  const addProject = () => {
    if (newProject.name.trim() && newProject.description.trim() && newProject.deadline.trim()) {
      const updatedProjects = [
        ...projects,
        { ...newProject, id: Date.now() },
      ];
      setProjects(updatedProjects);
      setNewProject({ name: "", description: "", deadline: "" });
    }
  };

  // Delete a project
  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", padding: "50px", background: "#111", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#00ffcc", marginBottom: "20px" }}>Project Management</h1>
      
      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Project Name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          style={{ padding: "10px", marginRight: "10px", borderRadius: "8px", border: "2px solid #333", background: "#1c1c1c", color: "#fff" }}
        />
        <input
          type="text"
          placeholder="Project Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          style={{ padding: "10px", marginRight: "10px", borderRadius: "8px", border: "2px solid #333", background: "#1c1c1c", color: "#fff" }}
        />
        <input
          type="date"
          value={newProject.deadline}
          onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
          style={{ padding: "10px", marginRight: "10px", borderRadius: "8px", border: "2px solid #333", background: "#1c1c1c", color: "#fff" }}
        />
        <button
          onClick={addProject}
          style={{
            padding: "10px 20px",
            background: "transparent",
            color: "#00ffcc",
            border: "2px solid #00ffcc",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Project
        </button>
      </div>
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {projects.map((project) => (
          <li key={project.id} style={{ marginBottom: "15px", color: "#fff" }}>
            <h3 style={{ color: "#00ffcc" }}>{project.name}</h3>
            <p>{project.description}</p>
            <p>Deadline: {project.deadline}</p>
            <button
              onClick={() => deleteProject(project.id)}
              style={{
                padding: "5px 10px",
                background: "transparent",
                color: "#ff3333",
                border: "2px solid #ff3333",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Delete Project
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManagement;



=======
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
>>>>>>> b57fd23e636ddf0fdb0ab11a2ae72db3408766e2
