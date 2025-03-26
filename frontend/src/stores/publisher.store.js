import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import PublisherServiceApi from '../services/publisher.service'
export const usePublisherStore = defineStore('publishers', {
  state: () => ({
    publisherList: reactive([]),
    selected: ref(5)
  }),
  getters: {
    publishers: (state) => {
      return state.publisherList
    }
  },
  actions: {
    async fetchPublisherAction() {
      try {
        this.publisherList = await PublisherServiceApi.getPublishers()
      } catch (err) {
        console.log('Lỗi khi lấy danh sách publisher', err.message)
      }
    },
    async createPublisherAction(payload) {
      try {
        const res = await PublisherServiceApi.create(payload)
        await this.fetchPublisherAction()
        return res
      } catch (err) {
        console.log('Lỗi tạo publisher:', err.message)
      }
    },
    async deletePublisherAction(id) {
      try {
        const res = await PublisherServiceApi.delete(id)
        await this.fetchPublisherAction()
        return res
      } catch (err) {
        console.log('Lỗi xóa publisher:', err.message)
      }
    },
    async updatePublisherAction(id, data) {
      try {
        const res = await PublisherServiceApi.update(id, data)
        await this.fetchPublisherAction()
        return res
      } catch (err) {
        console.log(err)
      }
    },
    async setValueSelected(valueSelected) {
      this.selected = valueSelected
    }
  }
})
