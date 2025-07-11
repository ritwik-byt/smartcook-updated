import axios from "axios";

// ✅ Always point to /api prefix as defined in server.js
const API_BASE_URL = "https://smartcook-backend-1.onrender.com/api";

export const getAllRecipes = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/recipes`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching recipes:", err.message);
    throw err;
  }
};

export const addRecipe = async (data) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/recipes`, data);
    return res.data;
  } catch (err) {
    console.error("❌ Error adding recipe:", err.message);
    throw err;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/recipes/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error deleting recipe:", err.message);
    throw err;
  }
};
