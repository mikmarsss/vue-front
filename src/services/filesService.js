import axiosInstance from '@/api/client'

export default class FilesService {
  static getAllUserFiles(userId) {
    return axiosInstance.get(`/files/all/${userId}`)
  }
}
