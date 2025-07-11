// src/components/PendingRecipes.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PendingRecipes.css";

function PendingRecipes() {
  const [pendingRecipes, setPendingRecipes] = useState([]);

  const fetchPendingRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/recipes/pending");
      setPendingRecipes(res.data);
    } catch (err) {
      console.error("❌ Error fetching pending recipes:", err.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:5050/api/recipes/${id}/approve`);
      setPendingRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("❌ Error approving recipe:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/recipes/${id}`);
      setPendingRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("❌ Error deleting recipe:", err.message);
    }
  };

  useEffect(() => {
    fetchPendingRecipes();
  }, []);

  return (
    <div className="pending-dashboard">
      <h2>Pending Recipe Requests</h2>
      {pendingRecipes.length === 0 ? (
        <p>No pending recipes</p>
      ) : (
        pendingRecipes.map((recipe) => (
          <div key={recipe._id} className="pending-card">
            <h3>{recipe.title}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> {recipe.instructions.join(". ")}</p>
            {recipe.image && <img src={recipe.image} alt="recipe" />}
            <div>
              <button className="approve-btn" onClick={() => handleApprove(recipe._id)}>Approve</button>
              <button className="delete-btn" onClick={() => handleDelete(recipe._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PendingRecipes;
