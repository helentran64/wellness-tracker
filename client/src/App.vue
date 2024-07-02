<script setup>
import { RouterLink, RouterView } from "vue-router";
import PageFooter from "@/components/PageFooter.vue";
import { VBtn } from "vuetify/components";
import { useStore } from "vuex";
import { computed } from "vue";
import router from "./router";

const store = useStore();

const isAuthenticated = computed(() => {
  return store.getters.isAuthenticated;
});

function signOut() {
  store.dispatch("signOut");
  router.push("/");
  window.location.reload();
}
</script>

<template>
  <header>
    <div>
      <nav>
        <div class="navbar">
          <RouterLink to="/" class="router-link-item logo"
            ><i class="fa-solid fa-carrot"></i
            ><span style="font-weight: 500">myWellness</span></RouterLink
          >
          <span class="navItems">
            <RouterLink
              v-if="isAuthenticated"
              to="/food-log"
              class="router-link-item"
              >FoodLog</RouterLink
            >
            <RouterLink
              v-if="isAuthenticated"
              to="/daily-diary"
              class="router-link-item"
              >Diary</RouterLink
            >
            <v-btn
              v-if="isAuthenticated"
              color="primary"
              class="mr-2 lowerCaseBtn"
              @click="signOut"
              >Sign Out</v-btn
            >
            <v-btn
              v-if="!isAuthenticated"
              color="primary"
              class="mr-2 lowerCaseBtn"
              to="/sign-up"
              >Sign up</v-btn
            >
            <v-btn
              v-if="!isAuthenticated"
              color="primary"
              class="mr-2 lowerCaseBtn"
              to="/login"
              >Log in</v-btn
            >
          </span>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
  <footer>
    <PageFooter />
  </footer>
</template>

<style scoped>
.navbar {
  padding: 15px;
  display: flex;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
}
.navItems .router-link-item {
  padding: 10px;
}
.navItems {
  margin-left: auto;
  margin-top: 5px;
  font-weight: 600;
}
.router-link-item {
  text-decoration: none;
  color: black;
  border-radius: 4px;
  margin-right: 10px;
}
.navItems .router-link-item:hover {
  color: #0074af;
}
.lowerCaseBtn {
  text-transform: capitalize;
}
.logo {
  font-size: 20px;
}
.fa-carrot {
  margin: 5px;
}
</style>
