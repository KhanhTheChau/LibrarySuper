<template>
  <div class="p-4 form__wrap">
    <div class="addForm__title">
      <h3>Thêm sách</h3>
      <hr />
    </div>
    <div class="">
      <form class="" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="add__form">
          <div class="mb-3 mx-2">
            <label for="titleBook" class="form-label fw-bold">Tên Sách</label>
            <input type="text" class="form-control" id="titleBook" v-model="dataBook.title" />
          </div>
          <div class="mb-3 mx-2">
            <p class="fw-bold">Thể loại</p>
            <div class="row">
              <div class="col-4" v-for="(genre, index) in genres" :key="index">
                <input
                  class="form-check-input me-1"
                  type="checkbox"
                  :value="genre"
                  v-model="dataBook.genre"
                />
                <label class="form-check-label"> {{ genre }} </label>
              </div>
            </div>
          </div>
          <div class="mb-3 mx-2">
            <p class="fw-bold">Lĩnh vực</p>
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
          <div class="mb-3 mx-2">
            <p class="fw-bold">Tác giả</p>
            <div class="row">
              <div class="col-4" v-for="author in authorList" :key="author._id">
                <input
                  class="form-check-input me-1"
                  type="radio"
                  :value="author._id"
                  v-model="dataBook.idAuthor"
                />
                <label class="form-check-label"> {{ author.name }} </label>
              </div>
            </div>
          </div>
          <div class="mb-3 mx-2">
            <p class="fw-bold">Nhà xuất bản</p>
            <div class="row">
              <div class="col-4" v-for="pub in publisherList" :key="pub._id">
                <input
                  class="form-check-input me-1"
                  type="radio"
                  :value="pub._id"
                  v-model="dataBook.idPublisher"
                />
                <label class="form-check-label"> {{ pub.name }} </label>
              </div>
            </div>
          </div>

          <div class="mb-3 mx-2">
            <label for="detailBook" class="form-label d-block fw-bold">Mô tả</label>
            <textarea
              id="detailBook"
              name="detailBook"
              rows="4"
              cols="65"
              v-model="dataBook.description"
            ></textarea>
          </div>
          <div class="mb-3 mx-2">
            <label for="priceBook" class="form-label fw-bold">Giá</label>
            <input type="text" class="form-control" id="priceBook" v-model="dataBook.price" />
          </div>
          <div class="mb-3 mx-2">
            <label for="stockBook" class="form-label fw-bold">Tồn kho</label>
            <input type="text" class="form-control" id="stockBook" v-model="dataBook.stock" />
          </div>
          <div class="mb-3 mx-2">
            <label for="countryBook" class="form-label fw-bold">Nguồn gốc</label>
            <input type="text" class="form-control" id="countryBook" v-model="dataBook.country" />
          </div>
          <div class="mb-3 mx-2">
            <label for="languageBook" class="form-label fw-bold">Ngôn ngữ</label>
            <input type="text" class="form-control" id="languageBook" v-model="dataBook.language" />
          </div>
          <div class="mb-3 mx-2">
            <label for="languageBook" class="form-label fw-bold">Ngày xuất bản</label>
            <input
              type="date"
              class="form-control"
              id="languageBook"
              v-model="dataBook.published_date"
            />
          </div>
          <div class="mb-3 mx-2">
            <label for="imageBook" class="form-label fw-bold">Hình ảnh</label>
            <input type="file" name="avatar" id="imageBook" @change="handleFileUpload" />
          </div>
        </div>
        <button type="submit" class="btn btn-dark mt-4 submit__form">Thêm sách</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthorStore } from '@/stores/author.store'
import { useBookStore } from '@/stores/book.store'
import { usePublisherStore } from '@/stores/publisher.store'
import { computed, getCurrentInstance, onMounted, reactive } from 'vue'

const authorStore = useAuthorStore()
const publisherStore = usePublisherStore()
const instance = getCurrentInstance()
const proxy = instance?.proxy

const props = defineProps({
  handleClose: Function
})

onMounted(async () => {
  await authorStore.fetchAuthorAction()
  await publisherStore.fetchPublisherAction()
})

const authorList = computed(() => {
  return authorStore.authors
})

const publisherList = computed(() => {
  return publisherStore.publishers
})

const dataBook = reactive({
  title: '',
  genre: [],
  price: 0,
  stock: 0,
  description: '',
  country: '',
  language: '',
  image: null,
  published_date: '',
  label: '',
  idAuthor: '',
  idPublisher: ''
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

const bookStore = useBookStore()

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
      } else if (key === 'image') {
        formData.append('image', dataBook.image)
      } else {
        formData.append(key, dataBook[key])
      }
    }
    const res = await bookStore.createBookAction(formData)
    if (res) {
      proxy?.$toast?.add({
        severity: 'contrast',
        group: 'tr',
        summary: 'Success',
        detail: 'Add new book successfully',
        life: 3000
      })
      props.handleClose()
    }
  } catch (error) {
    console.log('Error adding book:', error)
    alert('Failed to add book. Please try again.')
  }
}

const handleFileUpload = (event) => {
  dataBook.image = event.target.files[0]
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

.submit__form {
  float: right;
}
</style>