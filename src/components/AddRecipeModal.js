import React, { useState } from "react";
import "./AddRecipeModal.css";

function AddRecipeModal({ isOpen, onClose, onRecipeAdded }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in.");

    const res = await fetch("https://smartcook-backend-1.onrender.com/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        image,
        category,
        cookTime,
        servings,
        description,
        ingredients,
        instructions,
        author,
      }),
    });

    if (res.ok) {
      onRecipeAdded();
      onClose();
    } else {
      const errMsg = await res.text();
      alert("❌ Failed to add recipe: " + errMsg);
    }
  };

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (i) =>
    setIngredients(ingredients.filter((_, idx) => idx !== i));
  const updateIngredient = (i, value) =>
    setIngredients(ingredients.map((ing, idx) => (idx === i ? value : ing)));

  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (i) =>
    setInstructions(instructions.filter((_, idx) => idx !== i));
  const updateInstruction = (i, value) =>
    setInstructions(instructions.map((step, idx) => (idx === i ? value : step)));

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ❌
        </button>
        <h2>Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Recipe Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snacks">Snacks</option>
          </select>

          <div className="field-row">
            <input
              type="number"
              placeholder="Cook Time (min)"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Servings"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              required
            />
          </div>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Ingredients *</label>
          {ingredients.map((item, i) => (
            <div key={i} className="field-row">
              <input
                type="text"
                value={item}
                onChange={(e) => updateIngredient(i, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeIngredient(i)} className="remove-btn">
                ❌
              </button>
            </div>
          ))}
          <button type="button" className="add-btn-orange" onClick={addIngredient}>
            <span>＋</span> Add Ingredient
          </button>

          <label>Instructions *</label>
          {instructions.map((item, i) => (
            <div key={i} className="instruction-step">
              <div className="step-number">{i + 1}</div>
              <textarea
                value={item}
                onChange={(e) => updateInstruction(i, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeInstruction(i)} className="remove-btn">
                ❌
              </button>
            </div>
          ))}
          <button type="button" className="add-btn-orange" onClick={addInstruction}>
            <span>＋</span> Add Step
          </button>

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Save Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeModal;
