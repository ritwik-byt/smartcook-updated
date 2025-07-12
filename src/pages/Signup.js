import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // ✅ Explicitly send the correct fields
      const response = await axios.post("https://smartcook-backend-1.onrender.com/api/users/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user"
      });

      console.log("✅ Signup success:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("❌ Signup error:", err);
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="top-nav">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Signup</Link>
      </div>

      <div className="signup-box">
        <h2>Create Account</h2>
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
