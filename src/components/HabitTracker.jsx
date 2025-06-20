import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie

const HabitTracker = () => {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [category, setCategory] = useState("Personal");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOption, setSortOption] = useState("name");
  const [showStats, setShowStats] = useState(false);

  // Categories for habit organization
  const categories = ["Personal", "Work", "Health", "Learning", "Finance"];

  useEffect(() => {
    // Load habits from cookies when the component mounts
    const savedHabits = Cookies.get("habits");
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    // Update cookies whenever the habits state changes
    if (habits.length > 0) {
      Cookies.set("habits", JSON.stringify(habits), { expires: 30 }); // Store for 30 days
    } else {
      Cookies.remove("habits"); // Remove cookies if no habits exist
    }
  }, [habits]);

  const addHabit = () => {
    if (habit.trim()) {
      // Create a new habit with more detailed tracking
      const today = new Date().toISOString().split('T')[0];
      const newHabit = {
        id: Date.now(),
        text: habit,
        category: category,
        completed: false,
        streak: 0,
        target: 21, // Default 21 days to form a habit
        completionHistory: {},
        createdAt: today,
        lastCompleted: null,
        notes: ""
      };
      
      // Initialize today in the completion history
      newHabit.completionHistory[today] = false;
      
      setHabits([...habits, newHabit]);
      setHabit("");
    }
  };

  const toggleComplete = (id) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        // Update completion history
        const updatedHistory = { ...habit.completionHistory };
        updatedHistory[today] = !habit.completed;
        
        // Calculate streak based on consistent completions
        let newStreak = habit.streak;
        if (!habit.completed) {
          // If marking as complete
          newStreak += 1;
        } else {
          // If unmarking as complete
          newStreak = Math.max(0, newStreak - 1);
        }
        
        return {
          ...habit,
          completed: !habit.completed,
          streak: newStreak,
          completionHistory: updatedHistory,
          lastCompleted: !habit.completed ? today : habit.lastCompleted
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const updateHabitTarget = (id, newTarget) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, target: Number(newTarget) } : habit
    ));
  };

  const addHabitNote = (id, note) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, notes: note } : habit
    ));
  };

  // Filter habits by category
  const filteredHabits = filterCategory === "All" 
    ? habits 
    : habits.filter(habit => habit.category === filterCategory);

  // Sort habits based on selected option
  const sortedHabits = [...filteredHabits].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.text.localeCompare(b.text);
      case "streak":
        return b.streak - a.streak;
      case "progress":
        return (b.streak / b.target) - (a.streak / a.target);
      case "created":
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });

  // Calculate habit stats
  const calculateStats = () => {
    const totalHabits = habits.length;
    const completedToday = habits.filter(h => h.completed).length;
    const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
    const averageStreak = totalHabits > 0 ? (totalStreak / totalHabits).toFixed(1) : 0;
    
    // Get highest streak habit
    let highestStreakHabit = { text: "None", streak: 0 };
    habits.forEach(habit => {
      if (habit.streak > highestStreakHabit.streak) {
        highestStreakHabit = habit;
      }
    });
    
    // Calculate category distribution
    const categoryCount = {};
    categories.forEach(cat => {
      categoryCount[cat] = habits.filter(h => h.category === cat).length;
    });
    
    return {
      totalHabits,
      completedToday,
      completionRate: totalHabits > 0 ? ((completedToday / totalHabits) * 100).toFixed(0) : 0,
      averageStreak,
      highestStreakHabit,
      categoryCount
    };
  };

  const stats = calculateStats();

  // Generate last 7 days for calendar view
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };
  
  const last7Days = getLast7Days();

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        padding: "30px",
        background: "#111",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
      }}
    >
      {/* Title Section */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "10px",
            color: "#00ffcc",
            textShadow: "0 4px 10px rgba(0, 255, 255, 0.5)",
            letterSpacing: "2px",
          }}
        >
          Habit Tracker
        </h1>
        <p style={{ color: "#aaa", fontSize: "1rem" }}>
          Track your habits and build consistency for better productivity
        </p>
      </div>

      {/* Stats Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "15px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <div
          style={{
            background: "#1c1c1c",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
            flex: 1,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h3 style={{ color: "#00ffcc", margin: "0 0 5px 0" }}>Completion</h3>
          <p style={{ fontSize: "1.5rem", margin: 0, fontWeight: "bold" }}>
            {stats.completionRate}%
          </p>
          <p style={{ fontSize: "0.8rem", margin: 0, color: "#aaa" }}>
            {stats.completedToday}/{stats.totalHabits} today
          </p>
        </div>
        <div
          style={{
            background: "#1c1c1c",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
            flex: 1,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h3 style={{ color: "#00ffcc", margin: "0 0 5px 0" }}>Avg Streak</h3>
          <p style={{ fontSize: "1.5rem", margin: 0, fontWeight: "bold" }}>
            {stats.averageStreak}
          </p>
          <p style={{ fontSize: "0.8rem", margin: 0, color: "#aaa" }}>days</p>
        </div>
        <div
          style={{
            background: "#1c1c1c",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
            flex: 1,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h3 style={{ color: "#00ffcc", margin: "0 0 5px 0" }}>Top Streak</h3>
          <p style={{ fontSize: "1.5rem", margin: 0, fontWeight: "bold" }}>
            {stats.highestStreakHabit.streak}
          </p>
          <p style={{ fontSize: "0.8rem", margin: 0, color: "#aaa" }}>
            {stats.highestStreakHabit.text.substring(0, 10)}
            {stats.highestStreakHabit.text.length > 10 ? "..." : ""}
          </p>
        </div>
      </div>

      {/* Detailed Stats Toggle */}
      <button
        onClick={() => setShowStats(!showStats)}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "0.9rem",
        }}
      >
        {showStats ? "Hide Statistics" : "Show Statistics"}
      </button>

      {/* Detailed Stats Section */}
      {showStats && (
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "#1c1c1c",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h3 style={{ color: "#00ffcc", marginTop: 0 }}>Habit Distribution</h3>
          <div>
            {categories.map((cat) => (
              <div
                key={cat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px 0",
                }}
              >
                <div style={{ width: "100px" }}>{cat}:</div>
                <div
                  style={{
                    height: "10px",
                    background: "#00ffcc",
                    width: `${(stats.categoryCount[cat] / Math.max(1, stats.totalHabits)) * 100}%`,
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                ></div>
                <div>{stats.categoryCount[cat]}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "30px",
          width: "100%",
          maxWidth: "600px",
          background: "#1c1c1c",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h3 style={{ color: "#00ffcc", margin: "0 0 10px 0" }}>Add New Habit</h3>
        <input
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          placeholder="Enter a habit to track"
          style={{
            padding: "12px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "2px solid #333",
            outline: "none",
            color: "#fff",
            background: "#252525",
          }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "2px solid #333",
              outline: "none",
              color: "#fff",
              background: "#252525",
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={addHabit}
            style={{
              padding: "12px 20px",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#111",
              background: "#00ffcc",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Add Habit
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "0.9rem",
            borderRadius: "8px",
            border: "2px solid #333",
            outline: "none",
            color: "#fff",
            background: "#1c1c1c",
          }}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "0.9rem",
            borderRadius: "8px",
            border: "2px solid #333",
            outline: "none",
            color: "#fff",
            background: "#1c1c1c",
          }}
        >
          <option value="name">Sort by Name</option>
          <option value="streak">Sort by Streak</option>
          <option value="progress">Sort by Progress</option>
          <option value="created">Sort by Created Date</option>
        </select>
      </div>

      {/* Habits List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {sortedHabits.length === 0 ? (
          <div
            style={{
              padding: "20px",
              background: "#1c1c1c",
              borderRadius: "8px",
              textAlign: "center",
              color: "#aaa",
            }}
          >
            No habits found. Add your first habit to start tracking!
          </div>
        ) : (
          sortedHabits.map((habit) => (
            <li
              key={habit.id}
              style={{
                marginBottom: "15px",
                background: "#1c1c1c",
                color: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Habit Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                  borderBottom: habit.notes ? "1px solid #333" : "none",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        marginRight: "10px",
                        color: habit.completed ? "#00ffcc" : "#fff",
                      }}
                    >
                      {habit.text}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        padding: "3px 8px",
                        background: "#333",
                        borderRadius: "10px",
                        color: "#aaa",
                      }}
                    >
                      {habit.category}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    {/* Progress Bar */}
                    <div
                      style={{
                        flex: 1,
                        height: "6px",
                        background: "#333",
                        borderRadius: "3px",
                        position: "relative",
                        marginRight: "10px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          height: "100%",
                          background: "#00ffcc",
                          borderRadius: "3px",
                          width: `${Math.min(100, (habit.streak / habit.target) * 100)}%`,
                        }}
                      ></div>
                    </div>
                    <span style={{ fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                      {habit.streak}/{habit.target} days
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => toggleComplete(habit.id)}
                    style={{
                      padding: "8px 15px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      color: "#111",
                      background: habit.completed ? "#ff4c4c" : "#00ffcc",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {habit.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    style={{
                      padding: "8px 15px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      color: "#fff",
                      background: "#333",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Weekly Calendar View */}
              <div
                style={{
                  display: "flex",
                  padding: "10px 15px",
                  borderBottom: "1px solid #333",
                  justifyContent: "space-between",
                }}
              >
                {last7Days.map((day) => {
                  const date = new Date(day);
                  const formattedDay = date.getDate();
                  const isCompleted = habit.completionHistory && habit.completionHistory[day];
                  
                  return (
                    <div
                      key={day}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontSize: "0.8rem", color: "#aaa" }}>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]}
                      </div>
                      <div style={{ fontSize: "0.9rem" }}>{formattedDay}</div>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: isCompleted ? "#00ffcc" : "#333",
                          marginTop: "5px",
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>

              {/* Expandable Settings Section */}
              <div style={{ padding: "10px 15px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <label style={{ fontSize: "0.9rem" }}>Target days:</label>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={habit.target}
                      onChange={(e) => updateHabitTarget(habit.id, e.target.value)}
                      style={{
                        width: "60px",
                        padding: "5px",
                        background: "#252525",
                        border: "1px solid #333",
                        borderRadius: "4px",
                        color: "#fff",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#aaa" }}>
                    Created: {habit.createdAt}
                  </div>
                </div>
                
                {/* Notes Section */}
                <textarea
                  placeholder="Add notes for this habit..."
                  value={habit.notes}
                  onChange={(e) => addHabitNote(habit.id, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "10px",
                    background: "#252525",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    color: "#fff",
                    resize: "vertical",
                    minHeight: "60px",
                  }}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HabitTracker;