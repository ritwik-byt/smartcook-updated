const API_BASE_URL = "https://smartcook-backend-mv6r.onrender.com";

export async function getAllRecipes() {
  const response = await fetch(`${API_BASE_URL}/recipes`);
  return response.json();
}

export async function addRecipe(recipeData) {
  const response = await fetch(`${API_BASE_URL}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeData),
  });
  return response.json();
}
