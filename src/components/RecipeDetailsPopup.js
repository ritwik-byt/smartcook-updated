import React from "react";
import './RecipeDetailsPopup.css';


function RecipeDetailsPopup({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>❌</button>
        <img
          className="modal-image"
          src={recipe.image || "https://via.placeholder.com/600x300?text=No+Image"}
          alt={recipe.title}
        />
        <h2>{recipe.title}</h2>
        <p><strong>Category:</strong> {recipe.category}</p>
        <p><strong>Description:</strong> {recipe.description}</p>
        <p><strong>Cook Time:</strong> {recipe.cookTime} minutes</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Author:</strong> {recipe.author}</p>

        <h4>Ingredients</h4>
        <ul>
          {recipe.ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h4>Instructions</h4>
        <ol>
          {recipe.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecipeDetailsPopup;
