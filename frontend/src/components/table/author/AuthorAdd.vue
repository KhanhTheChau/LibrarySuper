<template>
  <div class="p-4 form__wrap">
    <div class="addForm__title">
      <h3>Add Author</h3>
      <hr />
    </div>
    <div class="">
      <form class="" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="add__form">
          <div class="mb-3 mx-2">
            <label for="titleBook" class="form-label fw-bold">Tên</label>
            <input type="text" class="form-control" id="titleBook" v-model="dataAuthor.name" />
          </div>
          <div class="mb-3 mx-2">
            <label for="languageBook" class="form-label fw-bold">Ngày sinh</label>
            <input type="date" class="form-control" id="languageBook" v-model="dataAuthor.dob" />
          </div>
          <div class="mb-3 mx-2 d-flex flex-column">
            <label for="detailBook" class="form-label fw-bold">Giới thiệu</label>
            <textarea
              id="detailBook"
              name="detailBook"
              rows="4"
              cols="50"
              v-model="dataAuthor.bio"
            ></textarea>
          </div>
          <div class="mb-3 mx-2">
            <label for="priceBook" class="form-label fw-bold">Liên kết trang web</label>
            <input type="url" class="form-control" id="priceBook" v-model="dataAuthor.link" />
          </div>
          <div class="mb-3 mx-2">
            <label for="imageBook" class="form-label fw-bold">Hình ảnh</label>
            <input type="file" name="avatar" id="imageBook" @change="handleFileUpload" />
          </div>
        </div>
        <button type="submit" class="btn btn-dark mt-4 submit__form">Xác nhận</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthorStore } from '@/stores/author.store'
import { getCurrentInstance, reactive } from 'vue'

const instance = getCurrentInstance()
const proxy = instance?.proxy

const props = defineProps({
  handleClose: Function
})

const dataAuthor = reactive({
  name: '',
  bio: '',
  dob: '',
  link: '',
  image: null
})

const authorStore = useAuthorStore()

const handleSubmit = async () => {
  try {
    const formData = new FormData()
    for (const key in dataAuthor) {
      if (key === 'images') {
        formData.append('image', dataAuthor.image)
      } else {
        formData.append(key, dataAuthor[key])
      }
    }
    const res = await authorStore.createAuthorAction(formData)
    if (res) {
      proxy?.$toast?.add({
        severity: 'contrast',
        group: 'tr',
        summary: 'Success',
        detail: 'Add new author successfully',
        life: 3000
      })
      props.handleClose()
    }
  } catch (error) {
    console.log('Error adding book:', error)
    alert('Failed to add author. Please try again.')
  }
}

const handleFileUpload = (event) => {
  dataAuthor.image = event.target.files[0]
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