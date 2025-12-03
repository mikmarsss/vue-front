import HomePageView from '@/views/HomePageView/HomePageView.vue'
import AllFilesView from '@/views/AllFilesView/AllFilesView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import StatisticView from '@/views/StatisticView/StatisticView.vue'
import UserLoggingView from '@/views/UserLoggingView/UserLoggingView.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePageView,
  },
  {
    path: '/allfiles',
    name: 'AllFiles',
    component: AllFilesView,
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: StatisticView,
  },
  {
    path: '/logging',
    name: 'Logging',
    component: UserLoggingView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
