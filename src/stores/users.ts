import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'
import type { ApiResponse } from '@/api'
import { apiClient } from '@/api'

export interface User {
  userId: number
  email: string
  nickname: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type UserRole = 'ROLE_ADMIN' | 'ROLE_USER'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  const login = async (email: string, password: string) => {
    try {
      const response: ApiResponse<User> = await apiClient.post('/api/v1/auth/login', {
        email,
        password
      })

      if (response.result === 'SUCCESS' && response.data) {
        user.value = response.data
        return true
      }

      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      await apiClient.post('/api/v1/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      user.value = null
    }
  }

  const checkAuthStatus = async () => {
    try {
      const response: ApiResponse<User> = await apiClient.get('/api/v1/users/me')

      if (response.result === 'SUCCESS' && response.data) {
        user.value = response.data
        return true
      }

      user.value = null
      return false
    } catch (error) {
      console.error('Auth check error:', error)
      user.value = null
      return false
    }
  }

  return {
    user: readonly(user),
    isAuthenticated,
    login,
    logout,
    checkAuthStatus
  }
})
