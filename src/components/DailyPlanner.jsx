import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const DailyPlanner = () => {
  const [cookies, setCookies] = useCookies([
    "tasks",
    "goals",
    "habits",
    "mood",
    "gratitude",
  ]);
  const [tasks, setTasks] = useState(cookies.tasks || []);
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [goals, setGoals] = useState(cookies.goals || []);
  const [goal, setGoal] = useState("");
  const [mood, setMood] = useState(cookies.mood || "");
  const [gratitude, setGratitude] = useState(cookies.gratitude || "");
  const [habits, setHabits] = useState(
    cookies.habits || [
      { habit: "Exercise", completed: false },
      { habit: "Drink Water", completed: false },
      { habit: "Read", completed: false },
    ]
  );
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    // Save tasks, goals, and habits to cookies whenever they change
    setCookies("tasks", tasks);
    setCookies("goals", goals);
    setCookies("habits", habits);
    setCookies("mood", mood);
    setCookies("gratitude", gratitude);
  }, [tasks, goals, habits, mood, gratitude, setCookies]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { text: task, category, priority, id: Date.now() },
      ]);
      setTask("");
    }
  };

  const editTask = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, text: task, category, priority } : t
    );
    setTasks(updatedTasks);
    setTask("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  const addGoal = () => {
    if (goal.trim()) {
      setGoals([...goals, { text: goal, completed: false }]);
      setGoal("");
    }
  };

  const toggleGoal = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setGoals(updatedGoals);
  };

  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { habit: newHabit, completed: false }]);
      setNewHabit("");
    }
  };

  const toggleHabit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits[index].completed = !updatedHabits[index].completed;
    setHabits(updatedHabits);
  };

  const addMood = () => {
    if (mood.trim()) {
      alert(`Mood saved: ${mood}`);
      setMood(""); // Clear the mood field after saving
    }
  };

  const addGratitude = () => {
    if (gratitude.trim()) {
      alert(`Gratitude saved: ${gratitude}`);
      setGratitude(""); // Clear the gratitude field after saving
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

      {/* Mood and Gratitude */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Mood & Gratitude</h3>
        <textarea
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="How are you feeling today?"
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #333",
            background: "#1c1c1c",
            color: "#fff",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={addMood}
          style={{
            padding: "10px 20px",
            background: "transparent",
            color: "#00ffcc",
            border: "2px solid #00ffcc",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Add Mood
        </button>
        <textarea
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          placeholder="What are you grateful for?"
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #333",
            background: "#1c1c1c",
            color: "#fff",
          }}
        />
        <button
          onClick={addGratitude}
          style={{
            padding: "10px 20px",
            background: "transparent",
            color: "#00ffcc",
            border: "2px solid #00ffcc",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add Gratitude
        </button>
      </section>

      {/* Daily Goals */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Daily Goals</h3>
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
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
        <ul style={{ listStyle: "none", padding: 0 }}>
          {goals.map((g, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                color: g.completed ? "#4CAF50" : "#fff",
                textDecoration: g.completed ? "line-through" : "none",
              }}
            >
              {g.text}
              <button
                onClick={() => toggleGoal(index)}
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
                onClick={() => deleteGoal(index)}
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
            </li>
          ))}
        </ul>
      </section>

      {/* Task Section */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Tasks</h3>
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your task"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #333",
              background: "#1c1c1c",
              color: "#fff",
            }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
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
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
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
            Add Task
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((t) => (
            <li
              key={t.id}
              style={{
                marginBottom: "10px",
                color: t.priority === "High" ? "red" : t.priority === "Medium" ? "yellow" : "green",
              }}
            >
              {t.text} - {t.category} - {t.priority}
              <button
                onClick={() => editTask(t.id)}
                style={{
                  marginLeft: "10px",
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
                  marginLeft: "10px",
                  color: "red",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Habits Section */}
      <section style={{ marginBottom: "30px", width: "100%", maxWidth: "600px" }}>
        <h3 style={{ color: "#00ffcc" }}>Daily Habits</h3>
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
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
        <ul style={{ listStyle: "none", padding: 0 }}>
          {habits.map((habit, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                color: habit.completed ? "#4CAF50" : "#fff",
                textDecoration: habit.completed ? "line-through" : "none",
              }}
            >
              {habit.habit}
              <button
                onClick={() => toggleHabit(index)}
                style={{
                  marginLeft: "10px",
                  color: "yellow",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {habit.completed ? "Undo" : "Complete"}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DailyPlanner;
