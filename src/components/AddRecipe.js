import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../api/recipes";
import "./AddRecipe.css";

function AddRecipe() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    cookTime: "",
    servings: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Decode author from JWT token
    const token = localStorage.getItem("token");
    const decoded = token ? JSON.parse(atob(token.split(".")[1])) : {};
    const author = decoded.name || decoded.email || "Unknown";

    try {
      await addRecipe({
        title: form.title,
        description: form.description,
        imageUrl: form.imageUrl,
        category: form.category,
        cookTime: parseInt(form.cookTime) || 0,
        servings: parseInt(form.servings) || 0,
        rating: 0,
        likes: 0,
        author: author,
        ingredients: form.ingredients.split(",").map((i) => i.trim()),
        instructions: form.instructions
          .split(".")
          .map((i) => i.trim())
          .filter((i) => i),
      });

      alert("✅ Recipe added successfully!");
      navigate("/");
    } catch (err) {
      alert("❌ Failed to add recipe. Try again.");
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Breakfast)"
          value={form.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cookTime"
          placeholder="Cook Time (minutes)"
          value={form.cookTime}
          onChange={handleChange}
        />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          value={form.servings}
          onChange={handleChange}
        />
        {/* ⛔ Removed author input field */}
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={form.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions (separate steps with periods)"
          value={form.instructions}
          onChange={handleChange}
          required
        />
        <button type="submit">📤 Submit Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
