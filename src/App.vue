<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div>
      <nav>
        <v-app-bar>
          <RouterLink to="/">myWellness</RouterLink>
          <RouterLink to="/food-log">FoodLog</RouterLink>
          <RouterLink to="/daily-diary">Diary</RouterLink>
          <RouterLink to="/daily-mood">Mood</RouterLink>
        </v-app-bar>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
