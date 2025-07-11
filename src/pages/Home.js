import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

const defaultImage = "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";

function Home() {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'dessert'];

  useEffect(() => {
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, currentSearchQuery]);

  useEffect(() => {
    sortRecipes(sortBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (currentCategory !== 'all') params.category = currentCategory;
      if (currentSearchQuery) params.search = currentSearchQuery;

      const res = await axios.get('http://localhost:5050/api/recipes', { params });
      const recipes = res.data;
      setFilteredRecipes(recipes);
      setLoading(false);
    } catch (error) {
      console.error('Error loading recipes:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setCurrentSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const sortRecipes = (criteria) => {
    const sorted = [...filteredRecipes];
    switch (criteria) {
      case 'popular':
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'time':
        sorted.sort((a, b) => a.cookTime - b.cookTime);
        break;
      case 'latest':
      default:
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    setFilteredRecipes(sorted);
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    document.body.style.overflow = 'hidden';
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="home-page">
      <div className="search-sort-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={currentSearchQuery}
          onChange={handleSearch}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Top Rated</option>
          <option value="time">Shortest Time</option>
        </select>
      </div>

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${currentCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="featured-recipes">
            <h2>Featured Recipes</h2>
            <div className="recipe-grid">
              {filteredRecipes.slice(0, 3).map((recipe) => (
                <div
                  key={recipe.id || recipe._id}
                  className="recipe-card featured"
                  onClick={() => openRecipeModal(recipe)}
                >
                  <img src={recipe.imageUrl || defaultImage} alt={recipe.title} />
                  <div className="card-content">
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="all-recipes">
            <h2>All Recipes</h2>
            {filteredRecipes.length === 0 ? (
              <p>No recipes found.</p>
            ) : (
              <div className="recipe-grid">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id || recipe._id}
                    className="recipe-card"
                    onClick={() => openRecipeModal(recipe)}
                  >
                    <img src={recipe.imageUrl || defaultImage} alt={recipe.title} />
                    <div className="card-content">
                      <h3>{recipe.title}</h3>
                      <p>{recipe.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeRecipeModal}>
          <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeRecipeModal}>
              &times;
            </button>
            <h2>{selectedRecipe.title}</h2>
            <img src={selectedRecipe.imageUrl || defaultImage} alt={selectedRecipe.title} />
            <p>{selectedRecipe.description}</p>

            <h4>Ingredients</h4>
            <ul>
              {selectedRecipe.ingredients.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ul>

            <h4>Instructions</h4>
            <ol>
              {selectedRecipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <div className="recipe-footer">
              <p><strong>Author:</strong> {selectedRecipe.author}</p>
              <p><strong>Cook Time:</strong> {selectedRecipe.cookTime} mins</p>
              <p><strong>Servings:</strong> {selectedRecipe.servings}</p>
              <p><strong>Likes:</strong> {selectedRecipe.likes}</p>
              <p><strong>Rating:</strong> {(selectedRecipe.rating / 10).toFixed(1)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
