<template>
  <div class="foodLogTable">
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
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
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
const router = useRouter();
function openAddFoodForm() {
  router.push({ name: "Add Food" });
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
.foodLogTable{
  margin: 20px auto 20px auto;
  width: 1000px;
}
</style>
