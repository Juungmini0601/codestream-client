import type { RouteGuard } from '.'
import { useUserStore } from '@/stores/users'

export const guestOnly: RouteGuard = {
  guard(to) {
    if (to.meta.noAuth) {
      const userStore = useUserStore()
      if (userStore.isAuthenticated) {
        return false
      }
    }
    return true
  },
  redirect: '/'
}
