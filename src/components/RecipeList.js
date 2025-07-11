// src/components/RecipeList.js
import React from "react";

const RecipeList = ({ recipes }) => {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe._id}>{recipe.title}</li>
      ))}
    </ul>
  );
};

export default RecipeList;
