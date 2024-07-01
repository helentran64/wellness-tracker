<template>
  <div class="foodInput">
    <p class="infoHeadings">What did you eat today? Enter the food code</p>
    <v-text-field v-model="foodCode"></v-text-field>
    <p class="infoHeadings">Was it for breakfast, lunch, dinner, or a snack?</p>
    <v-select v-model="meal" :items="meals"></v-select>
    <v-btn style="width: 600px" color="primary" @click="getFood(foodCode)"
      >submit</v-btn
    >
  </div>
  <div class="foodLog">
    <p class="infoHeadings">Your food log</p>
    <div>
      <p class="mealFont" v-if="breakfast.length">Breakfast</p>
      <ul v-for="(food, i) in breakfast" :key="i">
        <li>{{ food }}</li>
      </ul>
    </div>
    <div>
      <p class="mealFont" v-if="lunch.length">Lunch</p>
      <ul v-for="(food, i) in lunch" :key="i">
        <li>{{ food }}</li>
      </ul>
    </div>
    <div>
      <p class="mealFont" v-if="dinner.length">Dinner</p>
      <ul v-for="(food, i) in dinner" :key="i">
        <li>{{ food }}</li>
      </ul>
    </div>
    <div>
      <p class="mealFont" v-if="snack.length">Snack</p>
      <ul v-for="(food, i) in snack" :key="i">
        <li>{{ food }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { VTextField, VBtn, VSelect } from "vuetify/lib/components/index.mjs";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { getFoodLog, insertToFoodLog } from "@/services/foodLogsService";
const meals = ["Breakfast", "Lunch", "Dinner", "Snack"]; // For the drop down menu
const meal = ref(""); // The current meal the user entered
const foodCode = ref("");
const foodDescription = ref("");
const breakfast = reactive([]);
const lunch = reactive([]);
const dinner = reactive([]);
const snack = reactive([]);
const store = useStore();
const user = ref("");
const username = ref("");

onMounted(async () => {
  // When the page loads, get the user information
  user.value = store.getters.getUser;
  username.value = user.value.username;

  // Load the food log if the user has one
  try {
    await fetchFromDataBase(username.value);
  } catch (err) {
    console.error(`${username.value}'s food log does not exist`);
  }
});

async function getFood(foodId) {
  try {
    const id = foodId;
    const baseurl = "https://food-nutrition.canada.ca";
    const url = `${baseurl}/api/canadian-nutrient-file/food/?lang=en&id=${id}`;

    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = response.data;
    foodDescription.value = data[0].food_description;

    await recordToDataBase();
    if (username.value) {
      await fetchFromDataBase(username.value);
    }
  } catch (error) {
    console.error("Error fetching food data:", error);
  }
}

async function recordToDataBase() {
  try {
    await insertToFoodLog(
      username.value,
      meal.value.toLowerCase(),
      foodDescription.value
    );
  } catch (error) {
    console.error("Error adding to database", error);
  }
}

async function fetchFromDataBase(username) {
  const foodlogResults = await getFoodLog(username);
  breakfast.splice(0, breakfast.length, ...(foodlogResults.breakfast || []));
  lunch.splice(0, lunch.length, ...(foodlogResults.lunch || []));
  dinner.splice(0, dinner.length, ...(foodlogResults.dinner || []));
  snack.splice(0, snack.length, ...(foodlogResults.snack || []));
}
</script>
<style scoped>
.foodInput {
  width: 500px;
  margin: 50px auto 50px auto;
}
.foodLog {
  width: 500px;
  margin: 50px auto 50px auto;
}
.infoHeadings {
  font-size: 20px;
  font-weight: 500;
}
.mealFont {
  font-size: 18px;
}
</style>
