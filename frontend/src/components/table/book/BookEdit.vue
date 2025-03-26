<template>
  <div class="p-4 form__wrap">
    <div class="addForm__title">
      <h3>Edit Book</h3>
      <hr />
    </div>
    <div class="">
      <form class="" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="add__form">
          <div class="mb-3 mx-2">
            <label for="titleBook" class="form-label fw-bold">Title</label>
            <input type="text" class="form-control" id="titleBook" v-model="dataBook.title" />
          </div>
          <div class="mb-3 mx-2">
            <p class="fw-bold">Genres</p>
            <div class="row">
              <div class="col-4" v-for="(genre, index) in genres" :key="index">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="genre"
                  v-model="dataBook.genre"
                />
                <label class="form-check-label"> {{ genre }} </label>
              </div>
            </div>
          </div>

          <div class="mb-3 mx-2">
            <p class="fw-bold">Label</p>
            <div v-for="(label, index) in labels" :key="index">
              <input
                class="form-check-input"
                type="radio"
                :value="label"
                v-model="dataBook.label"
                name="bookLabel"
              />
              <label class="form-check-label">{{ label }}</label>
            </div>
          </div>

          <div class="mb-3 mx-2 d-flex flex-column">
            <label for="detailBook" class="form-label fw-bold">Description</label>
            <textarea
              id="detailBook"
              name="detailBook"
              rows="4"
              cols="50"
              v-model="dataBook.description"
            ></textarea>
          </div>
          <div class="mb-3 mx-2">
            <label for="priceBook" class="form-label fw-bold">Price</label>
            <input type="text" class="form-control" id="priceBook" v-model="dataBook.price" />
          </div>
          <div class="mb-3 mx-2">
            <label for="stockBook" class="form-label fw-bold">Stock</label>
            <input type="text" class="form-control" id="stockBook" v-model="dataBook.stock" />
          </div>
          <div class="mb-3 mx-2">
            <label for="countryBook" class="form-label fw-bold">Country</label>
            <input type="text" class="form-control" id="countryBook" v-model="dataBook.country" />
          </div>
          <div class="mb-3 mx-2">
            <label for="languageBook" class="form-label fw-bold">Language</label>
            <input type="text" class="form-control" id="languageBook" v-model="dataBook.language" />
          </div>
          <div class="mb-3 mx-2">
            <label for="languageBook" class="form-label fw-bold">Publish Date</label>
            <input
              type="date"
              class="form-control"
              id="languageBook"
              v-model="dataBook.published_date"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-dark mt-4 submit__form">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useBookStore } from '@/stores/book.store'
import { getCurrentInstance, reactive, toRefs } from 'vue'
const instance = getCurrentInstance()
const proxy = instance?.proxy

const props = defineProps({
  book: {
    type: Object,
    required: true
  },
  handleClose: Function
})
const bookStore = useBookStore()
const { book } = toRefs(props)
const dataBook = reactive({
  title: book.value.title,
  genre: book.value.genre,
  price: book.value.price,
  stock: book.value.stock,
  description: book.value.description,
  country: book.value.country,
  language: book.value.language,
  published_date: book.value.published_date,
  label: book.value.label
})

const genres = reactive([
  'Art',
  'Science Fiction',
  'Fantasy',
  'Biographies',
  'Recipes',
  'Romance',
  'Textbooks',
  'Children',
  'History',
  'Medicine',
  'Religion',
  'Mystery',
  'Science',
  'Education',
  'Detective',
  'Anime'
])

const labels = reactive([
  'New Arrival', // Sách mới
  'Best Seller', // Bán chạy nhất
  'Classic', // Kinh điển
  'Trending',
  'Limited Edition' // Phiên bản giới hạn
])

const handleSubmit = async () => {
  try {
    const formData = new FormData()
    for (const key in dataBook) {
      if (key === 'genre') {
        dataBook[key].forEach((genre, index) => {
          formData.append(`genre[${index}]`, genre)
        })
      } else if (key == 'published_date') {
        const publishDate = new Date(dataBook[key])
        formData.append(key, publishDate)
      } else {
        formData.append(key, dataBook[key])
      }
    }

    const res = await bookStore.updateBookAction(book.value._id, formData)
    if (res.status === 200) {
      proxy?.$toast?.add({
        severity: 'contrast',
        group: 'tr',
        summary: 'Success',
        detail: 'Edit book successfully',
        life: 3000
      })
      props.handleClose()
    }
  } catch (error) {
    console.log('Error adding book:', error)
    proxy?.$toast?.add({
      severity: 'error',
      group: 'tr',
      summary: 'Error',
      detail: 'Failed to edit book',
      life: 3000
    })
  }
}
</script>

<style scoped>
.form__wrap {
  height: 80vh;
  width: 40vw;
}

.add__form {
  height: 55vh;
  overflow-y: scroll;
}
</style>