import AppVue from '@/App.vue'
// import path from 'path'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'Admin',
    //   component: AppVue
    //   // meta: {
    //   //   requiresAdmin: true
    //   // }
    // }
  ]
})

export default router
