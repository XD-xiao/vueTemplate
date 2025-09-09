import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/stores/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
})

// 登录访问拦截
// router.beforeEach((to) => {
//   const userStore = useUserStore()
//   if (!userStore.token && to.path !== '/login') return '/login'
// })

export default router
