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
        <v-btn
          class="greetingBtn capitalizeButton"
          @click="scrollToSection"
          color="primary"
          >Learn More</v-btn
        >
        <v-btn
          v-show="!loggedIn"
          class="greetingBtn capitalizeButton"
          to="/login"
          >Get Started</v-btn
        >
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
  <div class="previewItems" ref="targetSection">
    <FoodLogPreview class="previewItem" @click="goToFoodLogPage" />
    <DailyPreview class="previewItem" @click="goToDiaryPage" />
  </div>
</template>

<script setup>
import DailyPreview from "@/components/DiaryPreview.vue";
import FoodLogPreview from "@/components/FoodLogPreview.vue";
import { VBtn } from "vuetify/components";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const targetSection = ref(null);
const loggedIn = ref(false);
const router = useRouter();

onMounted(() => {
  try {
    const user = store.getters.getUser;
    if (user) {
      loggedIn.value = true;
    }
  } catch {
    loggedIn.value = false;
  }
});

function scrollToSection() {
  if (targetSection.value) {
    window.scrollTo({
      top: targetSection.value.offsetTop,
      behavior: "smooth",
    });
  }
}

function goToFoodLogPage() {
  router.push({ name: "Food Log" }).then(() => {
    window.scrollTo(0, 0);
  });
}

function goToDiaryPage() {
  router.push({ name: "Daily Diary" }).then(() => {
    window.scrollTo(0, 0);
  });
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
  font-size: 35px;
}
.greeting {
  height: 50vh;
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
.previewItems {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
@media (max-width: 1660px) {
  .previewItems {
    width: 80%;
  }
}
@media (max-width: 1200px) {
  .previewItems {
    flex-direction: column;
  }
}
.previewItem {
  border-radius: 20px;
  box-shadow: 0 0 10px #aaaaaa;
  padding: 20px;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;

}
.previewItem:hover {
  cursor: pointer;
}
.fa-bolt {
  color: #65ccff;
}
.capitalizeButton {
  text-transform: capitalize;
}
</style>
