<template>
  <div class="bannerContainer">
    <div class="banner">
      <div v-for="message in messages" :key="message.note">
        <p><i :class="message.icon"></i> {{ message.note }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const messages = [
  {
    note: "Nourish your body",
    icon: "fa-solid fa-apple-whole",
  },
  {
    note: "Choose wellness every day",
    icon: "fa-regular fa-heart",
  },
  {
    note: "Find your balance",
    icon: "fa-solid fa-scale-balanced",
  },
  {
    note: "Embrace a healthy lifestyle",
    icon: "fa-regular fa-sun",
  },
];
</script>
<style scoped>
@keyframes scrollBanner {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
.banner p {
  font-family: "Roboto Mono", monospace;
  display: flex;
  font-size: 17px;
  margin-right: 100px;
  font-weight: 400;
  white-space: nowrap;
}
.banner {
  padding: 20px;
  position: relative;
  margin: 20px 0 20px 0;
  display: flex;
  justify-content: space-around;
  width: fit-content;
  animation: scrollBanner 20s linear infinite;
}
i {
  margin-right: 8px;
  font-size: 25px;
}
</style>
