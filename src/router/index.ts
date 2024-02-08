import Main from '@pages/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: Main,
    },
  ]
})

export default router
