import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import AuthorServiceApi from '../services/author.service'
export const useAuthorStore = defineStore('authors', {
  state: () => ({
    authorList: reactive([]),
    selected: ref(5)
  }),
  getters: {
    authors: (state) => {
      return state.authorList
    }
  },
  actions: {
    async fetchAuthorAction() {
      try {
        this.authorList = await AuthorServiceApi.getAuthors()
      } catch (err) {
        console.log('Get authors failed:', err.message)
      }
    },
    async createAuthorAction(payload) {
      try {
        const res = await AuthorServiceApi.create(payload)
        await this.fetchAuthorAction()
        return res
      } catch (err) {
        console.log('Create author failed:', err.message)
      }
    },
    async deleteAuthorAction(id) {
      try {
        const res = await AuthorServiceApi.delete(id)
        await this.fetchAuthorAction()
        return res
      } catch (err) {
        console.log('Delete author failed:', err.message)
      }
    },
    async updateAuthorAction(id, data) {
      try {
        const res = await AuthorServiceApi.update(id, data)
        await this.fetchAuthorAction()
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
