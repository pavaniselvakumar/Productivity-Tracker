import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css"; // Assuming the CSS is within this file

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState(""); // For registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form refresh

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed! Please try again.");
    }
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form refresh

    try {
      await axios.post("http://localhost:5000/api/user/register", {
        name: fullName,
        email,
        password,
      });

      // Show success message
      alert("Registration successful! Please log in.");

      // Switch to login view
      setIsLogin(true);
    } catch (error) {
      console.error("Registration error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Registration failed! Please try again.");
    }
  };

  return (
    <div className="login-register-container">
      <h1 className="login-register-header">
        {isLogin ? "Login" : "Register"}
      </h1>
      <p className="login-register-subheader">
        {isLogin
          ? "Welcome back! Please log in to continue."
          : "New here? Create an account to get started."}
      </p>

      <div className="switch-buttons">
        <button
          className={`switch-button ${isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          LOGIN
        </button>
        <button
          className={`switch-button ${!isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(false)}
        >
          REGISTER
        </button>
      </div>

      {isLogin ? (
        <form onSubmit={handleLogin} className="login-register-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
          <button type="submit" className="form-submit-button">
            LOGIN
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="login-register-form">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
          <button type="submit" className="form-submit-button">
            REGISTER
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginRegister;

/* Add the CSS directly below this comment */
<style>
/* Container styling */
.login-register-container {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  padding: 50px;
  background: linear-gradient(135deg, #1c1c1c, #333);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

/* Header */
.login-register-header {
  font-size: 3rem;
  margin-bottom: 40px;
  text-shadow: 0 4px 10px rgba(0, 255, 255, 0.3);
  letter-spacing: 3px;
}

/* Subheader */
.login-register-subheader {
  margin-bottom: 40px;
  font-size: 1.2rem;
  color: #00ffcc;
}

/* Switch buttons */
.switch-buttons {
  margin: 20px 0;
}

.switch-button {
  background-color: #333;
  color: #ccc;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.switch-button.active {
  background-color: #00ffcc;
  color: #fff;
}

/* Form styling */
.login-register-form {
  margin-top: 20px;
}

.form-input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #222;
  color: #fff;
}

.form-submit-button {
  background-color: #00ffcc;
  color: #fff;
  padding: 10px 25px;
  border-radius: 30px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.form-submit-button:hover {
  background-color: #00ccaa;
}
</style>
