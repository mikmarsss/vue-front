import axiosInstance from '@/api/client'

export default class LoggingService {
  static getAllUsersActions() {
    return axiosInstance.get('/logging/all')
  }

  static downloadUserActionsFile() {
    return axiosInstance.get(`/logging/download`, {
      responseType: 'blob',
    })
  }
}
