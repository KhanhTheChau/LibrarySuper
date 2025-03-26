// import createApiClient from '@/plugins/axios'
import createApiClient from './api.service'
class TrackServiceApi {
  constructor(baseUrl = '/api/v1/borrow') {
    this.api = createApiClient(baseUrl)
  }

  async createTrack(data) {
    try {
      const res = await this.api.post('/', data)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getRecords() {
    try {
      const res = await this.api.get('/')
      console.log('res.data: ', res.data)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // for user

  async getRecordUser(userId) {
    try {
      const res = await this.api.get(`/${userId}`)
      return res.data
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Nếu lỗi là 404, trả về mảng rỗng
        return null
      }
      console.log(error) // In ra lỗi khác (nếu có)
    }
  }

  async confirm(recordId, quantity) {
    try {
      const res = await this.api.put(`/confirm/${recordId}`, { quantity })
      console.log('res.status: ', res.status)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async approve(recordID) {
    try {
      const res = await this.api.put(`/approved/${recordID}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async delete(recordID) {
    try {
      const res = await this.api.delete(`/${recordID}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async returnBook(recordID) {
    try {
      const res = await this.api.put(`/returned/${recordID}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async cancel(recordID) {
    try {
      const res = await this.api.delete(`/cancel/${recordID}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new TrackServiceApi()
