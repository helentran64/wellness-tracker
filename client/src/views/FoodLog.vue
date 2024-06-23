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
import { reactive, ref } from "vue";
import axios from "axios";
const meals = ["Breakfast", "Lunch", "Dinner", "Snack"];
const meal = ref("");
const foodCode = ref("");
const foodDescription = ref("");
const breakfast = reactive([]);
const lunch = reactive([]);
const dinner = reactive([]);
const snack = reactive([]);

function getFood(foodId) {
  const id = foodId;
  const baseurl = "https://food-nutrition.canada.ca";
  const url = `${baseurl}/api/canadian-nutrient-file/food/?lang=en&id=${id}`;

  axios
    .get(url, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      const data = response.data;
      foodDescription.value = data[0].food_description;
      recordToLog();
    })
    .catch((error) => {
      console.error("Error fetching food data:", error);
    });
}

function recordToLog() {
  if (meal.value === "Breakfast") {
    breakfast.push(foodDescription.value);
  } else if (meal.value === "Lunch") {
    lunch.push(foodDescription.value);
  } else if (meal.value === "Dinner") {
    dinner.push(foodDescription.value);
  } else if (meal.value === "Snack") {
    snack.push(foodDescription.value);
  }
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
