import React, { useState, useEffect, useRef } from "react";

// Utility to set and get cookies with expiry
const setCookie = (name, value, days = 365) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    JSON.stringify(value)
  )}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return JSON.parse(decodeURIComponent(value));
  }
  return null;
};

const ReflectionJournal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [mood, setMood] = useState("Neutral");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMood, setFilterMood] = useState("All");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [showStats, setShowStats] = useState(false);
  const entryRef = useRef();

  useEffect(() => {
    const savedEntries = getCookie("journalEntries");
    if (savedEntries) setEntries(savedEntries);
    const savedTags = getCookie("journalTags");
    if (savedTags) setTags(savedTags);
    entryRef.current.focus();
  }, []);

  const handleEntryChange = (e) => setCurrentEntry(e.target.value);
  const handleMoodChange = (e) => setMood(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterMoodChange = (e) => setFilterMood(e.target.value);
  const handleFilterTagChange = (e) => setFilterTag(e.target.value);

  const handleTagInputChange = (e) => {
    setCurrentTag(e.target.value.replace(/[^a-zA-Z0-9]/g, ""));
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      const updatedTags = [...tags, currentTag];
      setTags(updatedTags);
      setCookie("journalTags", updatedTags);
      setCurrentTag("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    setCookie("journalTags", updatedTags);
    if (filterTag === tagToRemove) {
      setFilterTag("All");
    }
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    const trimmedEntry = currentEntry.trim();
    if (trimmedEntry.length < 5) {
      alert("Please write a meaningful reflection (at least 5 characters).");
      return;
    }

    const selectedTags = tags.filter(tag => document.getElementById(`tag-${tag}`).checked);

    const newEntry = {
      id: Date.now(),
      text: trimmedEntry,
      mood,
      tags: selectedTags,
      date: new Date().toLocaleString(),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    setCookie("journalEntries", updatedEntries);
    setCurrentEntry("");
    setMood("Neutral");
    
    // Reset tag checkboxes
    tags.forEach(tag => {
      document.getElementById(`tag-${tag}`).checked = false;
    });
  };

  const handleDeleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    setCookie("journalEntries", updatedEntries);
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = entry.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = filterMood === "All" || entry.mood === filterMood;
    const matchesTag = filterTag === "All" || entry.tags.includes(filterTag);
    return matchesSearch && matchesMood && matchesTag;
  });

  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moodOptions = ["Neutral", "Happy", "Sad", "Angry", "Excited", "Anxious", "Grateful", "Tired"];

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: "20px",
      background: "#111",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#fff",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
      letterSpacing: "3px",
    },
    form: {
      marginBottom: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: "600px",
    },
    input: {
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #333",
      background: "#1c1c1c",
      color: "#fff",
      width: "100%",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      background: "#00ffcc",
      color: "#111",
      cursor: "pointer",
      margin: "10px 0",
      fontWeight: "bold",
      transition: "all 0.3s ease",
    },
    journalEntry: {
      padding: "20px",
      background: "#1c1c1c",
      marginBottom: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
      width: "100%",
      maxWidth: "600px",
    },
    moodSelector: {
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      background: "#1c1c1c",
      color: "#fff",
      width: "100%",
    },
    deleteButton: {
      padding: "5px 10px",
      backgroundColor: "#ff4d4d",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
    charCount: {
      fontSize: "0.85rem",
      color: "#aaa",
      alignSelf: "flex-end",
    },
    filterContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      width: "100%",
      maxWidth: "600px",
      marginBottom: "20px",
    },
    filterItem: {
      flex: "1",
      margin: "5px",
      minWidth: "180px",
    },
    entriesList: {
      width: "100%",
      maxWidth: "600px",
      marginTop: "20px",
    },
    tag: {
      display: "inline-block",
      backgroundColor: "#2c2c2c",
      color: "#00ffcc",
      padding: "3px 8px",
      margin: "2px",
      borderRadius: "10px",
      fontSize: "0.8rem",
    },
    tagContainer: {
      marginTop: "10px",
      width: "100%",
    },
    tagInputContainer: {
      display: "flex",
      marginBottom: "10px",
      width: "100%",
    },
    tagInput: {
      flex: "1",
      padding: "8px",
      borderRadius: "5px 0 0 5px",
      border: "1px solid #333",
      background: "#1c1c1c",
      color: "#fff",
    },
    tagButton: {
      padding: "8px 15px",
      borderRadius: "0 5px 5px 0",
      border: "none",
      background: "#444",
      color: "#fff",
      cursor: "pointer",
    },
    tagCheckboxContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "10px",
    },
    checkbox: {
      display: "none",
    },
    checkboxLabel: {
      display: "inline-block",
      padding: "5px 10px",
      borderRadius: "15px",
      background: "#2c2c2c",
      color: "#aaa",
      cursor: "pointer",
      margin: "0",
      transition: "all 0.2s ease",
    },
    checkedLabel: {
      background: "#00ffcc",
      color: "#111",
    },
    entryTags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
      marginTop: "5px",
    },
    entryTag: {
      padding: "2px 8px",
      borderRadius: "10px",
      background: "#00ffcc33",
      color: "#00ffcc",
      fontSize: "0.8rem",
    },
    statButton: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      background: "#333",
      color: "#fff",
      cursor: "pointer",
      margin: "10px 0",
    },
    statsContainer: {
      background: "#1c1c1c",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
      width: "100%",
      maxWidth: "600px",
    },
    moodStat: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
    },
    moodBar: {
      height: "20px",
      background: "#00ffcc",
      marginLeft: "10px",
      transition: "width 0.5s ease",
    },
    noEntries: {
      textAlign: "center",
      padding: "20px",
      color: "#aaa",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reflection Journal</h1>
      
      <form onSubmit={handleAddEntry} style={styles.form}>
        <textarea
          ref={entryRef}
          placeholder="Write your reflection..."
          aria-label="Journal Reflection"
          value={currentEntry}
          onChange={handleEntryChange}
          style={{ ...styles.input, height: "150px" }}
          maxLength={500}
        />
        <div style={styles.charCount}>
          {currentEntry.length} / 500 characters
        </div>
        
        <select
          value={mood}
          onChange={handleMoodChange}
          style={styles.moodSelector}
          aria-label="Select mood"
        >
          {moodOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        <div style={styles.tagContainer}>
          <h3>Tags</h3>
          <div style={styles.tagInputContainer}>
            <input
              type="text"
              placeholder="Add new tag"
              value={currentTag}
              onChange={handleTagInputChange}
              onKeyPress={handleKeyPress}
              style={styles.tagInput}
            />
            <button type="button" onClick={addTag} style={styles.tagButton}>
              Add
            </button>
          </div>
          
          <div style={styles.tagCheckboxContainer}>
            {tags.map((tag) => (
              <div key={tag}>
                <input
                  type="checkbox"
                  id={`tag-${tag}`}
                  name={`tag-${tag}`}
                  value={tag}
                  style={styles.checkbox}
                />
                <label
                  htmlFor={`tag-${tag}`}
                  style={styles.checkboxLabel}
                  className="tag-label"
                  onClick={(e) => {
                    const checkbox = document.getElementById(`tag-${tag}`);
                    checkbox.checked = !checkbox.checked;
                    e.target.classList.toggle('checked-label');
                    
                    // Apply style change without relying on classes
                    if (checkbox.checked) {
                      e.target.style.background = "#00ffcc";
                      e.target.style.color = "#111";
                    } else {
                      e.target.style.background = "#2c2c2c";
                      e.target.style.color = "#aaa";
                    }
                  }}
                >
                  {tag}
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(tag);
                    }}
                    style={{marginLeft: "5px", fontSize: "10px"}}
                  >
                    ✕
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" style={styles.button}>
          Save Entry
        </button>
      </form>
      
      <div style={styles.filterContainer}>
        <div style={styles.filterItem}>
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={styles.input}
          />
        </div>
        <div style={styles.filterItem}>
          <select
            value={filterMood}
            onChange={handleFilterMoodChange}
            style={styles.moodSelector}
          >
            <option value="All">All Moods</option>
            {moodOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div style={styles.filterItem}>
          <select
            value={filterTag}
            onChange={handleFilterTagChange}
            style={styles.moodSelector}
          >
            <option value="All">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>
      
      {entries.length > 0 && (
        <button 
          style={styles.statButton} 
          onClick={() => setShowStats(!showStats)}
        >
          {showStats ? "Hide Mood Statistics" : "Show Mood Statistics"}
        </button>
      )}
      
      {showStats && entries.length > 0 && (
        <div style={styles.statsContainer}>
          <h3>Mood Distribution</h3>
          {Object.entries(moodCounts).map(([mood, count]) => {
            const percentage = (count / entries.length) * 100;
            return (
              <div key={mood} style={styles.moodStat}>
                <span style={{minWidth: "80px"}}>{mood}:</span>
                <div 
                  style={{
                    ...styles.moodBar,
                    width: `${percentage}%`,
                    backgroundColor: 
                      mood === "Happy" || mood === "Excited" || mood === "Grateful" ? "#00ffcc" :
                      mood === "Sad" || mood === "Angry" || mood === "Anxious" ? "#ff6b6b" :
                      "#aaa"
                  }}
                />
                <span style={{marginLeft: "10px"}}>{count}</span>
              </div>
            );
          })}
        </div>
      )}
      
      <div style={styles.entriesList}>
        <h2>Your Reflections ({filteredEntries.length})</h2>
        
        {filteredEntries.length === 0 && (
          <div style={styles.noEntries}>
            {entries.length === 0 
              ? "No journal entries yet. Add your first reflection!" 
              : "No entries match your filters."}
          </div>
        )}
        
        {filteredEntries.map((entry) => (
          <div key={entry.id} style={styles.journalEntry}>
            <p>{entry.text}</p>
            <div style={styles.entryTags}>
              {entry.tags.map(tag => (
                <span key={tag} style={styles.entryTag}>{tag}</span>
              ))}
            </div>
            <p>
              <strong>Mood:</strong> {entry.mood}
            </p>
            <p>
              <strong>Date:</strong> {entry.date}
            </p>
            <button 
              style={styles.deleteButton} 
              onClick={() => handleDeleteEntry(entry.id)}
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