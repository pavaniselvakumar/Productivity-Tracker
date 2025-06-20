import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login action
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  // Handle Register action
  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === formData.email)) {
      alert("User already exists!");
      return;
    }

    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please log in.");
    setIsLogin(true); // Switch to login form
  };

  // Handle Guest Login action
  const handleGuestLogin = () => {
    const guestUser = { fullName: "Guest", email: "guest@demo.com" };
    localStorage.setItem("loggedInUser", JSON.stringify(guestUser));
    navigate("/dashboard");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>{isLogin ? "Login" : "Register"}</h1>
        <p style={styles.subtitle}>
          {isLogin ? "Welcome back! Please log in." : "Create your account to get started."}
        </p>

        <div style={styles.toggleButtons}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              ...styles.toggleButton,
              backgroundColor: isLogin ? "#00ffcc" : "#333",
              color: isLogin ? "#111" : "#ccc",
            }}
          >
            LOGIN
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              ...styles.toggleButton,
              backgroundColor: !isLogin ? "#00ffcc" : "#333",
              color: !isLogin ? "#111" : "#ccc",
            }}
          >
            REGISTER
          </button>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {/* Register form - Only show full name input when in Register mode */}
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>
            {isLogin ? "LOGIN" : "REGISTER"}
          </button>
        </form>

        {isLogin && (
          <button
            type="button"
            onClick={handleGuestLogin}
            style={{ ...styles.submitButton, backgroundColor: "#444" }}
          >
            CONTINUE AS GUEST
          </button>
        )}
      </div>
    </div>
  );
};

// 🧼 Styles
const styles = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    background: "#111",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    color: "#fff",
  },
  card: {
    backdropFilter: "blur(15px)",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "420px",
    width: "100%",
    boxShadow: "0 8px 24px rgba(0, 255, 204, 0.2)",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  subtitle: {
    marginBottom: "30px",
    color: "#00ffcc",
  },
  toggleButtons: {
    marginBottom: "20px",
  },
  toggleButton: {
    padding: "10px 20px",
    marginRight: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "90%",
    maxWidth: "300px",
    borderRadius: "5px",
    border: "1px solid #555",
    background: "#222",
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#00ffcc",
    color: "#111",
    padding: "10px 25px",
    borderRadius: "30px",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default LoginRegister;