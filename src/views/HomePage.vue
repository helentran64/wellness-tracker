<template>
  <div class="greeting">
    <div class="greetingNotes">
      <h1>Empower Your Wellness Journey</h1>
      <h2>Your Path to a Healthier Life Starts Here</h2>
      <v-btn variant="outlined" class="greetingBtn">Learn More</v-btn>
      <v-btn variant="outlined" class="greetingBtn">Get Started</v-btn>
    </div>
  </div>

  <DailyPreview />
  <FoodLogPreview />
  <MoodPreview />
</template>

<script setup>
import { ref } from "vue";
import DailyPreview from "@/components/DiaryPreview.vue";
import FoodLogPreview from "@/components/FoodLogPreview.vue";
import MoodPreview from "@/components/MoodPreview.vue";
import { VBtn } from "vuetify/components";
</script>

<style scoped>
.greeting {
  color: white;
  height: 100vh;
  width: 100vw;
  padding: 50px;
  margin: 0;
  font-size: 30px;
  position: relative;
  background-color: black;
}
.greetingNotes {
  margin: 0;
  position: absolute;
  top: 45%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.greetingBtn {
  margin: 10px 20px 10px 0;
}
</style>
