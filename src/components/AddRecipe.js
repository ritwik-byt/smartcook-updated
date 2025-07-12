import React, { useState } from "react";
import axios from "axios";
import "./AddRecipe.css";

function AddRecipe() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "", // ✅ aligned with backend
    category: "",
    cookTime: "",
    servings: "",
    ingredients: [""],
    instructions: [""],
  });

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;

    if (field) {
      const updated = [...form[field]];
      updated[index] = value;
      setForm({ ...form, [field]: updated });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("https://smartcook-backend-1.onrender.com/api/recipes", {
        ...form,
        author: user?.username || "Anonymous",
        approved: false, // ✅ Only show after admin approval
      });
      alert("✅ Recipe submitted for admin approval!");
      setForm({
        title: "",
        description: "",
        imageUrl: "",
        category: "",
        cookTime: "",
        servings: "",
        ingredients: [""],
        instructions: [""],
      });
    } catch (err) {
      console.error("❌ Submit failed:", err.message);
      alert("Error submitting recipe");
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title *"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Short description..."
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category *</option>
            <option>breakfast</option>
            <option>lunch</option>
            <option>dinner</option>
            <option>dessert</option>
          </select>
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
        </div>

        <div className="form-section">
          <label>Ingredients</label>
          {form.ingredients.map((item, i) => (
            <input
              key={i}
              value={item}
              onChange={(e) => handleChange(e, i, "ingredients")}
              placeholder={`Ingredient ${i + 1}`}
              required
            />
          ))}
          <button type="button" onClick={() => addField("ingredients")}>
            + Add Ingredient
          </button>
        </div>

        <div className="form-section">
          <label>Instructions</label>
          {form.instructions.map((item, i) => (
            <textarea
              key={i}
              value={item}
              onChange={(e) => handleChange(e, i, "instructions")}
              placeholder={`Step ${i + 1}`}
              required
            />
          ))}
          <button type="button" onClick={() => addField("instructions")}>
            + Add Step
          </button>
        </div>

        <button type="submit" className="submit-btn">
          📬 Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
