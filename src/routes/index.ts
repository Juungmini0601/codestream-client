import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/routes/pages/HomePage.vue'
import NotFoundPage from '@/routes/pages/NotFoundPage.vue'
import SignupPage from '@/routes/pages/SignupPage.vue'
import SigninPage from '@/routes/pages/SigninPage.vue'
import { useUserStore } from '@/stores/users'

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
      path: '/signin',
      component: SigninPage
    },
    {
      path: '/:pathMath(.*)*',
      component: NotFoundPage
    }
  ]
})

let isAuthChecked = false

router.beforeEach(async (_, __, next) => {
  if (!isAuthChecked) {
    const userStore = useUserStore()
    isAuthChecked = await userStore.checkAuthStatus()
  }
  next()
})

export default router
