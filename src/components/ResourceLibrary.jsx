import React, { useState } from "react";

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const resources = [
    { id: 1, title: "Pomodoro Technique Guide", link: "#" },
    { id: 2, title: "Time Management Tips", link: "#" },
    { id: 3, title: "How to Boost Productivity", link: "#" },
    { id: 4, title: "Setting SMART Goals", link: "#" },
    { id: 5, title: "Weekly Planner Templates", link: "#" },
  ];

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: 'Poppins', 
      textAlign: 'center', 
      padding: '30px', 
      background: 'linear-gradient(135deg, #1c1c1c, #333)', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: '#fff'
    }}>
      <h2 style={{
        fontSize: '2.5rem', 
        marginBottom: '20px', 
        textShadow: '0 4px 10px rgba(0, 255, 255, 0.3)'
      }}>Resource Library</h2>
      <p style={{
        fontSize: '1.2rem', 
        marginBottom: '30px'
      }}>Access helpful resources and productivity guides.</p>
      <input 
        type="text" 
        placeholder="Search resources..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{
          padding: '10px', 
          borderRadius: '5px', 
          border: '1px solid #ccc', 
          background: '#222', 
          color: '#fff', 
          marginBottom: '20px', 
          width: '80%'
        }}
      />
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {filteredResources.map(resource => (
          <li key={resource.id} style={{
            padding: '10px 20px', 
            borderBottom: '1px solid #444', 
            transition: 'background-color 0.3s'
          }}>
            <a href={resource.link} style={{
              color: '#00ffcc', 
              textDecoration: 'none', 
              fontSize: '1.2rem'
            }}>{resource.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceLibrary;
