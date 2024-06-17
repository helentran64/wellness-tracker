<template>
  <div class="greeting">
    <div class="greetingContent">
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
        <v-btn class="greetingBtn lowerCaseBtn" @click="scrollToSection"
          >Learn More</v-btn
        >
        <v-btn class="greetingBtn lowerCaseBtn">Get Started</v-btn>
      </div>
      <div class="greetingImage">
        <img
          src="../assets/images/quick-note.png"
          alt="A Quick Note! You are awesome!"
          class="flashCardNote"
        />
      </div>
    </div>
  </div>
  <div class="previews" ref="targetSection">
    <div class="previewContext">
      <p class="pagesSubheading"><i class="fa-solid fa-pencil"></i> Food Log</p>
      <p class="pageDescription">
        Your personal guide to delicious choices and mindful eating habits
      </p>
    </div>

    <FoodLogPreview />
    <div class="previewContext">
      <p class="pagesSubheading"><i class="fa-solid fa-book"></i> Diary</p>
      <p class="pageDescription">
        For reflection and personal growth, helping you navigate life with
        positivity
      </p>
    </div>
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
@keyframes flashCardNoteJump {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-15px);
  }
}
.greetingText p {
  font-family: "Roboto Mono", monospace;
  font-size: 25px;
}
.greeting {
  color: rgb(0, 0, 0);
  height: 100vh;
  width: 100vw;
  margin: 0;
  font-size: 25px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.greetingNotes {
  flex: 1;
  padding-left: 50px;
}
.greetingContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 40%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  margin: 50px;
}
.greetingImage {
  flex: 1;
  display: flex;
  justify-content: center;
  padding-right: 50px;
}
.greetingImage:hover {
  animation: flashCardNoteJump 0.5s forwards;
}
.greetingBtn {
  margin: 10px 20px 10px 0;
}
.flashCardNote {
  width: 573px;
  height: 317px;
}
.previews {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
.previewContext {
  margin: 40px 0 40px 0;
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
.pageDescription {
  font-size: 20px;
  margin-left: 35px;
}
</style>
