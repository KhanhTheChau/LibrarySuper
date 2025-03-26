import createApiClient from './api.service'
// import createApiClient from '@/plugins/axios'
class PublisherServiceApi {
  constructor(baseUrl = '/api/v1/publisher') {
    this.api = createApiClient(baseUrl)
  }

  async getPublishers() {
    try {
      const res = await this.api.get('/')
      return res.data
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async create(data) {
    try {
      const res = await this.api.post('/', data, {
        headers: {
          'Content-Type': 'multipart/form-data' // Định nghĩa Content-Type
        }
      })
      return res.data
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async deleteAll() {
    return (await this.api.delete('/')).data
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data
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
}

export default new PublisherServiceApi()
