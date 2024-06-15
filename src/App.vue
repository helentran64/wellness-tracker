<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div>
      <nav>
        <div class="navbar">
          <RouterLink to="/" class="router-link-item logo"><i class="fa-solid fa-carrot"></i>myWellness</RouterLink>
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
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 4px 2px -2px gray;
}
.navItems .router-link-item{
  padding: 5px;
}
.navItems{
  margin-left:auto;
  margin-top:5px;
}
.router-link-item{
  text-decoration: none;
  color: black;
  border-radius: 4px;
}
.navItems .router-link-item:hover {
  background-color: #f0f0f0;
}
.logo{
  font-size: 20px;
}
.fa-carrot{
  margin: 5px;
}
</style>
