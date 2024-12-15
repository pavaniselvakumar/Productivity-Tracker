import React, { useState, useEffect } from "react";

const Reminders = () => {
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem("reminders");
    return savedReminders ? JSON.parse(savedReminders) : [];
  });
  const [newReminder, setNewReminder] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Handle adding a new reminder
  const addReminder = () => {
    if (newReminder.trim() === "") {
      setError("Reminder cannot be empty.");
      return;
    }

    if (editingId) {
      const updatedReminders = reminders.map((reminder) =>
        reminder.id === editingId ? { ...reminder, text: newReminder } : reminder
      );
      setReminders(updatedReminders);
      setEditingId(null);
    } else {
      const newReminders = [
        ...reminders,
        { text: newReminder, isComplete: false, id: Date.now() },
      ];
      setReminders(newReminders);
    }

    setNewReminder("");
    setError("");
  };

  // Handle marking a reminder as complete
  const toggleComplete = (id) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === id
        ? { ...reminder, isComplete: !reminder.isComplete }
        : reminder
    );
    setReminders(updatedReminders);
  };

  // Handle deleting a reminder
  const deleteReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
  };

  // Handle editing a reminder
  const editReminder = (id, text) => {
    setEditingId(id);
    setNewReminder(text);
  };

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      padding: "50px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#fff",
      background: "#1c1c1c",
      minHeight: "100vh",
    }}>
      <h2 style={{
        fontSize: "2.5rem",
        marginBottom: "20px",
        color: "#00ffcc",
        textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
      }}>Reminders</h2>
      <p>Set reminders for important tasks.</p>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder={editingId ? "Edit your reminder" : "Enter a new reminder"}
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={addReminder}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#00ffcc",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {editingId ? "Save" : "Add Reminder"}
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>

      <ul style={{ listStyleType: "none", padding: 0, width: "400px" }}>
        {reminders.map((reminder) => (
          <li
            key={reminder.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#333",
              padding: "10px 20px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                textDecoration: reminder.isComplete ? "line-through" : "none",
                cursor: "pointer",
                color: reminder.isComplete ? "#888" : "#fff",
              }}
              onClick={() => toggleComplete(reminder.id)}
            >
              {reminder.text}
            </span>
            <div>
              <button
                onClick={() => editReminder(reminder.id, reminder.text)}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteReminder(reminder.id)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "5px",
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
    </div>
  );
};

export default Reminders;
