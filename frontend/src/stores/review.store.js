import { defineStore } from 'pinia'
import ReviewServiceApi from '../services/review.service'
import Cookies from 'vue-cookies'
import { useBookStore } from './book.store'

const bookStore = useBookStore()

export const useReviewStore = defineStore('review', {
  state: () => ({
    reviewUser: null,
    reviewBook: null
  }),
  getters: {
    getReviewUser: (state) => {
      return state.reviewUser
    },
    getReviewBook: (state) => {
      return state.reviewBook
    }
  },
  actions: {
    async fetchReviewUserAction() {
      try {
        const userID = await Cookies.get('userId')
        const res = await ReviewServiceApi.getReviewUser(userID)
        this.reviewUser = res
      } catch (err) {
        if (err.status === 404) {
          return
        }
      }
    },

    async fetchReviewBookAction(bookID) {
      try {
        const res = await ReviewServiceApi.getReviewBook(bookID)
        this.reviewBook = res
        bookStore.getBookAction(bookID)
      } catch (err) {
        if (err.status === 404) {
          return
        }
      }
    },

    async createReviewAction(payload) {
      try {
        const userID = await Cookies.get('userId')
        payload.readerID = userID
        const res = await ReviewServiceApi.createReview(payload)
        await this.fetchReviewBookAction(payload.bookID)

        return res.status
        // this.reviewBook = res
      } catch (error) {
        console.log(error)
        return error.status
      }
    }
  }
})
