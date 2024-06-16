import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/food-log',
      name: 'Food Log',
      component: () => import('@/views/FoodLog.vue')
    },
    {
      path: '/daily-diary',
      name: 'Daily Diary',
      component: () => import('@/views/DailyDiary.vue')
    }
  ]
})

export default router
