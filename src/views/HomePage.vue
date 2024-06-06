<template>
  <h1>Welcome</h1>
  <p>Today is: {{ date }}</p>
  <DailyPreview/>
  <FoodLogPreview/>
  <MoodPreview/>
</template>

<script setup>
import { ref } from 'vue';
import DailyPreview from '@/components/DiaryPreview.vue'
import FoodLogPreview from '@/components/FoodLogPreview.vue'
import MoodPreview from '@/components/MoodPreview.vue'

const date = ref(showDate());

function showDate() {
  const dateObj = new Date();
  const currentDate =
    dateObj.getDate() +
    "/" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getFullYear();
  return currentDate;
}
</script>

<style scoped></style>
