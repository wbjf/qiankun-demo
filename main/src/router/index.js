import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routers = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  }, {
    path: '/test1',
    name: 'test1',
    component: () => import('../views/test1')
  }, {
    path: '/test2',
    name: 'test2',
    component: () => import('../views/test2')
  },
  {
    path: '/index/*',
    name: 'index',
    component: () => import('../views/home')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routers
})

export default router
