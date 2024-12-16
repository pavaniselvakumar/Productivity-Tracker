<<<<<<< HEAD
import React from "react";

const ResourceLibrary = () => {
  const resources = [
    { 
      id: 1, 
      title: "Pomodoro Technique Guide", 
      link: "https://www.mindtools.com/pages/article/newHTE_03.htm" 
    },
    { 
      id: 2, 
      title: "Time Management Tips", 
      link: "https://www.lifehack.org/articles/productivity/25-time-management-tips-to-boost-your-productivity.html" 
    },
    { 
      id: 3, 
      title: "How to Boost Productivity", 
      link: "https://www.verywellmind.com/ways-to-boost-your-productivity-5186742" 
    },
    { 
      id: 4, 
      title: "Setting SMART Goals", 
      link: "https://www.mindtools.com/pages/article/smart-goals.htm" 
    },
    { 
      id: 5, 
      title: "Weekly Planner Templates", 
      link: "https://www.smartsheet.com/weekly-planner-templates" 
    },
    { 
      id: 6, 
      title: "Effective Study Techniques", 
      link: "https://www.edutopia.org/blog/effective-study-techniques-students" 
    },
    { 
      id: 7, 
      title: "How to Stay Organized in College", 
      link: "https://www.collegexpress.com/articles-and-advice/student-life/blog/how-stay-organized-college/" 
    },
    { 
      id: 8, 
      title: "Stress Management Tips for Students", 
      link: "https://www.studentsuccess.edu.au/stress-management-for-students/" 
    },
    { 
      id: 9, 
      title: "Mindfulness for Students", 
      link: "https://www.psychologytoday.com/us/basics/mindfulness/mindfulness-for-students" 
    },
    { 
      id: 10, 
      title: "Study Hacks for Better Focus", 
      link: "https://www.verywellmind.com/study-hacks-for-better-focus-5182287" 
    },
  ];

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      textAlign: 'center',
      padding: '40px',
      background: 'linear-gradient(135deg, #2c2c2c, #111)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
    }}>
      <h2 style={{
        fontSize: '3rem',
        marginBottom: '20px',
        textShadow: '0 4px 10px rgba(0, 255, 255, 0.3)',
      }}>Resource Library</h2>
      <p style={{
        fontSize: '1.2rem',
        marginBottom: '40px',
        maxWidth: '800px',
        lineHeight: '1.6',
      }}>
        Explore useful resources to boost productivity, manage time effectively, and improve study habits. Select a link below to learn more.
      </p>
      <ul style={{
        listStyle: 'none',
        padding: '0',
        maxWidth: '1000px',
        width: '100%',
      }}>
        {resources.map(resource => (
          <li key={resource.id} style={{
            padding: '15px 20px',
            borderRadius: '8px',
            marginBottom: '10px',
            backgroundColor: '#1a1a1a',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s, background-color 0.3s',
          }}>
            <a 
              href={resource.link}
              style={{
                color: '#00ffcc',
                textDecoration: 'none',
                fontSize: '1.2rem',
                display: 'block',
                transition: 'color 0.3s',
              }}
              target="_blank"  // Ensures the link opens in a new tab
              rel="noopener noreferrer"  // Security measure to prevent malicious actions
            >
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceLibrary;
=======
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
    <div
      style={{
        fontFamily: "Poppins",
        textAlign: "center",
        padding: "30px",
        background: "linear-gradient(135deg, #1c1c1c, #333)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
        }}
      >
        Resource Library
      </h2>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "30px",
        }}
      >
        Access helpful resources and productivity guides.
      </p>
      <input
        type="text"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          background: "#222",
          color: "#fff",
          marginBottom: "20px",
          width: "80%",
        }}
      />
      {filteredResources.length > 0 ? (
        <ul style={{ listStyle: "none", padding: "0" }}>
          {filteredResources.map((resource) => (
            <li
              key={resource.id}
              style={{
                padding: "10px 20px",
                borderBottom: "1px solid #444",
                transition: "background-color 0.3s",
              }}
            >
              <a
                href={resource.link}
                style={{
                  color: "#00ffcc",
                  textDecoration: "none",
                  fontSize: "1.2rem",
                }}
              >
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#ff6f6f", fontSize: "1.2rem" }}>No resources found.</p>
      )}
    </div>
  );
};

export default ResourceLibrary;
>>>>>>> b57fd23e636ddf0fdb0ab11a2ae72db3408766e2
