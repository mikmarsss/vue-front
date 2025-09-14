import HomePageView from '@/views/HomePageView/HomePageView.vue'
import SettingsPageView from '@/views/SettingsPageView/SettingsPageView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePageView,
  },
  {
    path: '/userSettings',
    name: 'UserSettings',
    component: SettingsPageView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
