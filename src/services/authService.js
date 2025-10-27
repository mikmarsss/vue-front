import axiosInstance from '@/api/client'

export default class AuthService {
  registration(payload) {
    return axiosInstance.post('/auth/register', payload)
  }

  login(payload) {
    return axiosInstance.post('/auth/login', payload)
  }

  logout() {
    return axiosInstance.get('/auth/logout')
  }

  refreshUser() {
    return axiosInstance.get(`/auth/refresh`)
  }
}
