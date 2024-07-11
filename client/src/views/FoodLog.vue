<template>
  <div class="foodForm">
    <div class="inputStyle">
      <p class="inputHeadings">What did you eat today?</p>
      <v-autocomplete
        v-model="foodCode"
        width="400"
        density="compact"
      ></v-autocomplete>
    </div>
    <div class="inputStyle">
      <p class="inputHeadings">
        Was it for breakfast, lunch, dinner, or a snack?
      </p>
      <v-select
        v-model="meal"
        :items="meals"
        width="400"
        density="compact"
      ></v-select>
    </div>
    <div class="submitButton">
      <v-btn
        color="black"
        @click="getFood(foodCode)"
        icon="mdi-magnify"
        variant="text"
      ></v-btn>
    </div>
  </div>
  <div class="foodLog">
    <v-card v-if="breakfast.length" class="mealCards">
      <v-card-item>
        <div class="mealFont">Breakfast</div>
        <div v-for="(food, i) in breakfast" :key="i">{{ food }}</div>
      </v-card-item>
    </v-card>
    <v-card v-if="lunch.length" class="mealCards">
      <v-card-item>
        <div class="mealFont">Lunch</div>
        <div v-for="(food, i) in lunch" :key="i">{{ food }}</div>
      </v-card-item>
    </v-card>
    <v-card v-if="dinner.length" class="mealCards">
      <v-card-item>
        <div class="mealFont">Dinner</div>
        <div v-for="(food, i) in dinner" :key="i">{{ food }}</div>
      </v-card-item>
    </v-card>
    <v-card v-if="snack.length" class="mealCards">
      <v-card-item>
        <div class="mealFont">Snack</div>
        <div v-for="(food, i) in snack" :key="i">{{ food }}</div>
      </v-card-item>
    </v-card>
  </div>
</template>
<script setup>
import {
  VAutocomplete,
  VBtn,
  VSelect,
  VCard,
  VCardItem,
} from "vuetify/lib/components/index.mjs";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { getFoodLog, insertToFoodLog } from "@/services/foodLogsService";
const meals = ["Breakfast", "Lunch", "Dinner", "Snack"]; // For the drop down menu
const meal = ref(""); // The current meal the user entered
const foodCode = ref("");
const foodDescription = ref("");
const foodLogExists = ref(false);
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
    foodLogExists.value = true;
  } catch {
    foodLogExists.value = false;
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
      foodLogExists.value = true;
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
    foodCode.value = "";
    meal.value = "";
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
.foodForm {
  margin: 50px auto 50px auto;
  display: flex;
  width: 900px;
}
.inputStyle {
  width: 400px;
  margin-right: 5px;
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
.mealFont {
  font-size: 20px;
  font-weight: 500;
}
.mealCards {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
