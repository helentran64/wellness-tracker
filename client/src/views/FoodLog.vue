<template>
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
  <div class="buttonContainer">
    <v-btn
      @click="openAddFoodForm"
      class="lowerCaseBtn"
      color="green"
      width="400px"
      >Add Food</v-btn
    >
  </div>
</template>
<script setup>
import { VBtn, VTable } from "vuetify/lib/components/index.mjs";
import { useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { getFoodLog } from "@/services/foodLogsService";
import { useStore } from "vuex";
const router = useRouter();
const foodLogExists = ref(false);
const foodLog = reactive({});
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
  try {
    // Load the user's food log
    const res = await getFoodLog(username.value);
    if (res) {
      foodLogExists.value = true;
      for (let [key, value] of Object.entries(res)) {
        foodLog[key] = value;
      }
      calcTotalNutrients();
    }
  } catch {
    console.error("You do not have any items in your food log");
  }
});

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
.foodLogTable {
  margin: 20px auto 20px auto;
  width: 1000px;
}
</style>
