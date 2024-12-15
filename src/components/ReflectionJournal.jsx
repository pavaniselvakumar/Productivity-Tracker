import React, { useState } from "react";

const ReflectionJournal = () => {
  // State to track journal entries
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [mood, setMood] = useState("Neutral");
  
  // Handle text change for the journal entry
  const handleEntryChange = (e) => setCurrentEntry(e.target.value);
  
  // Handle mood change
  const handleMoodChange = (e) => setMood(e.target.value);

  // Add a new journal entry
  const handleAddEntry = (e) => {
    e.preventDefault();
    if (currentEntry.trim()) {
      const newEntry = {
        id: entries.length + 1,
        text: currentEntry,
        mood: mood,
        date: new Date().toLocaleString(),
      };
      setEntries([...entries, newEntry]);
      setCurrentEntry(""); // Reset the current entry field
      setMood("Neutral"); // Reset the mood to neutral
    } else {
      alert("Please write a reflection before submitting.");
    }
  };

  // Delete an entry
  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
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
    title: {
      fontSize: "3rem",
      marginBottom: "10px",
      textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
      letterSpacing: "3px",
    },
    form: {
      marginBottom: "20px",
      textAlign: "center",
    },
    input: {
      padding: "10px",
      margin: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      background: "#1c1c1c",
      color: "#fff",
      width: "300px",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      background: "#00ffcc",
      color: "#111",
      cursor: "pointer",
      margin: "10px",
    },
    journalContainer: {
      marginTop: "30px",
      maxWidth: "600px",
      width: "100%",
    },
    journalEntry: {
      padding: "15px",
      background: "#1c1c1c",
      marginBottom: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    },
    moodSelector: {
      padding: "10px",
      margin: "10px",
      borderRadius: "5px",
      background: "#1c1c1c",
      color: "#fff",
      width: "320px",
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reflection Journal</h1>

      {/* Journal Entry Form */}
      <form onSubmit={handleAddEntry} style={styles.form}>
        <textarea
          placeholder="Write your reflection..."
          value={currentEntry}
          onChange={handleEntryChange}
          style={{ ...styles.input, height: "100px" }}
        />
        <select value={mood} onChange={handleMoodChange} style={styles.moodSelector}>
          <option value="Neutral">Neutral</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Angry">Angry</option>
          <option value="Excited">Excited</option>
        </select>
        <button type="submit" style={styles.button}>Save Entry</button>
      </form>

      {/* Display Saved Entries */}
      <div style={styles.journalContainer}>
        <h2>Past Reflections</h2>
        {entries.map((entry) => (
          <div key={entry.id} style={styles.journalEntry}>
            <p>{entry.text}</p>
            <p><strong>Mood:</strong> {entry.mood}</p>
            <p><strong>Date:</strong> {entry.date}</p>
            <button
              onClick={() => handleDeleteEntry(entry.id)}
              style={{ ...styles.button, background: "#ff5c5c" }}
            >
              Delete Entry
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReflectionJournal;
