import { defineStore } from 'pinia'
import AdminServiceApi from '../services/admin.service'
import Cookies from 'vue-cookies'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admin: {}
  }),
  getters: {
    getAdmin: (state) => state.admin
  },
  actions: {
    async fetchAdmin() {
      try {
        const userId = Cookies.get('userId')
        if (!userId) console.log('User infor not found in cookies')

        const res = await AdminServiceApi.getAdmin(userId)
        if (!res || !res.data) {
          console.log('Failed to fetch user: Invalid response from server')
        }

        this.admin = res.data
        return res.data
      } catch (error) {
        console.log(error)
        this.admin = null
        return
      }
    },
    async isDev() {
      // Nếu thông tin admin chưa có, gọi fetchAdmin để lấy dữ liệu
      if (!this.admin || Object.keys(this.admin).length === 0) {
        await this.fetchAdmin()
      }

      // Kiểm tra nếu admin không tồn tại
      if (!this.admin) {
        return false
      }

      // Trả về kết quả kiểm tra vai trò
      return this.admin.position === 'Dev'
    }
  }
})
