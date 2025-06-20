import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const DailyPlanner = () => {
  const [cookies, setCookie] = useCookies([
    "tasks",
    "goals",
    "habits",
    "mood",
    "gratitude",
  ]);
  
  // State initializations with better default values
  const [tasks, setTasks] = useState(cookies.tasks || []);
  const [currentTask, setCurrentTask] = useState({ text: "", category: "Work", priority: "Medium", id: null });
  const [isEditing, setIsEditing] = useState(false);
  
  const [goals, setGoals] = useState(cookies.goals || []);
  const [goal, setGoal] = useState("");
  
  const [habits, setHabits] = useState(
    cookies.habits || [
      { habit: "Exercise", completed: false },
      { habit: "Drink Water", completed: false },
      { habit: "Read", completed: false },
    ]
  );
  const [newHabit, setNewHabit] = useState("");
  
  const [mood, setMood] = useState(cookies.mood || "");
  const [gratitude, setGratitude] = useState(cookies.gratitude || "");
  
  // Notification system
  const [notification, setNotification] = useState({ message: "", type: "" });
  
  // Save to cookies whenever data changes
  useEffect(() => {
    setCookie("tasks", tasks, { path: "/" });
    setCookie("goals", goals, { path: "/" });
    setCookie("habits", habits, { path: "/" });
    setCookie("mood", mood, { path: "/" });
    setCookie("gratitude", gratitude, { path: "/" });
  }, [tasks, goals, habits, mood, gratitude, setCookie]);
  
  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  // Task Management
  const addTask = () => {
    if (currentTask.text.trim()) {
      if (isEditing) {
        const updatedTasks = tasks.map((t) =>
          t.id === currentTask.id ? { ...currentTask } : t
        );
        setTasks(updatedTasks);
        showNotification("Task updated successfully!");
        setIsEditing(false);
      } else {
        setTasks([
          ...tasks,
          { ...currentTask, id: Date.now() }
        ]);
        showNotification("Task added successfully!");
      }
      setCurrentTask({ text: "", category: "Work", priority: "Medium", id: null });
    } else {
      showNotification("Please enter a task!", "error");
    }
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setCurrentTask({ ...taskToEdit });
      setIsEditing(true);
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    showNotification("Task deleted successfully!");
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    showNotification("Task status updated!");
  };

  // Goal Management
  const addGoal = () => {
    if (goal.trim()) {
      setGoals([...goals, { text: goal, completed: false, id: Date.now() }]);
      setGoal("");
      showNotification("Goal added successfully!");
    } else {
      showNotification("Please enter a goal!", "error");
    }
  };

  const toggleGoal = (id) => {
    const updatedGoals = goals.map((g) =>
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    setGoals(updatedGoals);
    showNotification("Goal status updated!");
  };

  const deleteGoal = (id) => {
    const updatedGoals = goals.filter((g) => g.id !== id);
    setGoals(updatedGoals);
    showNotification("Goal deleted successfully!");
  };

  // Habit Management
  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { habit: newHabit, completed: false }]);
      setNewHabit("");
      showNotification("Habit added successfully!");
    } else {
      showNotification("Please enter a habit!", "error");
    }
  };

  const toggleHabit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits[index].completed = !updatedHabits[index].completed;
    setHabits(updatedHabits);
    showNotification(`Habit ${updatedHabits[index].completed ? "completed" : "marked incomplete"}!`);
  };

  const deleteHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
    showNotification("Habit deleted successfully!");
  };

  // Mood & Gratitude
  const saveMood = () => {
    if (mood.trim()) {
      setCookie("mood", mood, { path: "/" });
      showNotification("Mood saved successfully!");
    } else {
      showNotification("Please enter your mood!", "error");
    }
  };

  const saveGratitude = () => {
    if (gratitude.trim()) {
      setCookie("gratitude", gratitude, { path: "/" });
      showNotification("Gratitude saved successfully!");
    } else {
      showNotification("Please enter what you're grateful for!", "error");
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate progress percentages
  const calculateProgress = () => {
    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    const completedGoals = goals.filter(g => g.completed).length;
    const totalGoals = goals.length;
    const goalProgress = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
    
    const completedHabits = habits.filter(h => h.completed).length;
    const totalHabits = habits.length;
    const habitProgress = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
    
    return { taskProgress, goalProgress, habitProgress };
  };

  const { taskProgress, goalProgress, habitProgress } = calculateProgress();

  // Filter by category, priority
  const filterTasks = (category = "All") => {
    if (category === "All") return tasks;
    return tasks.filter(t => t.category === category);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        padding: "50px",
        background: "#111",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
      }}
    >
      {/* Notification */}
      {notification.message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "15px 25px",
            borderRadius: "8px",
            background: notification.type === "error" ? "#ff4d4d" : "#00ffcc",
            color: "#fff",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {notification.message}
        </div>
      )}

      {/* Date and Title */}
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          color: "#00ffcc",
          textShadow: "0 4px 10px rgba(0, 255, 255, 0.5)",
        }}
      >
        Daily Planner
      </h1>
      <h2 style={{ marginBottom: "30px", color: "#aaa" }}>{today}</h2>

      {/* Progress Overview */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Daily Progress</h3>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
          <div style={{ textAlign: "center", flex: 1 }}>
            <p>Tasks</p>
            <div style={{ 
              width: "80px", 
              height: "80px", 
              borderRadius: "50%", 
              background: `conic-gradient(#00ffcc ${taskProgress}%, #333 0)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px auto",
              position: "relative",
            }}>
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                background: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}>
                {taskProgress}%
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <p>Goals</p>
            <div style={{ 
              width: "80px", 
              height: "80px", 
              borderRadius: "50%", 
              background: `conic-gradient(#00ffcc ${goalProgress}%, #333 0)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px auto",
              position: "relative",
            }}>
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                background: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}>
                {goalProgress}%
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <p>Habits</p>
            <div style={{ 
              width: "80px", 
              height: "80px", 
              borderRadius: "50%", 
              background: `conic-gradient(#00ffcc ${habitProgress}%, #333 0)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px auto",
              position: "relative",
            }}>
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                background: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}>
                {habitProgress}%
              </div>
            </div>
          </div>
        </div>
      </section>

  

      {/* Daily Goals */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Daily Goals</h3>
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addGoal)}
            placeholder="Enter your goal"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #333",
              background: "#1c1c1c",
              color: "#fff",
            }}
          />
          <button
            onClick={addGoal}
            style={{
              padding: "10px 20px",
              background: "transparent",
              color: "#00ffcc",
              border: "2px solid #00ffcc",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Goal
          </button>
        </div>
        
        {goals.length === 0 ? (
          <p style={{ color: "#aaa", textAlign: "center" }}>No goals yet. Add a goal to get started!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {goals.map((g) => (
              <li
                key={g.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  background: "#1c1c1c",
                  borderLeft: g.completed ? "4px solid #4CAF50" : "4px solid #666",
                }}
              >
                <span style={{
                  color: g.completed ? "#4CAF50" : "#fff",
                  textDecoration: g.completed ? "line-through" : "none",
                }}>
                  {g.text}
                </span>
                <div>
                  <button
                    onClick={() => toggleGoal(g.id)}
                    style={{
                      marginLeft: "10px",
                      color: "yellow",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {g.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteGoal(g.id)}
                    style={{
                      marginLeft: "10px",
                      color: "red",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Task Section */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Tasks</h3>
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px", flexWrap: "wrap" }}>
          <input
            type="text"
            value={currentTask.text}
            onChange={(e) => setCurrentTask({...currentTask, text: e.target.value})}
            onKeyPress={(e) => handleKeyPress(e, addTask)}
            placeholder="Enter your task"
            style={{
              flex: "1 0 100%",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #333",
              background: "#1c1c1c",
              color: "#fff",
              marginBottom: "10px",
            }}
          />
          <div style={{ display: "flex", gap: "15px", width: "100%" }}>
            <select
              value={currentTask.category}
              onChange={(e) => setCurrentTask({...currentTask, category: e.target.value})}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #333",
                background: "#1c1c1c",
                color: "#fff",
              }}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
            </select>
            <select
              value={currentTask.priority}
              onChange={(e) => setCurrentTask({...currentTask, priority: e.target.value})}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #333",
                background: "#1c1c1c",
                color: "#fff",
              }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              onClick={addTask}
              style={{
                padding: "10px 20px",
                background: "transparent",
                color: "#00ffcc",
                border: "2px solid #00ffcc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
        
        {/* Category filter */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px", overflowX: "auto", padding: "5px 0" }}>
          {["All", "Work", "Personal", "Study", "Health", "Finance"].map(cat => (
            <button
              key={cat}
              onClick={() => {/* Implement filtering functionality */}}
              style={{
                padding: "5px 15px",
                borderRadius: "20px",
                background: "#1c1c1c",
                color: "#fff",
                border: "1px solid #333",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {tasks.length === 0 ? (
          <p style={{ color: "#aaa", textAlign: "center" }}>No tasks yet. Add a task to get started!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map((t) => (
              <li
                key={t.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  background: "#1c1c1c",
                  borderLeft: t.priority === "High" ? "4px solid red" : 
                             t.priority === "Medium" ? "4px solid yellow" : 
                             "4px solid green",
                  opacity: t.completed ? 0.7 : 1,
                }}
              >
                <div>
                  <span style={{
                    color: t.completed ? "#4CAF50" : "#fff",
                    textDecoration: t.completed ? "line-through" : "none",
                  }}>
                    {t.text}
                  </span>
                  <div style={{ fontSize: "0.8rem", color: "#aaa" }}>
                    {t.category} • {t.priority} Priority
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => completeTask(t.id)}
                    style={{
                      marginLeft: "5px",
                      color: "yellow",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {t.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => editTask(t.id)}
                    style={{
                      marginLeft: "5px",
                      color: "orange",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(t.id)}
                    style={{
                      marginLeft: "5px",
                      color: "red",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Habits Section */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Daily Habits</h3>
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addHabit)}
            placeholder="Enter new habit"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #333",
              background: "#1c1c1c",
              color: "#fff",
            }}
          />
          <button
            onClick={addHabit}
            style={{
              padding: "10px 20px",
              background: "transparent",
              color: "#00ffcc",
              border: "2px solid #00ffcc",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Habit
          </button>
        </div>
        
        {habits.length === 0 ? (
          <p style={{ color: "#aaa", textAlign: "center" }}>No habits yet. Add a habit to track daily!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {habits.map((habit, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  background: "#1c1c1c",
                  borderLeft: habit.completed ? "4px solid #4CAF50" : "4px solid #666",
                }}
              >
                <span style={{
                  color: habit.completed ? "#4CAF50" : "#fff",
                  textDecoration: habit.completed ? "line-through" : "none",
                }}>
                  {habit.habit}
                </span>
                <div>
                  <button
                    onClick={() => toggleHabit(index)}
                    style={{
                      marginLeft: "5px",
                      color: "yellow",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {habit.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteHabit(index)}
                    style={{
                      marginLeft: "5px",
                      color: "red",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DailyPlanner;