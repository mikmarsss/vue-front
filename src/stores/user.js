import { defineStore } from 'pinia'
import AuthService from '@/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),
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

        localStorage.setItem('authToken', JSON.stringify(response.data.accessToken))

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

        localStorage.setItem('authToken', JSON.stringify(response.data.accessToken))

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
        localStorage.removeItem('authToken')
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
        console.log(response)
        localStorage.setItem('authToken', JSON.stringify(response.data.accessToken))

        return response
      } catch (error) {
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
