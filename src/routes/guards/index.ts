import router from '@/routes'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import { requiresAuth } from '@/routes/guards/requireAuth.ts'
import { guestOnly } from '@/routes/guards/guestOnly.ts'

router.beforeEach(to => {
  if (!requiresAuth.guard(to)) return requiresAuth.redirect
  if (!guestOnly.guard(to)) return guestOnly.redirect
  return true
})

export interface RouteGuard {
  redirect?: string

  guard(to: RouteLocationNormalizedGeneric): boolean
}
