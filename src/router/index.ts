import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainView from '../views/MainView.vue'
import ItemView from '../views/ItemView.vue'
import CartView from '../views/CartView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainView',
    component: MainView,
  },
  {
    path: '/product/:itemId',
    name: 'ItemView',
    component: ItemView,
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
