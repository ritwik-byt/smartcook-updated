// src/components/RecipeForm.js
import React, { useState } from "react";
import { addRecipe } from "../api/recipes";

function RecipeForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a recipe title.");
      return;
    }

    const newRecipe = await addRecipe({ title });
    onAdd(newRecipe); // This updates the list
    setTitle(""); // Clear input after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter recipe title"
        required
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default RecipeForm;
