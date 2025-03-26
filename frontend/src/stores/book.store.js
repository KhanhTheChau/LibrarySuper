import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import BookServiceApi from '../services/book.service'
export const useBookStore = defineStore('book', {
  state: () => ({
    booksFetch: reactive([]),
    bookList: reactive([]),
    bookDetail: reactive({}),
    searchBookList: reactive([]),
    inputSearch: ref(''),
    selected: ref(6)
  }),
  getters: {
    books: (state) => {
      return state.bookList
    },
    showBooks: (state) => (label) => {
      // using label
      return state.bookList.filter((book) => {
        return book.label.includes(label)
      })
    },
    filteredBooksByGenre: (state) => (genre) => {
      return state.bookList.filter((book) => {
        return book.genre?.some((g) => g.includes(genre))
      })
    },
    childrenBooks: (state) => {
      return state.bookList.filter((book) => book.genre?.includes('Children'))
    },
    book: (state) => {
      return state.bookDetail
    },
    searchBooks: (state) => {
      return state.searchBookList
    },
    inputSearchBook: (state) => {
      return state.inputSearch
    },
    getSelect: (state) => {
      return state.selected
    }
  },
  actions: {
    async fetchBookAction() {
      try {
        this.bookList = await BookServiceApi.getAll()
      } catch (err) {
        console.log('Lỗi khi lấy danh sách sách:', err.message)
      }
    },
    async getBookAction(id) {
      try {
        const res = await BookServiceApi.get(id)
        this.bookDetail = res
        if (this.bookDetail) {
          return true
        } else {
          return false
        }
      } catch (err) {
        console.log(err)
      }
    },
    async searchBookAction(keyword) {
      try {
        if (!keyword) return
        const books = await BookServiceApi.getSearch(keyword)
        this.searchBookList = books
      } catch (error) {
        console.log(error)
      }
    },
    async createBookAction(payload) {
      try {
        const res = await BookServiceApi.create(payload)
        await this.fetchBookAction()
        return res
      } catch (err) {
        console.log('Lỗi tạo sách:', err.message)
      }
    },
    async deleteBookAction(id) {
      try {
        const res = await BookServiceApi.delete(id)
        await this.fetchBookAction()
        return res
      } catch (err) {
        console.log('Lỗi xóa sách:', err.message)
      }
    },
    async updateBookAction(id, data) {
      try {
        const res = await BookServiceApi.update(id, data)
        await this.fetchBookAction()
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
