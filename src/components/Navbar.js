// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">SmartCook</Link>
      <div className="navbar-links">
        {role === "admin" ? (
          <>
            <Link to="/admin">Admin Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : role === "user" ? (
          <>
            <Link to="/add">Add Recipe</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
