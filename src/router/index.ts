import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const useRouterst: RouteRecordRaw[] = [
  {
    path: '/',
    //  component:()=>import('@/views/home/index.vue')
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: useRouterst
})

export default router
