import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/routes/pages/HomePage.vue'
import AboutPage from '@/routes/pages/AboutPage.vue'
import NotFoundPage from '@/routes/pages/NotFoundPage.vue'

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
      path: '/about',
      component: AboutPage
    },
    {
      path: '/protected',
      component: AboutPage, // 보호된 페이지 예시
      meta: {
        auth: true // 인증이 필요한 페이지 표시
      }
    },
    {
      path: '/:pathMath(.*)*',
      component: NotFoundPage
    }
  ]
})

export default router
