import React, { useState, useEffect } from "react";
import "./styles.css"; // Ensure to include your CSS styles

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
    <div className="reminders-container">
      <h2 className="reminders-header">Reminders</h2>
      <p>Set reminders for important tasks.</p>

      <div className="add-reminder">
        <input
          type="text"
          placeholder={editingId ? "Edit your reminder" : "Enter a new reminder"}
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          className="reminder-input"
        />
        <button onClick={addReminder} className="add-button">
          {editingId ? "Save" : "Add Reminder"}
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>

      <ul className="reminder-list">
        {reminders.map((reminder) => (
          <li key={reminder.id} className="reminder-item">
            <span
              className={`reminder-text ${
                reminder.isComplete ? "completed" : ""
              }`}
              onClick={() => toggleComplete(reminder.id)}
            >
              {reminder.text}
            </span>
            <button
              onClick={() => editReminder(reminder.id, reminder.text)}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={() => deleteReminder(reminder.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;
