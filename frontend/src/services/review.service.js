import createApiClient from './api.service'
// import createApiClient from '@/plugins/axios'
class ReviewServiceApi {
  constructor(baseUrl = '/api/v1/review') {
    this.api = createApiClient(baseUrl)
  }

  async createReview(data) {
    try {
      const res = await this.api.post('/', data)
      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getReviews() {
    try {
      const res = await this.api.get('/')
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getReviewUser(userId) {
    try {
      const res = await this.api.get(`/user/${userId}`)
      return res.data
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Nếu lỗi là 404, trả về mảng rỗng
        return null
      }
      console.log(error) // In ra lỗi khác (nếu có)
    }
  }

  async getReviewBook(bookID) {
    try {
      const res = await this.api.get(`/book/${bookID}`)
      return res.data
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Nếu lỗi là 404, trả về mảng rỗng
        return null
      }
      console.log(error) // In ra lỗi khác (nếu có)
    }
  }
}

export default new ReviewServiceApi()
