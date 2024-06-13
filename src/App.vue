<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div>
      <nav>
        <div class="navbar">
          <RouterLink to="/" class="router-link-item">myWellness</RouterLink>
          <span class="navItems">
            <RouterLink to="/food-log" class="router-link-item">FoodLog</RouterLink>
            <RouterLink to="/daily-diary" class="router-link-item">Diary</RouterLink>
            <RouterLink to="/daily-mood" class="router-link-item">Mood</RouterLink>
          </span>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.navbar {
  background-color: rgb(174, 174, 174);
  padding: 10px;
  display: flex;
  justify-content: flex-start;
}
.navItems{
  margin-left:auto;
}
.router-link-item{
  text-decoration: none;
  color: black;
}
.navItems .router-link-item{
  padding: 5px;
}
</style>
