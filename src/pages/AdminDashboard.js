import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [pendingRecipes, setPendingRecipes] = useState([]);
  const [approvedRecipes, setApprovedRecipes] = useState([]);
  const [view, setView] = useState("pending");

  useEffect(() => {
    fetchPendingRecipes();
    fetchApprovedRecipes();
  }, []);

  const fetchPendingRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/recipes/pending");
      setPendingRecipes(res.data);
    } catch (err) {
      console.error("Error fetching pending recipes:", err.message);
    }
  };

  const fetchApprovedRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/recipes");
      setApprovedRecipes(res.data);
    } catch (err) {
      console.error("Error fetching approved recipes:", err.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:5050/api/recipes/${id}/approve`);
      fetchPendingRecipes();
      fetchApprovedRecipes();
    } catch (err) {
      console.error("Error approving recipe:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("🔍 Attempting to delete recipe with ID:", id); // ✅ Step 1: Confirm the ID is valid

      if (!id || typeof id !== "string") {
        console.error("❌ Invalid recipe ID:", id);
        return;
      }

      await axios.delete(`http://localhost:5050/api/recipes/${id}`);
      fetchPendingRecipes();
      fetchApprovedRecipes();
    } catch (err) {
      console.error("❌ Error deleting recipe:", err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const renderRecipeCard = (recipe, showApprove) => (
    <div key={recipe._id} className="admin-recipe-card">
      <h3>{recipe.title || "No Title"}</h3>
      <p><strong>Ingredients:</strong> {recipe.ingredients?.join(", ") || "N/A"}</p>
      <p>
        <strong>Instructions:</strong>{" "}
        {Array.isArray(recipe.instructions)
          ? recipe.instructions.join(". ")
          : recipe.instructions || "No instructions provided"}
      </p>
      {recipe.image && <img src={recipe.image} alt={recipe.title || "Recipe"} />}
      <div className="action-buttons">
        {showApprove && (
          <button className="approve-btn" onClick={() => handleApprove(recipe._id)}>Approve</button>
        )}
        <button className="delete-btn" onClick={() => handleDelete(recipe._id)}>Delete</button>
      </div>
    </div>
  );

  const currentList = view === "pending" ? pendingRecipes : approvedRecipes;

  return (
    <div className="admin-page">
      <div className="quote-box">
        <h1>Admin Workspace</h1>
        <p>“Great chefs don't just cook, they curate experiences.”</p>
      </div>

      <div className="admin-box">
        <div className="admin-header">
          <h2>SmartCook Admin</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className="admin-buttons">
          <button onClick={() => setView("pending")}>Pending Recipes</button>
          <button onClick={() => setView("approved")}>Approved Recipes</button>
        </div>

        <div className="admin-list">
          {currentList.length === 0 ? (
            <p className="no-recipes-msg">
              No {view === "pending" ? "pending" : "approved"} recipes to display.
            </p>
          ) : (
            currentList.map((recipe) => renderRecipeCard(recipe, view === "pending"))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
