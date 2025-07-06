import type { RouteGuard } from '.'
import { useUserStore } from '@/stores/users'

export const requiresAuth: RouteGuard = {
  guard(to) {
    if (to.meta.auth) {
      const userStore = useUserStore()
      if (!userStore.isAuthenticated) {
        return false
      }
    }
    return true
  },
  redirect: '/signin'
}
