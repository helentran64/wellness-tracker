<template>
  <div class="previewSection" ref="section">
    <div class="previewContext">
      <p class="pagesSubheading">Diary</p>
      <p class="pageDescription">
        For reflection and personal growth, helping you navigate life with
        positivity
      </p>
    </div>
    <div>
      <img
        class="diaryPreviewImage"
        src="../../src/assets/images/sittingUnderTree.png"
        alt="Person sitting under a tree, reflecting"
      />
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
.diaryPreviewImage {
  width: 400px;
  transition: opacity 1s ease-in-out;
}
</style>
