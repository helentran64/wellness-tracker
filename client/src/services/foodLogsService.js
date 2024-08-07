import { api } from "./api";

export async function getFoodLog(username) {
  try {
    const response = await api.get(`/foodlogs/${username}`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching ${username}'s food log:`, err);
  }
}

export async function insertToFoodLog(username, mealType, food, date) {
  try {
    const data = {
      mealType: mealType.toLowerCase(),
      food,
      date,
    };
    const response = await api.post(`/foodlogs/${username}`, data);
    return response.data;
  } catch (err) {
    console.error("Error inserting to food log", err);
  }
}

export async function insertTodaysFoodLog(username, date) {
  try {
    const data = {
      mealType: "", // Empty string for mealType
      food: "", // Empty string for food
      date,
    };
    const response = await api.post(`/foodlogs/${username}`, data);
    return response.data;
  } catch (err) {
    console.error("Error inserting to food log", err);
  }
}

export async function deleteFoodEntry(username, mealType, foodEntry, date) {
  try {
    const data = {
      mealType,
      foodEntry,
      date,
    };
    const response = await api.delete(`/foodlogs/${username}`, { data });
    return response.data;
  } catch (err) {
    console.error("Error deleting selected food entry", err);
  }
}
