import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/routes/pages/HomePage.vue'
import NotFoundPage from '@/routes/pages/NotFoundPage.vue'
import SignupPage from '@/routes/pages/SignupPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
      meta: {
        layout: 'Default'
      }
    },
    {
      path: '/signup',
      component: SignupPage
    },
    {
      path: '/:pathMath(.*)*',
      component: NotFoundPage
    }
  ]
})

export default router
