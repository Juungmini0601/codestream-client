import type { RouteGuard } from '.'

export const requiresAuth: RouteGuard = {
  guard(to) {
    if (to.meta.auth) {
      const token = localStorage.getItem('accessToken')
      // 토큰이 유효한지 확인!
      if (!token) {
        return false
      }
    }
    return true
  },
  redirect: '/signin'
}
