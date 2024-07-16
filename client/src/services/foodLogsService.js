import { api } from "./api";

export async function getFoodLog(username) {
  try {
    const response = await api.get(`/foodlogs/${username}`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching ${username}'s food log:`, err);
  }
}

export async function insertToFoodLog(username, mealType, food) {
  try {
    const data = {
      mealType: mealType.toLowerCase(),
      food
    };
    const response = await api.post(`/foodlogs/${username}`, data);
    return response.data;
  } catch (err) {
    console.error("Error inserting to food log", err);
  }
}
