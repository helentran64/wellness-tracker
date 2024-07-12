<template>
  <v-btn @click="openAddFoodForm">Add Food</v-btn>
  <div>Food Log</div>
</template>
<script setup>
import { VBtn } from "vuetify/lib/components/index.mjs";
import { useRouter } from "vue-router";
const router = useRouter();
function openAddFoodForm() {
  router.push({ name: "Add Food" });
}
</script>
<style></style>
