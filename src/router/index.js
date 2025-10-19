import HomePageView from '@/views/HomePageView/HomePageView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePageView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
