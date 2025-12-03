import axiosInstance from '@/api/client'

export default class FilesService {
  static getAllUserFiles(userId) {
    return axiosInstance.get(`/files/all/${userId}`)
  }

  static deleteUserFile(fileId) {
    return axiosInstance.delete(`/files/delete/${fileId}`)
  }

  static downloadUserFile(fileId, userId) {
    return axiosInstance.get(`/files/download/${fileId}/${userId}`, {
      responseType: 'blob',
    })
  }

  static getAllFiles() {
    return axiosInstance.get(`/files/all`)
  }

  static getAllUsersWithFiles() {
    return axiosInstance.get('/files/allusers')
  }
}
