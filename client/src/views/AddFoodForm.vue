<template>
  <div class="foodForm">
    <div class="inputStyle">
      <p class="inputHeadings">Search the food by name</p>
      <v-text-field
        v-model="foodInputName"
        width="450"
        density="compact"
      ></v-text-field>
    </div>
    <div class="inputStyle">
      <p class="inputHeadings">
        Was it for breakfast, lunch, dinner, or a snack?
      </p>
      <v-select
        v-model="meal"
        :items="meals"
        width="450"
        density="compact"
      ></v-select>
    </div>
    <div class="submitButton">
      <v-btn
        color="black"
        icon="mdi-magnify"
        variant="text"
        @click="getFood"
      ></v-btn>
    </div>
  </div>
  <div class="foodTable" v-if="listOfFoods.length">
    <v-table>
      <thead>
        <tr>
          <th>Food</th>
          <th>Select One</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(food, index) in listOfFoods" :key="index">
          <td>{{ food.name }}</td>
          <td>
            <v-checkbox
              :value="food.name"
              v-model="selectedFoodName"
            ></v-checkbox>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div
    class="buttonContainer"
    v-if="listOfFoods.length && selectedFoodName.length"
  >
    <v-btn color="green" @click="getSelectedFoodInfo" class="lowerCaseBtn"
      >Select</v-btn
    >
  </div>
  <div class="foodInformationTable" v-if="Object.keys(foodInformation).length">
    <v-table>
      <thead>
        <tr>
          <th>Food</th>
          <th>Calories</th>
          <th>Carbs</th>
          <th>Protein</th>
          <th>Fats</th>
          <th>Sodium</th>
          <th>Sugar</th>
          <th>Serving Weight (g)</th>
          <th>Serving Unit</th>
          <th>Serving Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ foodInformation.name }}</td>
          <td>{{ foodInformation.calories.toFixed(2) }}</td>
          <td>{{ foodInformation.carbs.toFixed(2) }}</td>
          <td>{{ foodInformation.protein.toFixed(2) }}</td>
          <td>{{ foodInformation.fat.toFixed(2) }}</td>
          <td>{{ foodInformation.sodium.toFixed(2) }}</td>
          <td>{{ foodInformation.sugar.toFixed(2) }}</td>
          <td>{{ foodInformation.servingWeight.toFixed(2) }}</td>
          <td>{{ foodInformation.servingUnit }}</td>
          <td>
            <div class="quantityInput">
              <v-btn
                icon="mdi-minus"
                @click="subtractQuantity"
                size="x-small"
                style="margin: 10px"
              ></v-btn>
              <v-text-field
                :value="foodInformation.servingQuantity"
                density="compact"
                style="margin-top: 10px; width: 60px"
                variant="outlined"
                :readonly="true"
              ></v-text-field>
              <v-btn
                icon="mdi-plus"
                @click="addQuantity"
                size="x-small"
                style="margin: 10px"
              ></v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div class="buttonContainer" v-if="Object.keys(foodInformation).length">
    <v-btn color="green" class="lowerCaseBtn" @click="addFoodToDB"
      >Add To Food Log</v-btn
    >
  </div>
</template>
<script setup>
import {
  VTextField,
  VBtn,
  VSelect,
  VTable,
  VCheckbox,
} from "vuetify/lib/components/index.mjs";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { insertToFoodLog } from "@/services/foodLogsService";
import { searchFood, getFoodDetails } from "@/api/foodApi";
import { useRouter } from "vue-router";
const router = useRouter();
const meals = ["Breakfast", "Lunch", "Dinner", "Snack"]; // For the drop down menu
const meal = ref(""); // The current meal the user entered
const foodInputName = ref(""); // Name of the food the user entered
const selectedFoodName = ref(""); // Selected from the checkbox
const listOfFoods = reactive([]); // list of foods to display for user to choose from
const foodInformation = reactive({});
const originalFoodInformation = reactive({});
const facts = [
  "name",
  "calories",
  "carbs",
  "protein",
  "fat",
  "sodium",
  "sugar",
  "servingWeight",
  "servingUnit",
  "servingQuantity",
];
const store = useStore();
const user = ref("");
const username = ref("");

onMounted(async () => {
  // When the page loads, get the user information
  user.value = store.getters.getUser;
  username.value = user.value.username;
});

/**
 * With the food name, get different options of the food from api call
 */
async function getFood() {
  if (meal.value.length) {
    const foodList = await searchFood(foodInputName.value);
    listOfFoods.splice(0, listOfFoods.length, ...foodList);
    // Clear the previous foodInformation object if exists
    if (Object.keys(foodInformation).length) {
      for (let key of Object.keys(foodInformation)) {
        delete foodInformation[key];
      }
    }
  }
}

/**
 * Get the nutrients of the selected food
 */
async function getSelectedFoodInfo() {
  const res = await getFoodDetails(selectedFoodName.value);
  foodInformation.name = selectedFoodName.value;
  foodInformation.servingUnit = res.servingUnit;
  foodInformation.servingQuantity = 1;

  for (let fact of facts) {
    if (
      fact !== "name" &&
      fact !== "servingQuantity" &&
      fact !== "servingUnit"
    ) {
      foodInformation[fact] = Number(res[fact]) / Number(res.servingQuantity);
      // Save a copy of the original nutrient facts for later use
      originalFoodInformation[fact] =
        Number(res[fact]) / Number(res.servingQuantity);
    }
  }
}

/**
 * Subtract quantity of food by 1
 */
function subtractQuantity() {
  if (foodInformation.servingQuantity > 1) {
    --foodInformation.servingQuantity;
    for (let key of Object.keys(foodInformation)) {
      if (
        key !== "name" &&
        key !== "servingQuantity" &&
        key !== "servingUnit"
      ) {
        foodInformation[key] =
          foodInformation[key] - originalFoodInformation[key];
      }
    }
  }
}

/**
 * Add quantity of food by 1
 */
function addQuantity() {
  foodInformation.servingQuantity++;
  for (let key of Object.keys(foodInformation)) {
    if (key !== "name" && key !== "servingQuantity" && key !== "servingUnit") {
      foodInformation[key] =
        foodInformation[key] + originalFoodInformation[key];
    }
  }
}

/**
 * Add food to the database
 */
async function addFoodToDB() {
  const food = {};
  for (let [key, value] of Object.entries(foodInformation)) {
    food[key] = value;
  }
  try {
    if (Object.keys(food).length) {
      await insertToFoodLog(username.value, meal.value, food);
      router.push({ name: "Food Log" });
    }
  } catch (err) {
    console.error("Failed to add to db", err);
  }
}
</script>
<style scoped>
.foodForm {
  margin: 50px auto 50px auto;
  display: flex;
  width: 1000px;
}
.inputStyle {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
}
.foodLog {
  width: 500px;
  margin: 50px auto 50px auto;
}
.inputHeadings {
  font-size: 15px;
  font-weight: 500;
}
.submitButton {
  margin-top: 20px;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 5px 0;
}
.lowerCaseBtn {
  text-transform: capitalize;
}
.foodTable {
  width: 1000px;
  margin: 20px auto 20px auto;
}
.foodInformationTable {
  width: 1000px;
  margin: 20px auto 20px auto;
}
.quantityInput {
  display: flex;
}
</style>
