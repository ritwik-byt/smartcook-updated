import React from "react";
import "./RecipeCard.css";

function RecipeCard({ recipe, onClick }) {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img
        src={recipe.image || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={recipe.title}
        className="recipe-image"
      />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <p className="category">{recipe.category}</p>
        <div className="meta">
          <span>⏱ {recipe.cookTime} min</span>
          <span>🍽 {recipe.servings}</span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
