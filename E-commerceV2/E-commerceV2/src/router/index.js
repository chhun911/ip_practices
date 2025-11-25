import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Views/Homeview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories/:categoryId',
      name: 'category',
      component: () => import('../Views/CategoryView.vue')
    },
    {
      path: '/products/:productId',
      name: 'product',
      component: () => import('../Views/ProductView.vue')
    }
  ]
})

export default router
