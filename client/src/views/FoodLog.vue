<template>
  <div class="buttonContainer">
    <v-btn
      @click="openAddFoodForm"
      class="lowerCaseBtn"
      color="green"
      width="400px"
      >Add Food</v-btn
    >
  </div>
  <div class="foodLogSlide">
    <div class="dateContainer">
      <div class="arrowButtons">
        <v-btn
          icon="mdi-arrow-left"
          variant="text"
          @click="getPreviousFoodLog"
        ></v-btn>
      </div>
      <div>
        <h2 class="currentDate">{{ date }}</h2>
      </div>
      <div class="arrowButtons">
        <v-btn
          icon="mdi-arrow-right"
          variant="text"
          @click="getNextFoodLog"
        ></v-btn>
      </div>
    </div>

    <div class="foodLogTable" v-for="section in foodLogSections" :key="section">
      <h3>{{ section.charAt(0).toUpperCase() + section.slice(1) }}</h3>
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
          <tr v-for="foodInfo in foodLog[section]" :key="foodInfo">
            <td>{{ foodInfo.name }}</td>
            <td>{{ foodInfo.calories.toFixed(2) }}</td>
            <td>{{ foodInfo.carbs.toFixed(2) }}</td>
            <td>{{ foodInfo.protein.toFixed(2) }}</td>
            <td>{{ foodInfo.fat.toFixed(2) }}</td>
            <td>{{ foodInfo.sodium.toFixed(2) }}</td>
            <td>{{ foodInfo.sugar.toFixed(2) }}</td>
            <td>{{ foodInfo.servingWeight.toFixed(2) }}</td>
            <td>{{ foodInfo.servingUnit }}</td>
            <td>{{ foodInfo.servingQuantity }}</td>
            <v-btn
              icon="mdi-minus"
              color="red"
              size="x-small"
              @click="deleteFood(foodInfo, section)"
              class="removeFoodButton"
            ></v-btn>
          </tr>
        </tbody>
      </v-table>
    </div>

    <div class="foodLogTable">
      <h3>Total</h3>
      <v-table>
        <thead>
          <tr>
            <th>Nutrients</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="[key, total] in Object.entries(nutrients)" :key="key">
            <td>{{ key.charAt(0).toUpperCase() + key.slice(1) }}</td>
            <td>{{ formatTotal(total) }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script setup>
import { VBtn, VTable } from "vuetify/lib/components/index.mjs";
import { useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { getFoodLog, deleteFoodEntry } from "@/services/foodLogsService";
import { useStore } from "vuex";

const router = useRouter();
const date = ref(""); // Today's date
const foodLogExists = ref(false);
const foodLog = reactive({}); // Current food log of the day
const foodLogsResult = reactive([]); // All food logs by date
const currentFoodLogIndex = ref(0);
const foodLogSections = ["breakfast", "lunch", "dinner", "snack"];
const store = useStore();
const user = ref("");
const username = ref("");
const calories = ref(0);
const carbs = ref(0);
const protein = ref(0);
const fat = ref(0);
const sodium = ref(0);
const sugar = ref(0);

const nutrients = {
  calories,
  carbs,
  protein,
  fat,
  sodium,
  sugar,
};

onMounted(async () => {
  // When the page loads, get the user information
  user.value = store.getters.getUser;
  username.value = user.value.username;
  getFoodLogAndDisplayResults();
});

/**
 * Get food log from database and save the results. If successful, display and calculate the results
 */
async function getFoodLogAndDisplayResults() {
  // Check if the user has added to their food log today. If not, set a blank page
  let enteredTodaysFood = false;
  getDate();
  try {
    // Load the user's food log
    const res = await getFoodLog(username.value);
    if (res) {
      foodLogsResult.splice(0, foodLogsResult.length, res);
      foodLogExists.value = true;
      // Get the index of today's food log
      Object.entries(res.logs).forEach((entry, index) => {
        if (date.value === entry[0]) {
          currentFoodLogIndex.value = index;
          enteredTodaysFood = true;
        }
      });
      // If food was entered for today, then display and calculate the nutrients of the food
      if (enteredTodaysFood) {
        displayCurrentFoodLog(currentFoodLogIndex.value);
        calcTotalNutrients();
      }
    }
  } catch {
    console.error("You do not have any items in your food log");
  }
}

/**
 * Display the current food log
 */
function displayCurrentFoodLog(index) {
  const entry = Object.entries(foodLogsResult[0].logs);
  date.value = entry[index][0];
  for (let [key, value] of Object.entries(entry[index][1])) {
    foodLog[key] = value;
  }
}

/**
 * Converts the number into 2 decimal places and returns it
 */
function formatTotal(total) {
  return total.value.toFixed(2);
}

/**
 * Changes route to AddFoodForm
 */
function openAddFoodForm() {
  router.push({ name: "Add Food" });
}

/**
 * Calculate the total nutrients
 */
function calcTotalNutrients() {
  if (foodLogExists.value) {
    // Reset totals before recalculating
    calories.value = 0;
    carbs.value = 0;
    protein.value = 0;
    fat.value = 0;
    sodium.value = 0;
    sugar.value = 0;

    for (let section of foodLogSections) {
      for (let food of foodLog[section]) {
        for (let i in nutrients) {
          if (food[i]) {
            nutrients[i].value += food[i];
          }
        }
      }
    }
  }
}

/**
 * Returns the current date
 */
function getDate() {
  const currentDate = new Date();
  const format = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-CA", format);
  date.value = formattedDate;
}

/**
 * Go to the previous food log
 */
function getPreviousFoodLog() {
  if (currentFoodLogIndex.value > 0) {
    currentFoodLogIndex.value -= 1;
    displayCurrentFoodLog(currentFoodLogIndex.value);
    calcTotalNutrients();
  }
}

/**
 * Go to the next food log
 */
function getNextFoodLog() {
  if (foodLogsResult.length) {
    if (
      currentFoodLogIndex.value <
      Object.entries(foodLogsResult[0].logs).length - 1
    ) {
      currentFoodLogIndex.value += 1;
      displayCurrentFoodLog(currentFoodLogIndex.value);
      calcTotalNutrients();
    }
  }
}

/**
 * Delete the selected food from the user's food log
 */
async function deleteFood(foodEntry, mealType) {
  try {
    const res = await deleteFoodEntry(
      username.value,
      mealType,
      foodEntry,
      date.value
    );
    if (res) {
      getFoodLogAndDisplayResults();
    }
  } catch {
    console.error("Failed to delete food entry");
  }
}
</script>
<style>
.lowerCaseBtn {
  text-transform: capitalize;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 5px 0;
}
.dateContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dateContainer > div {
  display: flex;
  align-items: center;
}
.currentDate {
  text-align: center;
}
.foodLogSlide {
  background-color: white;
  padding: 30px 0;
  width: 1100px;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: 0 0 3px #a9a9a9;
}
.arrowButtons {
  margin: 10px;
}
.foodLogTable {
  margin: 20px auto;
  width: 1000px;
}
.removeFoodButton {
  margin-top: 10px;
}
</style>
