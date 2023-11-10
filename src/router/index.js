// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/admin',
    component: () => import('../layouts/default/Default.vue'),
  },
  {
    path: '/',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/home',
    component: () => import('../views/HomePage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



export default router
