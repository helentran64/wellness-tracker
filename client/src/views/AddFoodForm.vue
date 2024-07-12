<template>
  <div class="foodForm">
    <div class="inputStyle">
      <p class="inputHeadings">Search the food by name</p>
      <v-text-field
        v-model="foodName"
        width="400"
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
        width="400"
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
  <div>
    <v-btn color="green">Add To Food Log</v-btn>
  </div>
  {{ listOfFoods }}
  {{ meal }}
</template>
<script setup>
import { VTextField, VBtn, VSelect } from "vuetify/lib/components/index.mjs";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { getFoodLog, insertToFoodLog } from "@/services/foodLogsService";
import { searchFood } from "@/api/foodApi";
const meals = ["Breakfast", "Lunch", "Dinner", "Snack"]; // For the drop down menu
const meal = ref(""); // The current meal the user entered
const foodName = ref(""); // Name of the food the user entered
const listOfFoods = reactive([]); // list of foods to display for user to choose from
const store = useStore();
const user = ref("");
const username = ref("");

onMounted(async () => {
  // When the page loads, get the user information
  user.value = store.getters.getUser;
  username.value = user.value.username;
});

/**
 * With the food name, get food list from api call
 */
async function getFood() {
  const foodList = await searchFood(foodName.value);
  listOfFoods.splice(0, listOfFoods.length, ...foodList);
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
