import { createRouter, createWebHistory } from 'vue-router'
import { getAuthToken } from '@/utils/storage.js'
import Home from '@/pages/Home.vue'
import AirwayEvaluation from '@/pages/AirwayEvaluation.vue'
import Login from '@/pages/Login.vue'
import Doctor from '@/pages/Doctor.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/airway-evaluation',
    name: 'AirwayEvaluation',
    component: AirwayEvaluation,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/doctor',
    name: 'Doctor',
    component: Doctor,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = getAuthToken()
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
