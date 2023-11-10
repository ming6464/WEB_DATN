// Composables
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/admin',
    component: () => import('../layouts/default/Default.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/HomePage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../components/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



export default router
