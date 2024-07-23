<template>
  <div class="previewSection" ref="section">
    <div>
      <img
        class="foodLogPreviewImage"
        src="../../src/assets/images/randomFoods.png"
        alt="Foods"
      />
    </div>
    <div class="previewContext">
      <p class="pagesSubheading">Food Log</p>
      <p class="pageDescription">
        Your personal guide to delicious choices and mindful eating habits
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const section = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  if (section.value) {
    observer.observe(section.value);
  }
});
</script>

<style scoped>
.previewSection {
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}
.previewSection.visible {
  opacity: 1;
}
.foodLogPreviewImage {
  width: 420px;
  transition: opacity 1s ease-in-out;
}
.previewContext {
  margin: 40px 0;
}
.pageDescription {
  font-size: 20px;
}
.pagesSubheading {
  font-size: 40px;
  font-weight: 600;
}
</style>
