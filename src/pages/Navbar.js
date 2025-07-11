import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ Get current path
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    console.log("🔍 Navbar role:", storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  // Hide navbar buttons on login/signup pages
  const hideLinks = location.pathname === "/signup" || location.pathname === "/login";

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">SmartCook</Link>

      {!hideLinks && (
        <div className="navbar-links">
          {role === "admin" ? (
            <>
              <Link to="/admin">Admin Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : role === "user" ? (
            <>
              <Link to="/add">Add Recipe</Link>
              <Link to="/my-recipes">My Recipes</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
