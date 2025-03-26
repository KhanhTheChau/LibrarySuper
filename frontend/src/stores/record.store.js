import { defineStore } from 'pinia'
import TrackServiceApi from '../services/track.service'
export const useRecordStore = defineStore('record', {
  state: () => ({
    records: [],
    record: null
  }),
  getters: {
    // for admin
    getRecords: (state) => {
      return state.records
    },
    getRecordByState: (state) => {
      return (filterState) => {
        if (filterState === 'All') {
          return state.records // Trả về tất cả bản ghi
        }
        return state.records.filter((record) => record.state === filterState) // Lọc theo trạng thái
      }
    },

    getRecord: (state) => {
      return state.record
    }
  },
  actions: {
    async fetchRecords() {
      try {
        const records = await TrackServiceApi.getRecords()
        // this.records = records
        console.log(records)
        this.$patch({
          records: records // Sử dụng $patch để cập nhật state nếu gặp lỗi proxy
        })
      } catch (error) {
        console.log(error)
      }
    },
    async setRecord(recordID) {
      if (!recordID) {
        alert('Record ID is required')
      }
      try {
        const currRecord = this.records.find((record) => record._id === recordID)
        if (!currRecord) {
          alert('Not found')
          return
        }
        this.$patch({
          record: currRecord // Giả sử bạn có một state currentRecord để lưu thông tin bản ghi hiện tại
        })
        return
      } catch (error) {
        console.log(error)
      }
    },
    async approve(recordID) {
      try {
        await TrackServiceApi.approve(recordID)
        await this.fetchRecords()
        await this.setRecord(recordID)
      } catch (error) {
        console.log(error)
      }
    },
    async confirmReturn(recordID) {
      try {
        await TrackServiceApi.returnBook(recordID)
        await this.fetchRecords()
        await this.$patch({
          record: null // Sử dụng $patch để cập nhật state nếu gặp lỗi proxy
        })
      } catch (error) {
        console.log(error)
      }
    },
    async cancelRecord(recordID) {
      try {
        await TrackServiceApi.cancel(recordID)
        await this.fetchRecords()
        await this.$patch({
          record: null
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
