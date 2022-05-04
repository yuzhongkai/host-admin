import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const pubilcRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/layout/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: pubilcRoutes
})

export default router
