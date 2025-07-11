// src/components/ProtectedAdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    alert("⛔ Access Denied. Admins only!");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdminRoute;
