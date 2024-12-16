<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState(""); // For registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Login (with localStorage check)
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form refresh

    // Get registered user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert("Login successful!");
      // Navigate to dashboard
      navigate("/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  // Handle Registration (store user data in localStorage)
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent form refresh

    // Save user data to localStorage
    const user = { fullName, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! Please log in.");
    // Switch to login view
    setIsLogin(true);
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
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState(""); // For registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Login (with localStorage check)
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form refresh

    // Get registered user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert("Login successful!");
      // Navigate to dashboard
      navigate("/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  // Handle Registration (store user data in localStorage)
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent form refresh

    // Save user data to localStorage
    const user = { fullName, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! Please log in.");
    // Switch to login view
    setIsLogin(true);
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
>>>>>>> b57fd23e636ddf0fdb0ab11a2ae72db3408766e2
