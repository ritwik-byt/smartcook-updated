// src/components/RecipeList.js
import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../api/recipes";
import "./RecipeList.css";


const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }
    fetchRecipes();
  }, []);

  return (
    <div className="recipe-list">
      <h2>🍲 All Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
