import axios from "axios";

const API_BASE_URL = "https://smartcook-backend-1.onrender.com/api";

export const getAllRecipes = async () => {
  const res = await axios.get(`${API_BASE_URL}/recipes`);
  return res.data;
};

export const addRecipe = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_BASE_URL}/recipes`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
