<template>
  <h1>Welcome</h1>
  <p>Today is: {{ date }}</p>
  <DailyDiary/>
</template>

<script setup>
import { ref } from 'vue';
import DailyDiary from '@/components/DailyDiary.vue'

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
