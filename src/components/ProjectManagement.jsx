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



