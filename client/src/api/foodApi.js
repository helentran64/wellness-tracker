const appId = "76161d1c";
const apiKey = "d6bd214f03ecf7e60415e006c49bb602";
import axios from "axios";

// export async function searchFood(query) {
//   const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`;

//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       "x-app-id": appId,
//       "x-app-key": apiKey,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   const data = await response.json();
//   return data;
// }

export async function searchFood(foodName) {
  const listOfFoods = [];

  try {
    const response = await axios.get(
      "https://trackapi.nutritionix.com/v2/search/instant",
      {
        params: {
          query: foodName,
          common: true,
          detailed: false,
        },
        headers: {
          "x-app-id": appId,
          "x-app-key": apiKey,
        },
      }
    );

    const foods = response.data.common.map((item) => item.food_name);
    listOfFoods.push(...foods);
  } catch (error) {
    console.error("Error fetching food names:", error);
  }
  return listOfFoods;
}
