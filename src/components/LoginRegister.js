import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

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
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        padding: "50px",
        background: "#111", // Dark background for consistency
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "40px",
          textShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
          letterSpacing: "3px",
        }}
      >
        {isLogin ? "Login" : "Register"}
      </h1>
      <p
        style={{
          marginBottom: "40px",
          fontSize: "1.2rem",
          color: "#00ffcc",
        }}
      >
        {isLogin
          ? "Welcome back! Please log in to continue."
          : "New here? Create an account to get started."}
      </p>

      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => setIsLogin(true)}
          style={{
            backgroundColor: isLogin ? "#00ffcc" : "#333", // Active state cyan
            color: isLogin ? "#fff" : "#ccc",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
            transition: "all 0.3s ease",
          }}
        >
          LOGIN
        </button>
        <button
          onClick={() => setIsLogin(false)}
          style={{
            backgroundColor: !isLogin ? "#00ffcc" : "#333", // Active state cyan
            color: !isLogin ? "#fff" : "#ccc",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          REGISTER
        </button>
      </div>

      {isLogin ? (
        <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#222",
              color: "#fff",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#222",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#00ffcc",
              color: "#fff",
              padding: "10px 25px",
              borderRadius: "30px",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              marginTop: "20px",
              transition: "background-color 0.3s",
            }}
          >
            LOGIN
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#222",
              color: "#fff",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#222",
              color: "#fff",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#222",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#00ffcc",
              color: "#fff",
              padding: "10px 25px",
              borderRadius: "30px",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              marginTop: "20px",
              transition: "background-color 0.3s",
            }}
          >
            REGISTER
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginRegister;
