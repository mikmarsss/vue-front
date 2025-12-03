import { defineStore } from 'pinia'
import AuthService from '@/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),
    isAdmin: false,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,

    userInfo: (state) => state.user,

    authError: (state) => state.error,
  },

  actions: {
    async registration(payload) {
      this.loading = true
      this.error = null

      try {
        const authService = new AuthService()
        const response = await authService.registration(payload)
        this.token = response.data.accessToken
        this.user = response.data.user
        this.isAuthenticated = true
        if (this.user.role === 'Admin') {
          this.isAdmin = true
        }
        localStorage.setItem('authToken', JSON.stringify(response.data.accessToken))
        localStorage.setItem('user', JSON.stringify(response.data.user))

        return response
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(payload) {
      this.loading = true
      this.error = null

      try {
        const authService = new AuthService()
        const response = await authService.login(payload)
        this.token = response.data.accessToken
        this.user = response.data.user
        this.isAuthenticated = true
        if (this.user.role === 'Admin') {
          this.isAdmin = true
        }
        localStorage.setItem('authToken', JSON.stringify(response.data.accessToken))
        localStorage.setItem('user', JSON.stringify(response.data.user))

        return response
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        const authService = new AuthService()
        await authService.logout()
        this.token = null
        this.user = null
        this.isAuthenticated = false
        if (this.user.role === 'Admin') {
          this.isAdmin = false
        }
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async refreshUser() {
      this.loading = true
      this.error = null

      try {
        const authService = new AuthService()
        const response = await authService.refreshUser()
        this.token = response.data.accessToken
        this.user = response.data.user
        this.isAuthenticated = true
        if (this.user.role === 'Admin') {
          this.isAdmin = true
        }
        localStorage.setItem('authToken', JSON.stringify(response.data.accessToken))
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response
      } catch (error) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },
  },
})
