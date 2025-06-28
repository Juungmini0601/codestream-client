import type { RouteGuard } from '.'

export const guestOnly: RouteGuard = {
  guard(to) {
    if (to.meta.noAuth) {
      const token = localStorage.getItem('accessToken')
      // 유효 토큰이 있는지 확인!
      if (token) {
        return false
      }
    }
    return true
  },
  redirect: '/'
}
