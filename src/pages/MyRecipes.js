import React, { useEffect, useState } from "react";
import "./Home.css"; // Reuse existing styles
import RecipeCard from "../components/RecipeCard";

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get author from localStorage (set during login/signup)
  const author = localStorage.getItem("author") || "Unknown";

  useEffect(() => {
    fetchMyRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:5050/api/recipes/mine?author=${author}`);
      const data = await response.json();
      setMyRecipes(data);
    } catch (error) {
      console.error("❌ Failed to fetch my recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h2 className="section-title">👨‍🍳 My Recipes</h2>

      {loading ? (
        <div id="loadingSpinner" style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          <div className="spinner"></div>
        </div>
      ) : myRecipes.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">You haven’t added any recipes yet.</p>
      ) : (
        <div className="recipes-grid">
          {myRecipes.map((recipe) => (
            <RecipeCard key={recipe.id || recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
