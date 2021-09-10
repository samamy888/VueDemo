import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
  },
  {
    path: '/table',
    name: 'Table',
    component: () => 
      import(/* webpackChunkName: "Table" */ '../components/Table.vue'),
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => 
      import(/* webpackChunkName: "SignIn" */ '../views/SignIn.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
