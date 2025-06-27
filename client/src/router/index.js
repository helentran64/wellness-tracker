import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/food-log",
      name: "Food Log",
      component: () => import("@/views/FoodLog.vue"),
    },
    {
      path: "/daily-diary",
      name: "Daily Diary",
      component: () => import("@/views/DailyDiary.vue"),
    },
    {
      path: "/sign-up",
      name: "Sign Up",
      component: () => import("@/views/SignUpPage.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/add-food",
      name: "Add Food",
      component: () => import("@/views/AddFoodForm.vue"),
    },
    {
      path: "/edit-food-note",
      name: "Edit Food Note",
      component: () => import("@/views/EditFoodNote.vue"),
    },
  ],
});

export default router;
