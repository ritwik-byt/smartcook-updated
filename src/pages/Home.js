// src/pages/Home.js
import React from "react";
import RecipeList from "../components/RecipeList";

const Home = () => {
  return (
    <div>
      <h1>🍽️ Welcome to SmartCook</h1>
      <p>Discover, Share, and Cook Amazing Recipes with Ease!</p>
      <RecipeList />
    </div>
  );
};

export default Home;
