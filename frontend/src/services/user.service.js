import createApiClient from './api.service'
// import createApiClient from '@/plugins/axios'

class UserServiceApi {
  constructor(baseUrl = '/api/v1/users') {
    this.api = createApiClient(baseUrl)
  }

  async createUser(data) {
    try {
      const res = await this.api.post('/', data)
      return res
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async getAllUser() {
    try {
      const res = await this.api.get('/')
      // const docgia = res.data
          // const users = res.data.map((docgia) => ({
          //   _id: docgia._id,
          //   firstName: docgia.ten,
          //   lastName: docgia.holot,
          //   dateOfBirth: new Date(docgia.ngaysinh),
          //   gender: docgia.phai === 'nam' ? 'Male' : 'Female',
          //   address: docgia.diachi,
          //   phone: docgia.sodienthoai,
          //   email: docgia.email,
          //   password: docgia.matkhau,
          //   createAt: new Date(docgia.ngaytao),
          //   updateAt: new Date(docgia.ngaycapnhat),
          //   image: docgia.anhdaidien || '',
          //   role: docgia.role === 'docgia' ? 'reader' : docgia.role
          // }))
      return res.data
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async getUser(userId) {
    try {
      const res = await this.api.get(`/${userId}`)
      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async delete(id) {
    try {
      const res = await this.api.delete(`/${id}`)
      return res.data
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async updateAvatar(id, formData) {
    try {
      // Gửi yêu cầu PUT kèm theo formData để cập nhật avatar
      const res = await this.api.put(`/edit-avatar/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return res // Trả về dữ liệu nếu thành công
    } catch (error) {
      console.log('Error updating avatar:', error.message)
      throw error // Ném lỗi để xử lý ở nơi gọi hàm
    }
  }

  async update(id, data) {
    return (await this.api.put(`/edit-profile/${id}`, data)).data
  }

  async updatePassword(userId, passwordData) {
    try {
      console.log(userId, passwordData)
      return await this.api.put(`/${userId}/change-password`, passwordData)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new UserServiceApi()
