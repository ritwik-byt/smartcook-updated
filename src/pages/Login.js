// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://smartcook-backend-1.onrender.com/api/users/login", {
        email,
        password,
      });

      // 🧪 Inspect full response
      console.log("🧪 res.data:", res.data);

      const user = res.data.user;
      const authorName = user?.name || user?.email || "Unknown";

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("author", authorName);

      if (res.data.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err);
      setError(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="top-nav">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Signup</Link>
      </div>

      <div className="quote-box">
        <h1>"Cooking is love made visible."</h1>
        <p>– A.V.V.RITWIK</p>
      </div>

      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
