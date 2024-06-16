<template>
  <div class="greeting">
    <div class="greetingNotes">
      <span class="greetingText">
        <p>
          Empower Your <span style="font-weight: 600">Wellness</span> Journey
          <i class="fa-solid fa-bolt"></i>
        </p>
        <p>
          Your Path to a
          <span style="font-weight: 600">Healthier Life</span> Starts Here
        </p></span
      >
      <v-btn
        class="greetingBtn lowerCaseBtn"
        @click="scrollToSection"
        >Learn More</v-btn
      >
      <v-btn class="greetingBtn lowerCaseBtn">Get Started</v-btn>
    </div>
  </div>

  <div class="previews" ref="targetSection">
    <p class="pagesSubheading">
      <i class="fa-solid fa-pencil"></i> Food Log
    </p>
    <FoodLogPreview />
    <p class="pagesSubheading"><i class="fa-solid fa-book"></i> Diary</p>
    <DailyPreview />
  </div>
</template>

<script setup>
import DailyPreview from "@/components/DiaryPreview.vue";
import FoodLogPreview from "@/components/FoodLogPreview.vue";
import { VBtn } from "vuetify/components";
import { ref } from "vue";
const targetSection = ref(null);

function scrollToSection() {
  if (targetSection.value) {
    window.scrollTo({
      top: targetSection.value.offsetTop,
      behavior: "smooth",
    });
  }
}
</script>

<style scoped>
.greetingText p {
  font-family: "Roboto Mono", monospace;
  font-size: 25px;
}
.greeting {
  color: rgb(0, 0, 0);
  height: 100vh;
  width: calc(100vw - 200px);
  padding: 50px 100px;
  margin: 0;
  font-size: 25px;
  position: relative;
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
.previews {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
.fa-bolt {
  color: #65ccff;
}
.lowerCaseBtn {
  text-transform: lowercase;
}
.pagesSubheading {
  font-size: 30px;
  font-weight: 600;
}
</style>
