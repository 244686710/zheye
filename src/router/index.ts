import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { redirectAlreadyLogin: true }
  },
  {
    path: '/create',
    name: 'Crate',
    component: () => import('../views/CreatePost.vue'),
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/column/:id',
    name: 'Column',
    component: () => import('../views/ColumnDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, form, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'Login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})
export default router
